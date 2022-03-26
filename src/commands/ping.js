module.exports = {
  'name': 'ping',
  'description': 'Shows bot\'s latency on the server',
  'aliases': [],

  execute(msg, args, client) {
    msg.channel.send(`Pong!\nLatency: ${client.ws.ping} ms`);
  },
};
