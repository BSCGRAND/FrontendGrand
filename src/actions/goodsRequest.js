import axios from '../axios/axios';

const _getGoodsRequest = (goodsRequest) => ({
    type: 'GET_GOODSREQUESTS',
    goodsRequest
});

export const getGoodsRequest = () => {
    return (dispatch) => {
        return axios.get('all').then(result => {
            const goodsRequest = [];

            result.data.forEach(item => {
                goodsRequest.push(item);
            });

            dispatch(_getGoodsRequest(goodsRequest));
        });
    };
};