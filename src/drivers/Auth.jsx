import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { pages, guestPage } from "../links/pages"
import { setLogin } from "../redux/action/userAction"


const Auth = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const userdata = window.localStorage.getItem("userModel");
    useEffect(() => {
        const userModel = JSON.parse(userdata);
        dispatch(setLogin(userModel));
        if (userdata === null) {
            if (!guestPage.includes(location.pathname)) {
                window.location.href = pages.LOGIN;
            }
        }
    }, []);
    return (
        <>
            {children}
        </>
    );
}

export default Auth;