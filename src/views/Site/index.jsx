import { Route, Switch } from 'react-router-dom';
import { pages } from "../../links/pages";
import Login from './Login';
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword";
// import NewPassword from "./NewPassword";
// import Verify from "./Verify"

function Site({ match }) {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={pages.LOGIN} component={Login} />
            <Route exact path={pages.FORGOT_PASSWORD} component={ForgotPassword} />
            {/* <Route exact path={pages.VERIFY_ACCOUNT} component={Verify} />
            <Route exact path={pages.NEW_PASSWORD} component={NewPassword} /> */}
            <Route exact path={pages.SIGNUP} component={Signup} />
        </Switch>
    );
}

export { Site };