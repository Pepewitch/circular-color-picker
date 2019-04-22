import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../views/Home';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    }
]

export default routes.map((route, index) => {
    return <Route key={index} path={route.path} exact={route.exact} component={route.component} />
})