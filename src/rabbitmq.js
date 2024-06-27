const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://user:password@localhost:5672');
    channel = await connection.createChannel();
    await channel.assertQueue('songs_queue');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
}

function sendToQueue(message) {
  if (channel) {
    channel.sendToQueue('songs_queue', Buffer.from(JSON.stringify(message)));
  }
}

module.exports = { connectRabbitMQ, sendToQueue };
