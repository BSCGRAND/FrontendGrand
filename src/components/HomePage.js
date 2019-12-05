import React, { Component } from 'react';
import axios from '../axios/axios';
import { connect} from 'react-redux';
import './HomePage.css';


class HomePage extends Component {
    render() {
        console.log(this.state);
        let getString = 'find';
        const loadGoodsRequests = () => {
            let subdivision = document.querySelector('#findSubdivision').value + '&';
            subdivision = subdivision.replace(/ /g, '%20');
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
            axios.get(getString)
                .then(res => {
                    const goodsRequest = res.data;
                    this.setState({ goodsRequest });
                });
            getString = 'find';
        };
        const changeValueHandlerFactory = (goodsRequest, field) => {
            let f = false;
            if (field === "supply") f = goodsRequest.supply;
            else if (field === "sent") f = goodsRequest.sent;
            else f = goodsRequest.progressMark;
            return (
            <td>
                <input type={"checkbox"} className={"checkBox"} id={field+goodsRequest.id} defaultChecked={f} onClick={() => {
                    if (field === "supply") goodsRequest.supply = !goodsRequest.supply;
                    else if (field === "sent") goodsRequest.sent = !goodsRequest.sent;
                    else goodsRequest.progressMark = !goodsRequest.progressMark;
                    axios.post("update", goodsRequest).then(res => {
                        console.log(res);
                        console.log(res.status);
                        if (res.status === 400) {
                            alert("Произошла обибка! Изменение не было сохранено");
                        }
                    });
                    console.log(goodsRequest);
                }}/>
            </td>)
        };
        const editButtonHandlerFactory = (goodsRequest) => {
            const saveHandler = (goodsRequest) => {
                goodsRequest.responsibleUnit = document.querySelector("#smallText"+goodsRequest.id).value;
                goodsRequest.dateOfGeneralRequest = document.querySelector("#dateInput"+goodsRequest.id).value;
                goodsRequest.comments = document.querySelector("#bigText"+goodsRequest.id).value;
                axios.post("update", goodsRequest).then(res => {
                    console.log(res);
                    console.log(res.status);
                    if (res.status === 400) {
                        alert("Произошла обибка! Изменение не было сохранено");
                    }
                });
                console.log(goodsRequest);
                this.setState(goodsRequest);
            };
            return (
                <div>
                    <button type="button" className={"btn btn-light"} data-toggle="modal" data-target={"#modal"+goodsRequest.id}>
                        X
                    </button>
                    <div className={"modal fade"} id={"modal"+goodsRequest.id} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className={"modal-dialog"} role="document">
                            <div className={"modal-content"}>
                                <div className={"modal-header"}>
                                    <h5 className={"modal-title"} id={"exampleModalLabel"}>Редактирование заявки</h5>
                                    <button type="button" className={"close"} data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        Ответсвенное подразделение:
                                    </div>
                                    <div>
                                        <input className={'form-control modal_smallText'} id={"smallText"+goodsRequest.id} defaultValue={goodsRequest.responsibleUnit}/>
                                    </div>
                                    <div>
                                        Дата формирования общей заявки на закупки:
                                    </div>
                                    <div>
                                        <input type={'date'} className={'form-control date-input'} id={"dateInput"+goodsRequest.id} defaultValue={goodsRequest.dateOfGeneralRequest}/>
                                    </div>
                                    <div>
                                        Комментарии:
                                    </div>
                                    <div>
                                        <input className={'form-control modal_bigText'} id={"bigText"+goodsRequest.id} defaultValue={goodsRequest.comments}/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => saveHandler(goodsRequest)} data-dismiss="modal">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        };
        const list = (this.state === null) ? <ul><li>empty</li></ul> :
            <table className={"requestsTable"}>
                <tbody>
                    <tr className={"firsRow"}>
                        <td>Дата подачи заявки</td>
                        <td>Подразделение</td>
                        <td>Ф.И.О</td>
                        <td>Объект</td>
                        <td>Наименование</td>
                        <td>Кол-во</td>
                        <td>Ед.измерения</td>
                        <td>Дата получения на объекте</td>
                        <td>Примечание</td>
                        <td>Edit</td>
                        <td>Ответсвенное подразделение</td>
                        <td>Дата формирования общей заявки на закупки</td>
                        <td>Поставка</td>
                        <td>Отправлено</td>
                        <td>Отметка о выполнении</td>
                        <td>Комментарии</td>
                    </tr>
                </tbody>
                <tbody>
                {this.state.goodsRequest.map(goodsRequest =>
                        <tr key={goodsRequest.id}>
                            <td>{goodsRequest.dateOfPurchaseRequest}</td>
                            <td>{goodsRequest.subdivision}</td>
                            <td>{goodsRequest.fullName}</td>
                            <td>{goodsRequest.oilfieldName}</td>
                            <td>{goodsRequest.goodsName}</td>
                            <td>{goodsRequest.amount}</td>
                            <td>{goodsRequest.unit}</td>
                            <td>{goodsRequest.dateOfReceiving}</td>
                            <td>{goodsRequest.note}</td>
                            <td>
                                {editButtonHandlerFactory(goodsRequest)}
                            </td>
                            <td>{goodsRequest.responsibleUnit}</td>
                            <td>{goodsRequest.dateOfGeneralRequest}</td>
                            {changeValueHandlerFactory(goodsRequest, "supply")}
                            {changeValueHandlerFactory(goodsRequest, "sent")}
                            {changeValueHandlerFactory(goodsRequest, "progressMark")}
                            <td>{goodsRequest.comments}</td>
                        </tr>
                    )}
                </tbody>
            </table>;
        return (
            <div className="container__list">
                <div className={'findRequestPageName'}>
                  <h3>Поиск запроса на закупку</h3>
                </div>
                <div className={"filters"}>
                    <table>
                        <tbody>
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
                                        <option defaultValue value={'any'}>Любой</option>
                                        <option value="true">Да</option>
                                        <option value="false">Нет</option>
                                    </select >
                                </td>
                                <td>
                                    <select  className={'custom-select'} id={"findSent"}>
                                        <option defaultValue value={'any'}>Любой</option>
                                        <option value="true">Да</option>
                                        <option value="false">Нет</option>
                                    </select >
                                </td>
                                <td>
                                    <select  className={'custom-select'} id={"findProgressMark"}>
                                        <option defaultValue value={'any'}>Любой</option>
                                        <option value="true">Да</option>
                                        <option value="false">Нет</option>
                                    </select >
                                </td>

                            </tr>
                        </tbody>
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
