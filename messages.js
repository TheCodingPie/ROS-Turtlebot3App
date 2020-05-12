import * as variables from './variables.js';

 function emptyInputField(message,divId)
 {
    let divToAdd= document.getElementById(divId);
    let p = document.createElement("p");  
    p.innerHTML = message;
    p.setAttribute('class', 'alert alert-danger');
    p.setAttribute('id', 'pDanger');
    divToAdd.appendChild(p);
 }

 function success(message,divId){
    
    let divToAdd= document.getElementById(divId);
    let pError= document.getElementById("pError");
    if(pError)
      divToAdd.removeChild(pError);
    let p = document.createElement("p");  
    p.innerHTML=message;
    p.setAttribute('class', 'alert alert-success');
    p.setAttribute('id', 'pSuccess');
    divToAdd.appendChild(p);

 }
function failedConnection(){
   
   let divToAdd= document.getElementById("connectionStatus");
   let p = document.createElement("p");  
   p.innerHTML="Neuspesna konekcija, proverite ip i port";
   p.setAttribute('class', 'alert alert-danger');
   p.setAttribute('id', 'pError');
   divToAdd.appendChild(p);

 }

 function successfulConnection () {
  
   let divToAdd= document.getElementById("connectionStatus");
   let pToremove= document.getElementById("pDanger");
   
  if(pToremove !== null)
       divToAdd.removeChild(pToremove);
  
   let pSuccess= document.getElementById("pSuccess");
  
  if(pSuccess === null)
       success("Uspesna konekcija","connectionStatus");
   
   variables.enableNavButtons();
   variables.setTopic();
}

export { emptyInputField, success, failedConnection, successfulConnection };
