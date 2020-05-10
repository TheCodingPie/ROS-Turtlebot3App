let ROS;
 let MAP_HEIGHT = 600;
 let MAP_WIDTH = 600;
 let NAV_BUTTONS=[];
 let TOPIC;
 let ROBOTSPEED=0.26;

 function setRos(ros){
     ROS=ros;
    }
 
 function getNavButtons(){
  
   NAV_BUTTONS= document.getElementsByClassName("navButtons") 
 }

 function disableNavButtons(){

    for(let i=0;i<NAV_BUTTONS.length;i++)
        NAV_BUTTONS[i].disabled=true;
 }

 function enableNavButtons(){

    for(let i=0;i<NAV_BUTTONS.length;i++)
     NAV_BUTTONS[i].disabled = false;
 }
 
 function setRobotSpeed(newSpeed){

    ROBOTSPEED=newSpeed;
 }

 function getTopic()  {
    return  new ROSLIB.Topic({
        ros : ROS,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
      });
   }
  
 function setTopic(){

    TOPIC=getTopic();
 }

export {
   ROS, MAP_HEIGHT, MAP_WIDTH, NAV_BUTTONS, TOPIC, ROBOTSPEED,
   setRos,disableNavButtons,getNavButtons,enableNavButtons,setRobotSpeed,setTopic
 }
