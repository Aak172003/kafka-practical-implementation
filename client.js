import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  brokers: ["IP_ADDRESS:9092"],
  clientId: "kafka-admin",
});