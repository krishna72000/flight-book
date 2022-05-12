import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { pages } from "../../links/pages";
import Flight from './Flight';
import Home from "./Home"

function Main({ match }) {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={pages.HOME} component={Home} />
            <Route exact path={pages.FLIGHTS} component={Flight} />
        </Switch>
    );
}
export { Main };