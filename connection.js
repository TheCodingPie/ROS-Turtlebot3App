import * as messages from './messages.js';
import * as variables from './variables.js';

window.initialize=()=>{
    
    document.getElementById("websocket").value="";
    document.getElementById("websocket").innerHTML="";
    document.getElementById("robotSpeed").value="";
    document.getElementById("robotSpeed").innerHTML="";
    variables.getNavButtons();
    variables.disableNavButtons();
 }

 window.connectToWebSocket=()=> {

    let webSocketAddress = document.getElementById("websocket").value;
    
    if(webSocketAddress == "")
    {
      messages.emptyInputField("Unesite ip i port","connectionStatus");
      return;
    }      
    variables.setRos( new ROSLIB.Ros({url : 'ws://' + webSocketAddress}));

    variables.ROS.on('connection',messages.successfulConnection);

    variables.ROS.on('error', messages.failedConnection);

    variables.ROS.on('close', ()=> {
      console.log('Zatvorena konekcija ka websocket serveru.');
    });

 }

