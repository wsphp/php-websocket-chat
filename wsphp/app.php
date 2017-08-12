<?php

echo "<WSContent>\n";

if(isset($_GET['client_notification']))
{	
	switch($_GET['client_notification'])
	{	case 'connected':
			echo '<WSSend to="all">{"notification":1,"sid":"'.$_SERVER['WSPHP_SESSION'].'"}</WSSend>';
			break;
		case 'disconnected':
			echo '<WSSend to="all">{"notification":0,"sid":"'.$_SERVER['WSPHP_SESSION'].'"}</WSSend>';
			break;
	}
}
else if(isset($_GET['message']))
{	$jsonString = '{"message":"'.htmlspecialchars($_GET['message']).'","color":"'.htmlspecialchars($_GET['color']).'","name":"'.htmlspecialchars($_GET['name']).'"}';
	echo '<WSSend to="all">'.$jsonString.'</WSSend>';
	// Message will not be delivered to originator client.
	// If you need to send message to all clients, including originator, uncomment this line:
	// echo '<WSReply>'.$jsonString.'</WSReply>';
}

echo "</WSContent>\n";
