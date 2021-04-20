import axios from 'axios';

export const createPaymentIntent = (authtoken, coupon) =>
    axios.post(
        `${'https://boiling-refuge-53142.herokuapp.com/api'}/create-payment-intent`,
        { couponApplied: coupon },
        {

            headers: {
                authtoken,
            },
        })
