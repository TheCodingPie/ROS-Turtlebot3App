 let ros;

 poveziSeNaWebSocketServer=()=> {
    let webSocketAddress = document.getElementById("websocket").value;
    
    if(webSocketAddress=="")
    {
    console.log("Unesite adresu")
      return;
    }      
    ros = new ROSLIB.Ros({
          //url : 'ws://localhost:9090'
          url : 'ws://' + webSocketAddress
    });

    ros.on('connection', ()=> {
      console.log('Uspesna konekcija.');
    });

    ros.on('error', ()=> {
      console.log('Greska prilikom konekcije, proverite ip i port za websocket server.');
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

