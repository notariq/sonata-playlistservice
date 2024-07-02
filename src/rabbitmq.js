const amqp = require('amqplib/callback_api');

const MQ_URI = process.env.MQ_URI || 'amqp://localhost:5672';

let channel = null;
let connection = null;

const connectToRabbitMQ = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(MQ_URI, (error0, conn) => {
      if (error0) {
        return reject(error0);
      }
      connection = conn;
      conn.createChannel((error1, ch) => {
        if (error1) {
          return reject(error1);
        }
        channel = ch;
        resolve(channel);
      });
    });
  });
};

const initializeRabbitMQ = async () => {
  try {
    await connectToRabbitMQ();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

const publishToQueue = async (queueName, data) => {
    if (!channel) {
        throw new Error("Channel is not created yet");
    }
    channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
};

const consumeQueue = async (queueName, callback) => {
    if (!channel) {
        throw new Error("Channel is not created yet");
    }
    channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (msg) => {
        if (msg !== null) {
            callback(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        }
    });
};

module.exports = { publishToQueue, consumeQueue , initializeRabbitMQ};
