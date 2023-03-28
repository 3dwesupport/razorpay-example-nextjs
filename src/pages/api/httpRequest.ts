import axios from "axios";
export const httpRequest = async (req:any, url:any, _method:any, headers:any, body:any, auth = null) => {
    try {
        // @ts-ignore
        return await axios({
            method: _method,
            url: url,
            data: body,
            headers: headers,
            auth: auth,
        });
    } catch (error: any) {
        // @ts-ignore
        if (error.response) {
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
export const method = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    OPTIONS: "options",
}