const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function example() {

    const order1 = {
        order_id: "1",
        razorpay_id: "razorpayId1",
        amount: 1000,
        currency: "INR",
        receipt: "receipt1"
    }
    const order2 = {
        order_id: "2",
        razorpay_id: "razorpayId2",
        amount: 2000,
        currency: "INR",
        receipt: "receipt2"
    }
    const order3 = {
        order_id: "3",
        razorpay_id: "razorpayId3",
        amount: 3000,
        currency: "INR",
        receipt: "receipt3"
    }

    await prisma.CreateOrder
        .createMany({
            data: [order1, order2, order3,]
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
                    console.log("Fetched employee details sorted by employee IDs -");
                    console.log(res);
                })
                .catch((err) => {
                    console.log("Error in fetching employees: ", err);
                })
        })
        .catch((err) => {
            console.log("Error in creating employees: ", err);
        })
}

example()
    .then(() => {
        console.log("Ran the Prisma example successfully.")
    })
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
