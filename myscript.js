 let ros;

 poveziSeNaWebSocketServer=()=> {
    let webSocketAddress = document.getElementById("websocket").value;
    
    if(webSocketAddress=="")
    {
    console.log("prazno je")
      return;
    }      
    ros = new ROSLIB.Ros({
          //url : 'ws://localhost:9090'
          url : 'ws://' + webSocketAddress
    });

    ros.on('connection', ()=> {
      console.log('Uspesna konekcija ka websocket serveru.');
    });

    ros.on('error', ()=> {
      console.log('Greska prilikom konekcije, proverite ip i port za websocket server.');
    });

    ros.on('close', ()=> {
      console.log('Zatvorena konekcija ka websocket serveru.');
    });

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
      let topic = uzmiTopic();

      let napred = napraviPoruku(0.3,0,0,0,0,0);

      topic.publish(napred);
  }

nazad=()=> {
    let topic = uzmiTopic();

    let nazad = napraviPoruku(-0.3,0,0,0,0,0);

    topic.publish(nazad);
  }

 rotiraj=()=> {
      let topic = uzmiTopic();

      let rotiraj = napraviPoruku(0,0,0,0,0,0.3);

      topic.publish(rotiraj);
  }

 stop=()=> {
      let topic = uzmiTopic();

      let stop = napraviPoruku(0,0,0,0,0,0);

      topic.publish(stop);
  }
  prikaziMapu=()=>{
  // Create the main viewer.
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : 608,
    height : 550
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
