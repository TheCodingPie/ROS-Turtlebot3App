import * as variables from './variables.js';
import * as poruke from './poruke.js';


window.dodeliBrzinu=()=> {

    let speed = parseFloat(document.getElementById("robotSpeed").value);
    
    if(isNaN(speed) || speed < 0 || speed > 0.26)
       poruke.praznoPoljePoruka("Proverite unos","speedStatus");
    else
      {
      
      variables.setRobotSpeed(speed);
      poruke.uspesnoPoruka("Uspesno ste dodelili brzinu: "+speed+ "m/s","speedStatus");
      }
  
  
  }


  function napraviPoruku(lx,ly,lz,ax,ay,az){
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

window.napred = ()=>{     

      let napred = napraviPoruku(variables.ROBOTSPEED,0,0,0,0,0);

      variables.TOPIC.publish(napred);
  }

  window.nazad= ()=> {   

    let nazad = napraviPoruku(-variables.ROBOTSPEED,0,0,0,0,0);

    variables.TOPIC.publish(nazad);
  }

  window.rotiraj= () =>{
     
      let rotiraj = napraviPoruku(0,0,0,0,0,1);

      variables.TOPIC.publish(rotiraj);
  }

  window.stop =() =>{

      let stop = napraviPoruku(0,0,0,0,0,0);

      variables.TOPIC.publish(stop);
  }
