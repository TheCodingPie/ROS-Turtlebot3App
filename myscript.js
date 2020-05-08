import * as poruke from './poruke.js';
import * as variables from './variables.js';


window.init=()=>{
    
    document.getElementById("websocket").value="";
    document.getElementById("websocket").innerHTML="";
    document.getElementById("robotSpeed").value="";
    document.getElementById("robotSpeed").innerHTML="";
    variables.getNavButtons();
    variables.disableNavButtons();
 
 }

 window.poveziSeNaWebSocket=()=> {

    let webSocketAddress = document.getElementById("websocket").value;
    
    if(webSocketAddress == "")
    {
      poruke.praznoPoljePoruka("Unesite ip i port","connectionStatus");
      return;
    }      
    variables.setRos( new ROSLIB.Ros({url : 'ws://' + webSocketAddress}));

    variables.ROS.on('connection',uspesnaKonekcija);

    variables.ROS.on('error', poruke.neuspesnaKonekcijaPoruka);

    variables.ROS.on('close', ()=> {
      console.log('Zatvorena konekcija ka websocket serveru.');
    });

 }

 

function uspesnaKonekcija () {
   let divToAdd= document.getElementById("connectionStatus");
   let pToremove= document.getElementById("pDanger");
   
  if(pToremove !== null)
       divToAdd.removeChild(pToremove);
  let pSuccess= document.getElementById("pSuccess");
  
  if(pSuccess === null)
       poruke.uspesnoPoruka("Uspesna konekcija","connectionStatus");
  

       variables.enableNavButtons();
  
  
  
   variables.setTopic();
}

