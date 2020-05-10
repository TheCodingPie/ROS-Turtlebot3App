import * as variables from './variables.js';
import * as messages from './messages.js';


window.setRobotSpeed=()=> {

    let speed = parseFloat(document.getElementById("robotSpeed").value);
    
    if(isNaN(speed) || speed < 0 || speed > 0.26)
       messages.emptyInputField("Proverite unos","speedStatus");
    else
      {
      
      variables.setRobotSpeed(speed);
      messages.success("Uspesno ste dodelili brzinu: "+speed+ "m/s","speedStatus");
      }
  
  
  }

function getRosMessage(lx,ly,lz,ax,ay,az){
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

window.forward = ()=>{     

      let forward = getRosMessage(variables.ROBOTSPEED,0,0,0,0,0);

      variables.TOPIC.publish(forward);
  }

  window.backward= ()=> {   

    let backward = getRosMessage(-variables.ROBOTSPEED,0,0,0,0,0);

    variables.TOPIC.publish(backward);
  }

  window.rotate= () =>{
     
      let rotate = getRosMessage(0,0,0,0,0,1);

      variables.TOPIC.publish(rotate);
  }

  window.stop =() =>{

      let stop = getRosMessage(0,0,0,0,0,0);

      variables.TOPIC.publish(stop);
  }
