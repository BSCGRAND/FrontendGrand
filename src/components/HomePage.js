import React, { Component } from 'react';
import axios from '../axios/axios';
import { connect} from 'react-redux';


class HomePage extends Component {
    render() {
        const loadGoodsRequests = () => {
            axios.get(`all`)
                .then(res => {
                    const goodsRequest = res.data;
                    this.setState({ goodsRequest });
                })
        };
        const list = (this.state === null) ? <ul><li>empty</li></ul> :
            <table border="1">
                <tr>
                    <td>Id</td>
                    <td>Дата подачи заявки</td>
                    <td>Подразделение</td>
                    <td>Ф.И.О</td>
                    <td>Объект</td>
                    <td>Наименование</td>
                    <td>Кол-во</td>
                    <td>Ед.измерения</td>
                    <td>Дата получения на объекте</td>
                    <td>Примечание</td>
                    <td>Ответсвенное подразделение</td>
                    <td>Дата формирования общей заявки на закупки</td>
                    <td>Поставка</td>
                    <td>Отправлено</td>
                    <td>Отметка о выполнении</td>
                    <td>Комментарии</td>
                </tr>
                {this.state.goodsRequest.map(goodsRequest => <tr>
                    <td>{goodsRequest.id}</td>
                    <td>{goodsRequest.dateOfPurchaseRequest}</td>
                    <td>{goodsRequest.subdivision}</td>
                    <td>{goodsRequest.fullName}</td>
                    <td>{goodsRequest.oilfieldName}</td>
                    <td>{goodsRequest.goodsName}</td>
                    <td>{goodsRequest.amount}</td>
                    <td>{goodsRequest.unit}</td>
                    <td>{goodsRequest.dateOfReceiving}</td>
                    <td>{goodsRequest.note}</td>
                    <td>{goodsRequest.responsibleUnit}</td>
                    <td>{goodsRequest.dateOfGeneralRequest}</td>
                    <td>{goodsRequest.supply}</td>
                    <td>{goodsRequest.sent}</td>
                    <td>{goodsRequest.progressMark}</td>
                    <td>{goodsRequest.comments}</td>
                </tr>)}
            </table>;
        return (
            <div className="container__list">
                <span>!!!HomePage!!!</span>
                <button type="submit" onClick={loadGoodsRequests}>Find</button>
                <goodsRequestList>
                    {list}
                </goodsRequestList>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(HomePage);
