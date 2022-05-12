import axios from "axios";

const api = axios.create({
    baseURL: "https://airflight.herokuapp.com/",
});

const getApiRequest = async (options) => {

    let optObj = {
        url: "",
        method: "POST",
        data: [],
        token: ""
    };
    const combinedOptions = {
        ...optObj,
        ...options,
    }
    if ((combinedOptions.method).toLowerCase() == "post") {
        const response = await api.post(combinedOptions.url, { ...combinedOptions.data });
        return response.data;
    }
    const response = await api.get(combinedOptions.url, { ...combinedOptions.data });
    return response.data;
}
export default getApiRequest;
