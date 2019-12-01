import React, { Component } from 'react';
import axios from '../axios/axios';
import { connect} from 'react-redux';
import './HomePage.css';


class HomePage extends Component {
    render() {
        let getString = 'find';
        const loadGoodsRequests = () => {
            let subdivision = document.querySelector('#findSubdivision').value + '&';
            subdivision = subdivision.replace(/ /g, '%');
            getString = getString + '?subdivision=' + subdivision;
            getString = getString + 'dateOfRequestFrom=' + document.querySelector('#findDateOfRequestFrom').value + '&';
            getString = getString + 'dateOfRequestTo=' + document.querySelector('#findDateOfRequestTo').value + '&';
            getString = getString + 'dateOfReceivingFrom=' + document.querySelector('#findDateOfReceivingFrom').value + '&';
            getString = getString + 'dateOfReceivingTo=' + document.querySelector('#findDateOfReceivingTo').value + '&';
            getString = getString + 'dateOfGeneralRequestFrom=' + document.querySelector('#findDateOfGeneralRequestFrom').value + '&';
            getString = getString + 'dateOfGeneralRequestTo=' + document.querySelector('#findDateOfGeneralRequestTo').value + '&';
            getString = getString + 'supply=' + document.querySelector('#findSupply').value + '&';
            getString = getString + 'sent=' + document.querySelector('#findSent').value + '&';
            getString = getString + 'progressMark=' + document.querySelector('#findProgressMark').value;
            console.log(getString);
            axios.get('getString')
                .then(res => {
                    const goodsRequest = res.data;
                    this.setState({ goodsRequest });
                });
            getString = 'find';
        };
        const list = (this.state === null) ? <ul><li>empty</li></ul> :
            <table className={"requestsTable"}>
                <tr>
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
                {this.state.goodsRequest.map(goodsRequest =>
                    <tr>
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
                <div className={'findRequestPageName'}>
                  <h3>Поиск запроса на закупку</h3>
                </div>
                <div className={"filters"}>
                    <table>
                        <tr>
                            <th>
                                <label htmlFor={"findSubdivision"}>Подразделение</label>
                            </th>
                            <th>
                                <label htmlFor={"findDateOfRequestFrom"}>Дата подачи от</label>
                            </th>
                            <th>
                                <label htmlFor={"findDateOfRequestTo"}>Дата подачи до</label>
                            </th>
                            <th>
                                <label htmlFor={"findDateOfReceivingFrom"}>Дата получения от</label>
                            </th>
                            <th>
                                <label htmlFor={"findDateOfReceivingTo"}>Дата получения до</label>
                            </th>
                            <th>
                                <label htmlFor={"findDateOfGeneralRequestFrom"}>Дата общей заявки от</label>
                            </th>
                            <th>
                                <label htmlFor={"findDateOfGeneralRequestTo"}>Дата общей заявки до</label>
                            </th>
                            <th>
                                <label htmlFor={"findSupply"}>Поставка</label>
                            </th>
                            <th>
                                <label htmlFor={"findSent"}>Отправлено</label>
                            </th>
                            <th>
                                <label htmlFor={"findProgressMark"}>Отметка о выполнении</label>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <input className={'form-control'} id={"findSubdivision"}/>
                            </td>
                            <td>
                                <input type={'date'} className={'form-control date-input'} id={"findDateOfRequestFrom"}/>
                            </td>
                            <td>
                                <input type={'date'} className={'form-control date-input'} id={"findDateOfRequestTo"}/>
                            </td>
                            <td>
                                <input type={'date'} className={'form-control date-input'} id={"findDateOfReceivingFrom"}/>
                            </td>
                            <td>
                                <input type={'date'} className={'form-control date-input'} id={"findDateOfReceivingTo"}/>
                            </td>
                            <td>
                                <input type={'date'} className={'form-control date-input'} id={"findDateOfGeneralRequestFrom"}/>
                            </td>
                            <td>
                                <input type={'date'} className={'form-control date-input'} id={"findDateOfGeneralRequestTo"}/>
                            </td>
                            <td>
                                <select  className={'custom-select'} id={"findSupply"}>
                                    <option selected value={'any'}>Любой</option>
                                    <option value="true">Да</option>
                                    <option value="false">Нет</option>
                                </select >
                            </td>
                            <td>
                                <select  className={'custom-select'} id={"findSent"}>
                                    <option selected value={'any'}>Любой</option>
                                    <option value="true">Да</option>
                                    <option value="false">Нет</option>
                                </select >
                            </td>
                            <td>
                                <select  className={'custom-select'} id={"findProgressMark"}>
                                    <option selected value={'any'}>Любой</option>
                                    <option value="true">Да</option>
                                    <option value="false">Нет</option>
                                </select >
                            </td>

                        </tr>
                    </table>
            </div>
                <button type="button" className={"btn btn-primary"} onClick={loadGoodsRequests}>Find</button>
                <div className={'divgoodsRequestList'}>
                    {list}
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(HomePage);
