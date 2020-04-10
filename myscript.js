var ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
});

ros.on('connection', ()=> {
    console.log('Connected to websocket server.');
});

uzmiTopic=() => {
  return  new ROSLIB.Topic({
      ros : ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });
}

napred=()=> {
      var topic = uzmiTopic();

      var napred = new ROSLIB.Message({
            linear : {
              x : 0.3,
              y : 0.0,
              z : 0.0
            },
            angular : {
              x : 0.0,
              y : 0.0,
              z : 0.0
            }
          });

      topic.publish(napred);
}

nazad=()=> {
    var topic = uzmiTopic();

    var nazad = new ROSLIB.Message({
          linear : {
            x : -0.3,
            y : 0.0,
            z : 0.0
          },
          angular : {
            x : 0.0,
            y : 0.0,
            z : 0.0
          }
        });

    topic.publish(nazad);
}


 rotiraj=()=> {
      var topic = uzmiTopic();

      var rotiraj = new ROSLIB.Message({
            linear : {
              x : 0.0,
              y : 0.0,
              z : 0.0
            },
            angular : {
              x : 0.0,
              y : 0.0,
              z : 0.3
            } 
          });

      topic.publish(rotiraj);
}

 stop=()=> {
      var topic = uzmiTopic();

      var stop = new ROSLIB.Message({
            linear : {
              x : 0.0,
              y : 0.0,
              z : 0.0
            },
            angular : {
              x : 0.0,
              y : 0.0,
              z : 0.0
            }
          });

      topic.publish(stop);
}

