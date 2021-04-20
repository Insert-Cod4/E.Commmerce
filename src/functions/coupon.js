import axios from 'axios';


export const getCoupons = async () =>
    await axios.get(`${'https://boiling-refuge-53142.herokuapp.com/api'}/coupons`);


export const removeCoupon = async (couponId, authtoken) =>
    await axios.delete(`${'https://boiling-refuge-53142.herokuapp.com/api'}/coupon/${couponId}`, {
        headers: {
            authtoken,
        }
    });

export const createCoupon = async (coupon, authtoken) =>
    await axios.post(`${'https://boiling-refuge-53142.herokuapp.com/api'}/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            }
        });