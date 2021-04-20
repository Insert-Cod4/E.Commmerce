import axios from 'axios';

export const getOrders = async (authtoken) =>
    await axios.get(`${'https://boiling-refuge-53142.herokuapp.com/api'}/admin/orders`,
        {
            headers: {
                authtoken,
            },
        });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
    await axios.put(`${'https://boiling-refuge-53142.herokuapp.com/api'}/admin/order-status`,
        { orderId, orderStatus },
        {
            headers: {
                authtoken,
            },
        });