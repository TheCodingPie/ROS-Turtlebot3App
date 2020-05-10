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

    variables.ROS.on('connection',successfulConnection);

    variables.ROS.on('error', messages.failedConnection);

    variables.ROS.on('close', ()=> {
      console.log('Zatvorena konekcija ka websocket serveru.');
    });

 }

function successfulConnection () {
   let divToAdd= document.getElementById("connectionStatus");
   let pToremove= document.getElementById("pDanger");
   
  if(pToremove !== null)
       divToAdd.removeChild(pToremove);
  
   let pSuccess= document.getElementById("pSuccess");
  
  if(pSuccess === null)
       messages.success("Uspesna konekcija","connectionStatus");
   
   variables.enableNavButtons();
   variables.setTopic();
}

