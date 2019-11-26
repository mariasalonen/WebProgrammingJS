$(document).ready(function(){
     $("#add").click(function(){
         console.log("lisää");
         var text = $("#uusi").val();
         var del = " X ";
         console.log(text); 
         console.log(del);
         $("del").css("color","red");
         $("del").addClass("delete"); 
         $("#lista").append('<li>' + text + del + '</li>'); 
         $("#uusi").focus();
         $("#uusi").val("");
 });
        $(".delete").click(function(){
            console.log("poista");
            this.remove();
        
            });
            
        });