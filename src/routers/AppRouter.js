import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';


const AppRouter = () => (
    <BrowserRouter>
        <div className='container'>
            <Switch>
                <Route path="/home" component={HomePage} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;