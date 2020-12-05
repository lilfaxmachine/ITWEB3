

//HTTP Server
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wsServer = new Server({ server: server });

console.log(`Websocket listening on ${PORT}`);

wsServer.on("connection", (wsClient) => {
  wsClient.send("this message was pushed by the WebSocket Server");
  wsClient.onmessage = (msg) =>
    console.log(`The server received: ${message["data"]}`);
  wsClient.onerror = (error) =>
    console.log(`The server received: ${error["code"]}`);
  wsClient.onclose = (why) =>
    console.log(`The server received: ${why.code} ${why.reason}`);
});

setInterval(() => {
  wsServer.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
