import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    brokers: ["192.168.29.236:9092"],
    clientId: "kafka-admin",
});