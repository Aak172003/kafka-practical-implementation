import { kafka } from "./client.js";
const group  = process.argv[2];
console.log("group ", group);

const consumer = kafka.consumer({ groupId: group });

async function initConsumer() {
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });
    console.log("Subscribed to topic: rider-updates");

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Group ${group} :  [${topic}]: PART  ${partition}  : `, message.value.toString());
        },
    });

}

initConsumer();


