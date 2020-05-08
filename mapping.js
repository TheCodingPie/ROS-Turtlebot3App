
import * as variables from './variables.js';

window.prikaziMapu=()=>{
  
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : variables.MAP_WIDTH,
    height : variables.MAP_HEIGHT
  });

  // Setup the map client.
  var gridClient = new ROS2D.OccupancyGridClient({
    ros : variables.ROS,
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

 window.sacuvajMapu=()=>{

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
