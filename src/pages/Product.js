import React, { useState, useEffect } from 'react';
import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'
import { getRelated } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'



const Product = ({ match }) => {
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])
    const [star, setStar] = useState(0)
    // Redux
    const { user } = useSelector((state) => ({
        ...state
    }));

    const { slug } = match.params

    useEffect(() => {
        loadSingleProduct();
    }, [slug])



    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingsObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingsObject && setStar(existingRatingsObject.star); // current use star
        };

    })

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            //load related products
            getRelated(res.data._id).then((res) => setRelated(res.data))
        })
    }


    const onStarClick = (newRating, name) => {
        setStar(newRating);
        //console.table(newRating, name);
        productStar(name, newRating, user.token)
            .then((res) => {
                console.log('rating clicked', res.data)
                loadSingleProduct();
            })
    }


    return <>

        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct product={product}
                    onStarClick={onStarClick}
                    star={star} />
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                    {/*JSON.stringify(related)*/}

                </div>
            </div>


            <div className="row pb-5">
                {related.length ? related.map((r) => (
                    <div
                        key={r._id}
                        className="col-md-4"
                    >
                        < ProductCard
                            product={r}
                            style={{ width: '45%', objectFit: "contain" }}
                        />

                    </div>
                )
                ) : <div className="text-center col">No Products Found</div>}
            </div>

        </div>

    </>;
};


export default Product;