// Promised based AMQP library
const amqp = require("amqplib");

connect();

async function connect(){
    try {
        // If the return type is a Bluebird, it's Promise based so you have to use the "await" keyword.

        // Must create connection first and then channels
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        // Makes sure queue exists. If it doesn't, it will be created.
        const result = await channel.assertQueue("jobs");

        // At first, you'll notice that despite consuming the data multiple times, it still hasn't been dequeued. This is because
        // you haven't told the server that you have consumed the data yet.
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);

            // How to acknowledge a message from the queue.
            if (input.number == 19){
                channel.ack(message);
            }

        })

        console.log("Waiting for messages...");

    } catch (error) {
        console.error(error);
    }
}