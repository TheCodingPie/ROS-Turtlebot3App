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

export { emptyInputField, success, failedConnection };
