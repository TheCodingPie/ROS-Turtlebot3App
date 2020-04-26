 let ros;
 let MAP_HEIGHT = 600;
 let MAP_WIDTH = 600;
 let navButtons=[];
 let TOPIC;

init=()=>{
    
    document.getElementById("websocket").value="";
    document.getElementById("websocket").innerHTML="";
    navButtons=document.getElementsByClassName("navButtons");
    for(let i=0;i<navButtons.length;i++)
        navButtons[i].disabled=true;
 
 }

poveziSeNaWebSocketServer=()=> {

    let webSocketAddress = document.getElementById("websocket").value;
    
    if(webSocketAddress == "")
    {
      let pToremove= document.getElementById("pDanger");
      if(pToremove === null)
          praznoPoljePoruka();
      return;
    }      
    ros = new ROSLIB.Ros({
          //url : 'ws://localhost:9090'
          url : 'ws://' + webSocketAddress
    });

    ros.on('connection',uspesnaKonekcija);

    ros.on('error', neuspesnaKonekcijaPoruka);

    ros.on('close', ()=> {
      console.log('Zatvorena konekcija ka websocket serveru.');
    });

 }
 

uspesnaKonekcija= ()=> {
   let divToAdd= document.getElementById("connectionStatus");
   let pToremove= document.getElementById("pDanger");
   
  if(pToremove !== null)
       divToAdd.removeChild(pToremove);
  let pSuccess= document.getElementById("pSuccess");
  
  if(pSuccess === null)
       uspesnaKonekcijaPoruka(divToAdd);
  
  for(let i=0;i<navButtons.length;i++)
     navButtons[i].disabled = false;
  
  TOPIC=uzmiTopic();
   
}

praznoPoljePoruka=()=>
 {
   let divToAdd= document.getElementById("connectionStatus");
   let p = document.createElement("p");  
   p.innerHTML = "Unesite ip i port webSocket-a";
   p.setAttribute('class', 'alert alert-danger');
   p.setAttribute('id', 'pDanger');
   divToAdd.appendChild(p);
 }

uspesnaKonekcijaPoruka=(divToAdd)=>{
  let pError= document.getElementById("pError");
  if(pError)
    divToAdd.removeChild(pError);
   let p = document.createElement("p");  
   p.innerHTML="Uspesna konekcija";
   p.setAttribute('class', 'alert alert-success');
   p.setAttribute('id', 'pSuccess');
   divToAdd.appendChild(p);

 }
neuspesnaKonekcijaPoruka=()=>{
   let pError= document.getElementById("pError");
   if(pError)
     return;
   let divToAdd= document.getElementById("connectionStatus");
   let p = document.createElement("p");  
   p.innerHTML="Neuspesna konekcija, proverite ip i port";
   p.setAttribute('class', 'alert alert-danger');
   p.setAttribute('id', 'pError');
   divToAdd.appendChild(p);

 }

napraviPoruku=(lx,ly,lz,ax,ay,az)=>{
  return new ROSLIB.Message({
    linear : {
      x : lx,
      y : ly,
      z : lz
    },
    angular : {
      x : ax,
      y : ay,
      z : az
    } 
  });

}

uzmiTopic=() => {
  return  new ROSLIB.Topic({
      ros : ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });
 }

napred=()=> {     

      let napred = napraviPoruku(0.3,0,0,0,0,0);

      TOPIC.publish(napred);
  }

nazad=()=> {   

    let nazad = napraviPoruku(-0.3,0,0,0,0,0);

    TOPIC.publish(nazad);
  }

rotiraj=()=> {
     
      let rotiraj = napraviPoruku(0,0,0,0,0,0.3);

      TOPIC.publish(rotiraj);
  }

stop=()=> {

      let stop = napraviPoruku(0,0,0,0,0,0);

      TOPIC.publish(stop);
  }
  
prikaziMapu=()=>{
  
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : MAP_WIDTH,
    height : MAP_HEIGHT
  });

  // Setup the map client.
  var gridClient = new ROS2D.OccupancyGridClient({
    ros : ros,
    rootObject : viewer.scene,
    // Use this property in case of continuous updates			
    continuous: true
  });
 
  // Scale the canvas to fit to the map
  gridClient.on('change', ()=> {
 
    viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
   
  });

 }

sacuvajMapu=()=>{

  const a = document.createElement("a");
  document.body.appendChild(a);
  window.scrollTo(0,0);
  html2canvas(document.getElementById("map")).then(canvas => {
   
      a.href = canvas.toDataURL();
      a.download = "mapa.png";
      a.click();
      document.body.removeChild(a);
  });

}

