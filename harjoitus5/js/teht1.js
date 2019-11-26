$(document).ready(function(){
    
   $("#laskin").submit(function(event){
    console.log("Submit happend");
    let n1 = parseInt($( "#nro1" ).val());
    let n2 = parseInt($( "#nro2" ).val());
    let n3 = n1 + n2;
    $("#tulos").text("Summa on: " + n3);
    event.preventDefault();
    console.log(n3);
});
    });