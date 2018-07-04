firebase.auth().onAuthStateChanged(function (firebaseUser) {

    console.log("here");
    // if(firebaseUser){
        

    // }else
    // {
    //     if(window.location!="http://kingapp.com.br/html/login.html"){
    //         console.log("if");
    //         window.location="http://dev.resapp.com/"
    //     }
    //     else {
    //         console.log("else");
    //     }

    // }
});


function logOut(){
    firebase.auth().signOut();
    window.location = "http://dev.resapp.com/";

}



function sendNotification(){

    var titleElement=document.getElementById('title');
    var descriptionElement=document.getElementById('description');


    title=titleElement.value;
    description=descriptionElement.value;

    if(title==""||description==""){

        document.getElementById('error').style.display='block';
    }
    else {

        $.ajax({
            url: "push1.php",
            type: "get", //send it through get method
            data: {
                description: description,
                name: title
        
            },
            success: function(response) {
        
               
            },
            error: function(xhr) {
        
            }
        });

        titleElement.value="";
        descriptionElement.value="";

        $("#notificationSuccessModal").modal();



}

}


function login(){
    
    var email=document.getElementById('userName');
    var password=document.getElementById('password');


    email=email.value;
    password=password.value;

    var auth=firebase.auth();
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(result) {
        window.location.href="http://dev.resapp.com/orders.html";
    }, function(error) {
        document.getElementById('err').style.display='block';
    });
}
