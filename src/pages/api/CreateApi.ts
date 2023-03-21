// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

const httpRequest = async (req, url, _method, headers, body, auth = null) => {
    try {
        return await axios({
            method: _method,
            url: url,
            data: body,
            headers: headers,
            auth: auth
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
const method = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    OPTIONS: "options",
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const options = req.body;
    console.log("options :: ", options);
    const headers = {
        'Content-Type': 'application/json',
    }
    let apiUrl = "https://api.razorpay.com/v1" + "/orders";
    let result = await httpRequest(req, apiUrl, method.POST, headers, options, {
        username: "rzp_test_XnlOuOZNrannpU",
        password: "tVOBOvJuHEaF7SfLHRhyLFn6"
    });
    console.log(result.data)
    res.status(200).json(result.data);

}
