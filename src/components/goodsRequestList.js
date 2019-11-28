import React from 'react';
import { connect } from 'react-redux';
import goodsRequest from './goodsRequest';

const GoodsRequestList = (props) => (
    <div>
        GoodsRequest List:
        <ul>
            {props.goodsRequest.map(goodsRequest => {
                return (
                    <li key="{goodsRequest.id}">
                        <goodsRequest {...goodsRequest}>
                        </goodsRequest></li>
                );
            })}
        </ul>
    </div>
);

const mapStateToProps = (state) => {
    return {
        goodsRequest: state
    };
};

export default connect(mapStateToProps)(GoodsRequestList);
