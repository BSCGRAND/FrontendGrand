import React, { Component } from 'react';
import axios from '../axios/axios';
import { connect} from 'react-redux';
import './HomePage.css';


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
            <table className={"requestsTable"} border={1}>
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
                <h3>Поиск запроса на закупку</h3>
                <div className={"filters"}>
                <table>
                    <tr>
                        <td><label htmlFor={"findIdFrom"}>Id от</label></td>
                        <td><label htmlFor={"findIdTo"}>Id до</label></td>
                        <td><label htmlFor={"findSubdivision"}>Подразделение</label></td>
                        <td><label htmlFor={"findDateOfRequestFrom"}>Дата подачи от</label></td>
                        <td><label htmlFor={"findDateOfRequestTo"}>Дата подачи до</label></td>
                        <td><label htmlFor={"findDateOfReceivingFrom"}>Дата получения от</label></td>
                        <td><label htmlFor={"findDateOfReceivingTo"}>Дата получения до</label></td>
                        <td><label htmlFor={"findDateOfGeneralRequestFrom"}>Дата общей заявки от</label></td>
                        <td><label htmlFor={"findDateOfGeneralRequestTo"}>Дата общей заявки до</label></td>
                        <td><label htmlFor={"findSupply"}>Поставка</label></td>
                        <td><label htmlFor={"findSent"}>Отправлено</label></td>
                        <td><label htmlFor={"findProgressMark"}>Отметка о выполнении</label></td>
                    </tr>
                    <tr>
                        <td><input id={"findIdFrom"}/></td>
                        <td><input id={"findIdTo"}/></td>
                        <td><input id={"findSubdivision"}/></td>
                        <td><input id={"findDateOfRequestFrom"}/></td>
                        <td><input id={"findDateOfRequestTo"}/></td>
                        <td><input id={"findDateOfReceivingFrom"}/></td>
                        <td><input id={"findDateOfReceivingTo"}/></td>
                        <td><input id={"findDateOfGeneralRequestFrom"}/></td>
                        <td><input id={"findDateOfGeneralRequestTo"}/></td>
                        <td><input id={"findSupply"}/></td>
                        <td><input id={"findSent"}/></td>
                        <td><input id={"findProgressMark"}/></td>
                    </tr>
                </table>
            </div>
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
