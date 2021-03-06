
var config = {
  apiKey: "AIzaSyB5g0mK6MqouG8BSXrRog4ZHKbnWhdS72Y",
  authDomain: "job-search-4fab8.firebaseapp.com",
  databaseURL: "https://job-search-4fab8.firebaseio.com",
  projectId: "job-search-4fab8",
  storageBucket: "job-search-4fab8.appspot.com",
  messagingSenderId: "333432225904"
};
 firebase.initializeApp(config)
 var user = sessionStorage.getItem("UID");
  if(user == null) {
     alert("You are logged out!");
     //console.log("logged out");
     window.location.href = "index.html";
 }
 function signout(){
   firebase.auth().signOut().then(function() {
     console.log('Signed Out');
     sessionStorage.removeItem("UID");
     sessionStorage.removeItem("email");
     window.location.href = "index.html";
   });
 }
    function viewProfile(){
     //console.log("In viewProfile()")
     var database = firebase.database();
     var user = sessionStorage.getItem("UID");
     database.ref('/users').child(user).on('value',function(snapshot){
       if(snapshot.val() == null){
         window.location.href = "profile.html";
       } else {
         var workDomain = snapshot.val().workDomain;
         if(workDomain == null || workDomain == "") {
           window.location.href = "profile.html";
         }
     }
       var firstName = snapshot.val().firstName;
       var lastName = snapshot.val().lastName;
       var phoneNumber = snapshot.val().phoneNumber;
       var gender = snapshot.val().gender;
       var dob = snapshot.val().dateOfBirth;
       var place = snapshot.val().place;
       var url = firebase.auth().currentUser.photoURL;

       $("#firstName").html(firstName);
       $("#lastName").html(lastName);
       $("#phoneNumber").html(phoneNumber);
       $("#gender").html(gender);
       $("#dob").html(dob);
       $("#place").html(place);
       $("#workDomain").html(workDomain);
       $("#proPic").html('<img src="'+url+'" class="img-fluid rounded-circle">');
       console.log(place);
     });
   }
