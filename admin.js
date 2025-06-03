import { kafka } from "./client.js";


async function initAdmin() {
    const admin = kafka.admin();
    console.log("Connecting to Kafka...");
    await admin.connect();
    console.log("Admin connected successfully");

    console.log("Creating topics...");
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2,
            },

        ],
    });
    console.log("Topics created successfully");
    await admin.disconnect();
    console.log("Admin disconnected successfully");
}

initAdmin();

