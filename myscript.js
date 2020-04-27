 let ros;
 let MAP_HEIGHT = 600;
 let MAP_WIDTH = 600;
 let navButtons=[];
 let TOPIC;
 let ROBOTSPEED=0.26;

init=()=>{
    
    document.getElementById("websocket").value="";
    document.getElementById("websocket").innerHTML="";
    document.getElementById("robotSpeed").value="";
    document.getElementById("robotSpeed").innerHTML="";
    navButtons=document.getElementsByClassName("navButtons");
    for(let i=0;i<navButtons.length;i++)
        navButtons[i].disabled=true;
 
 }

poveziSeNaWebSocket=()=> {

    let webSocketAddress = document.getElementById("websocket").value;
    
    if(webSocketAddress == "")
    {
     
          praznoPoljePoruka("Unesite ip i port");
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

 dodeliBrzinu=()=> {

  let speed = parseFloat(document.getElementById("robotSpeed").value);
  
  if(isNaN(speed) || speed < 0 || speed > 0.26)
     praznoPoljePoruka("Proverite unos");
  else
    {
    ROBOTSPEED=speed;
    uspesnoPoruka("Uspesno ste dodelili brzinu: "+speed+ "m/s");
    }


}
 

uspesnaKonekcija= ()=> {
   let divToAdd= document.getElementById("connectionStatus");
   let pToremove= document.getElementById("pDanger");
   
  if(pToremove !== null)
       divToAdd.removeChild(pToremove);
  let pSuccess= document.getElementById("pSuccess");
  
  if(pSuccess === null)
       uspesnoPoruka("Uspesna konekcija");
  
  for(let i=0;i<navButtons.length;i++)
     navButtons[i].disabled = false;
  
  TOPIC=uzmiTopic();
   
}

praznoPoljePoruka=(poruka)=>
 {
   let divToAdd= document.getElementById("connectionStatus");
   let p = document.createElement("p");  
   p.innerHTML = poruka;
   p.setAttribute('class', 'alert alert-danger');
   p.setAttribute('id', 'pDanger');
   divToAdd.appendChild(p);
 }

uspesnoPoruka=(poruka)=>{
  let divToAdd= document.getElementById("connectionStatus");
  let pError= document.getElementById("pError");
  if(pError)
    divToAdd.removeChild(pError);
   let p = document.createElement("p");  
   p.innerHTML=poruka;
   p.setAttribute('class', 'alert alert-success');
   p.setAttribute('id', 'pSuccess');
   divToAdd.appendChild(p);

 }
neuspesnaKonekcijaPoruka=()=>{
   
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

      let napred = napraviPoruku(ROBOTSPEED,0,0,0,0,0);

      TOPIC.publish(napred);
  }

nazad=()=> {   

    let nazad = napraviPoruku(-ROBOTSPEED,0,0,0,0,0);

    TOPIC.publish(nazad);
  }

rotiraj=()=> {
     
      let rotiraj = napraviPoruku(0,0,0,0,0,1);

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


