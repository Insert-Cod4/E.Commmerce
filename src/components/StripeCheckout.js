import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import err from '../images/err.png'
import { createOrder, emptyUserCart } from '../functions/user'

const StrikeCheckout = ({ history }) => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector(state => ({ ...state }))


    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0);


    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {

        createPaymentIntent(user.token, coupon)
            .then(res => {
                console.log('create payment intent', res.data)
                setClientSecret(res.data.clientSecret);
                // addictional response receive
                setCartTotal(res.data.cartTotal);
                setTotalAfterDiscount(res.data.totalAfterDiscount);
                setPayable(res.data.payable);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            }

        });

        if (payload.error) {
            setError(`Payment Failed ${payload.error.message}`)
            setProcessing(false)
        } else {

            createOrder(payload, user.token)
                .then(res => {
                    if (res.data.ok) {
                        // empy cart from local storage
                        if (typeof window !== 'undefined') localStorage.removeItem('cart');
                        // empy cart from Redux
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: [],
                        });
                        // Reset coupon to False
                        dispatch({
                            type: "COUPON_APPLIED",
                            payload: false,
                        });
                        // empy cart from database
                        emptyUserCart(user.token);

                    }
                })

            console.log(JSON.stringify(payload, null, 4))
            setError(null)
            setProcessing(false)
            setSucceeded(true);
        }
    }

    const handleChange = async (e) => {
        //listen for cahnges in the card elements
        // and display any errors as the customer types
        setDisabled(e.empty)
        setError(e.error ? e.error.message : ""); // show error message
    }

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>

            {
                !succeeded && <div>
                    {coupon && totalAfterDiscount !== undefined ?
                        (<p className="alert alert-success">{`Total after discount : $${totalAfterDiscount}`}</p>)
                        :
                        (<p className="alert alert-danger">No coupon applied</p>)}
                </div>
            }

            <div className="text-center pb-5">
                <Card
                    cover={<img src={err}
                        style={{
                            height: '200px',
                            objectFit: 'contain',
                            marginBottom: '-50px'
                        }}
                    />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" />
                            <br /> Total: $ {cartTotal}
                        </>,
                        <>
                            <CheckOutlined className="text-info" />
                            <br /> Total payable: $ {(payable / 100).toFixed(2)}
                        </>
                    ]}

                />
            </div>

            <form
                id="payment-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />

                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? <div className="spinner" id="spinner">
                        </div> : "Pay"}
                    </span>
                </button>
                <br />
                {error && <div className="card-error" role="alert">{error}
                </div>}
                <br />
                <p className={succeeded ? 'result-message' : "result-message hidden"}>
                    Payment Succesful , <Link to="/user/history">See it in your purchase history</Link>
                </p>
            </form>


        </>
    )
}


export default StrikeCheckout