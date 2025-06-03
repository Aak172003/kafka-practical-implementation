import { kafka } from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


async function initProducer() {
    const producer = kafka.producer();
    console.log("Connecting to Kafka...");
    await producer.connect();
    console.log("Producer connected successfully");


    rl.setPrompt("> ");
    rl.prompt();
    rl.on("line", async function (line) {
        const [name, location, status] = line.split(" ");
        await producer.send({
            topic: "rider-updates",
            messages: [{
                partition: location.toLowerCase() === "north" ? 0 : 1,
                key: "rider-1",
                value: JSON.stringify({
                    name,
                    location,
                    status,
                }),
            }],
        })
    }).on("close", async () => {
        console.log("Message sent successfully");
        await producer.disconnect();
        console.log("Producer disconnected successfully");
    });





    // Just write a individual message to the topic
    // await producer.send({
    //     topic: "rider-updates",
    //     messages: [{
    //         partition: 0,
    //         key: "rider-1",
    //         value: JSON.stringify({
    //             name: "Aadarsh Kumar",
    //             location: "USA",
    //             status: "active",
    //         }),
    //     }],
    // });
    // console.log("Message sent successfully");

    // await producer.disconnect();
    // console.log("Producer disconnected successfully");
}

initProducer();

