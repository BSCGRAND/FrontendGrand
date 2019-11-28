import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const goodsRequest = ({ id, dateOfPurchaseRequest, subdivision, fullName, oilfieldName,
                          goodsName, amount, unit, dateOfReceiving, note,
                          responsibleUnit, dateOfGeneralRequest, supply,
                          sent, progressMark, comments, dispatch }) => (
    <div>
        <span>{id}</span>
        <span>{oilfieldName}</span>
    </div>
);

export default connect()(goodsRequest);