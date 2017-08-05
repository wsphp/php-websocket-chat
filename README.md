<h1>PHP and WebSockets chat</h1>

<p>This is simple HTML chat with the following features:</p>
1) Unlimited number of connections (users).<br>
2) Every user may select his/her nickname and color.<br>
3) There are notifications wher someone has joined or left the chat.<br>
4) Minumum use of PHP.

<h2>How to setup it</h2>
1) You will need a <a href="http://wsphp.net">wsphp</a> server installed.<br>
2) Setup <i>app_path</i> config option to point to app.php<br>
3) Disable <i>cron_path</i> config option as we do not use it.<br>

<h2>Information</h2>
<p>Network communications are done using Websockets.
WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.
That is why we can read (via <i>ws.onmessage</i> callback) and send messages (via <i>ws.send</i>) using only one websocket connection.
<a href="http://wsphp.net">WSPHP</a> server takes care about websocket protocol actions: handshake, encoding/decoding frames, etc.
PHP role is small - it just re-sends received message to all connected users.
Messages are wrapped to JSON format for convenience.
</p>
