const pages = {
    LOGIN: "/login",
    PROFILE: "/profile",
    FLIGHTS: "/flights",
    TICKETS: "/tickets",
    HOME: "/home",
    FORGOT_PASSWORD: "/forgot-password",
    NEW_PASSWORD: "/new-password",
    VERIFY_ACCOUNT: "/verify-account",
    SIGNUP: "/signup"
};
const pagesTitle = {
    LOGIN: "Login",
    PROFILE: "Profile",
    FLIGHTS: "Flights",
    TICKETS: "Tickets",
    HOME: "Home",
    FORGOT_PASSWORD: "Forgot Password",
    NEW_PASSWORD: "New Password",
    VERIFY_ACCOUNT: "Verify Account",
    SIGNUP: "Signup"
};

const guestPage = [
    pages.FORGOT_PASSWORD,
    pages.LOGIN,
    pages.SIGNUP
];
export { pages, guestPage, pagesTitle };