// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from "next";
import {httpRequest} from "@/pages/api/httpRequest";
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
import { nanoid } from 'nanoid'

const method = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
    OPTIONS: "options",
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const options = req.body;
    const headers = {
        'Content-Type': 'application/json',
    }
    let apiUrl = "https://api.razorpay.com/v1" + "/orders";
    let result = await httpRequest(req, apiUrl, method.POST, headers, options, {
        username: "rzp_test_XnlOuOZNrannpU",
        password: "tVOBOvJuHEaF7SfLHRhyLFn6"
    });
    options.order_id = nanoid(10);
    // options.amount = parseInt(options.amount)
    await prisma.CreateOrder
        .createMany({
            data: [options]
        })
        .then(async (res) => {
            console.log("Created", res.count, "order");
            await prisma.CreateOrder
                .findMany({
                    orderBy: {
                        order_id: 'desc'
                    },
                })
                .then((res) => {
                    console.log("Fetched orders details sorted by orders IDs -");
                    console.log(res);
                })
                .catch((err) => {
                    console.log("Error in fetching orders: ", err);
                })
        })
        .catch((err) => {
            console.log("Error in creating orders: ", err);
        })

    res.status(200).json(result.data);

}
