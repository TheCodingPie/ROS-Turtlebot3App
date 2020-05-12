import * as variables from './variables.js';

window.showMap=()=>{
  
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : variables.MAP_WIDTH,
    height : variables.MAP_HEIGHT
  });

  
  var gridClient = new ROS2D.OccupancyGridClient({
    ros : variables.ROS,
    rootObject : viewer.scene,
    // da bi stalno bila updatovana mapa		
    continuous: true
  });
 
  // prikaz mape
  gridClient.on('change', ()=> {
 
    viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
   
  });

 }

 window.saveMap=()=>{

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
