//countercode
var button= document.getElementByd('counter');
var counter= 0;
button.onclick= function(){
    //make a request to the counterpoint
    
    //capture the response and store it in a variable
    
    //render the variable in the correct span
    counter = counter+1;
    var span =  document.get.ElementById('count');
    span.innerHTML= counter.toString();
}