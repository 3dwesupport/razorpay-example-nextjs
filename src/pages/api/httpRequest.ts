import axios from "axios";

 export const httpRequest = async (req, url, _method, headers, body, auth = null) => {
    try {
        return await axios({
            method: _method,
            url: url,
            data: body,
            headers: headers,
            auth: auth,
        });
    } catch (error) {
        if (error.response) {
            // Request made and server responded
            console.log({"location:": "response data", "data": error.response.data});
            console.log({"location:": "response status", "data": error.response.status});
            console.log({"location:": "response headers", "data": error.response.headers});
            return {data: error.response.data ?? {}, status: error.response.status};
        } else if (error.request) {
            // The request was made but no response was received
            console.log({"location:": "request", "data": error.request});
            return {data: "Bad Request", status: 400};
        }
        // Something happened in setting up the request that triggered an Error
        console.log('Error Message', error.message);
        return {};
    }
};