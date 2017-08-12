var ws = false;
var connected = false;

function Reconnect()
{	var url=false;

	url = document.getElementById("server").innerHTML;
	if(!url || !url.length)
	{	url = location.host;
		if(!url || !url.length) url="127.0.0.1:30403";
		document.getElementById("server").innerHTML = url;
	}

	if(connected)
	{	ChatMessage(false, "#999", "disconnected from server");
		connected = false;
	}
	if(ws) ws.close();
	else ChatMessage(false, "#AAA", "connecting to server...");
	connected = false;
	ws = new WebSocket("ws://"+url+"/wsphp");
	ws.onopen    = function(evt) { onOpen(evt);    };
	ws.onclose   = function(evt) { onClose(evt);   };
	ws.onmessage = function(evt) { onMessage(evt); };
	ws.onerror   = function(evt) { onError(evt);   };
}

function onOpen(evt)
{	if(!connected)
	{	ChatMessage(false, "#999", "connected to server");
		connected = true;
	}
}

function onClose(evt)
{	setTimeout(Reconnect, 1000);
}

function onMessage(evt)
{	try
	{	onMessageJSON(JSON.parse(evt.data));
	} catch(e)
	{	ChatMessage(false, "#999999", "JSON error: "+evt.data.replace(/</g,"&lt;").replace(/>/g,"&gt;"));
	}
}

function onMessageJSON(json)
{	if(window.console) console.log(json);
	if(json)
	{	if("undefined" !== typeof json.notification)
		{	ChatMessage(false, "#999999", "Someone "+(json.notification?"joined the chat":"left the chat"));
		}
		if("undefined" !== typeof json.message)
		{	ChatMessage(json.name, json.color, json.message);
		}
	}
}

function onError(evt)
{	if(connected) ChatMessage(false, "#999999", "Websocket error");
}

function OnServerChange(link)
{	var newServer = prompt("Enter new server name and port number:", link.innerHTML);
	if(newServer)
	{	link.innerHTML=newServer;
		Reconnect();
	}
	return false;
}

function ChatMessage(nick, color, message)
{	var s = (new Date().toLocaleString())+" ";
	if(color) s += "<font color="+color+">";
	if(nick) s += "<i>"+nick+"</i>: ";
	if(message) s += "<b>"+message+"</b>";
	if(color) s += "</font>";
	var chat = document.getElementById("chat");
	chat.innerHTML = s + "<br>" + chat.innerHTML;
}

function OnSay(form)
{	try{
		if(ws) ws.send("name="+form.name.value+"&message="+form.message.value+"&color="+form.color.value);
	}catch(e) { if(window.console) console.log("OnSay() "+e); }
	return false;
}