// Promised based AMQP library
const amqp = require("amqplib");

const msg = {number: process.argv[2]};

connect();

async function connect(){
    try {
        // If the return type is a Bluebird, it's Promise based so you have to use the "await" keyword.

        // Must create connection first and then channels
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        // Makes sure queue exists. If it doesn't, it will be created.
        const result = await channel.assertQueue("jobs");

        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));

        console.log(`Job sent: ${msg.number}`);
    } catch (error) {
        console.error(error);
    }
}