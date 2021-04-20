import axios from 'axios'

export const userCart = async (cart, authtoken) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/cart`,
        { cart },
        {
            headers: {
                authtoken,
            },
        });


export const getUserCart = async (authtoken) =>
    await axios.get(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/cart`,
        {
            headers: {
                authtoken,
            },
        });



export const emptyUserCart = async (authtoken) =>
    await axios.delete(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/cart`,
        {
            headers: {
                authtoken,
            },
        });


export const saveUserAddress = async (authtoken, address) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/address`,
        { address },
        {
            headers: {
                authtoken,
            },
        });


export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/cart/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        });

export const createOrder = async (stripeResponse, authtoken) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken,
            },
        });

export const getUserOrders = async (authtoken) =>
    await axios.get(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/orders`,
        {
            headers: {
                authtoken,
            },
        });


export const getWishlist = async (authtoken) =>
    await axios.get(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/wishlist`,
        {
            headers: {
                authtoken,
            },
        });


export const removeWishlist = async (productId, authtoken) =>
    await axios.put(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authtoken,
            },
        });

export const addToWishList = async (productId, authtoken) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/wishlist`,
        { productId },
        {
            headers: {
                authtoken,
            },
        });


export const createCashOrderForUser = async (authtoken, COD, couponTrueOrFalse) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/user/cash-order`,
        { couponApplied: couponTrueOrFalse, COD },
        {
            headers: {
                authtoken,
            },
        });




