import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from '../components/DashBoard';


const AppRouter = () => (
    <BrowserRouter>
        <div className='container'>
            <Switch>
                <Route path="/all" component={DashBoard} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;