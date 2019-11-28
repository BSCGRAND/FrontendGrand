const goodsRequestReducerDefaultState = [];

export default (state = goodsRequestReducerDefaultState, action) => {
    switch (action.type) {
         case 'GET_GOODSREQUESTS':
            return action.goodsRequest;
        default:
            return state;
    }
};