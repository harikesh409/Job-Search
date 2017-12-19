
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
 var sessionMail = sessionStorage.getItem("email");
 $(document).ready(function() {
   if(sessionMail){
     var url = 'https://pikmail.herokuapp.com/'+sessionMail+'?size=150';
     $("#proPic").html('<img src="'+url+'" class="img-fluid rounded-circle">');
   } else {
     alert("No profile pic for this mail id");
   }
 });

 if(user == null) {
   alert("You are logged out Login again!");
   console.log("logged out");
   window.location.href = "index.html";
 }
 function signout(){
   firebase.auth().signOut().then(function() {
     console.log('Signed Out');
     sessionStorage.removeItem("UID");
     window.location.href = "index.html";
   });
 }
    function profile(){
     event.preventDefault();
     // console.log("In profile()")
     var firstName = $("#firstName").val();
     var lastName = $("#lastName").val();
     var phoneNumber = $("#phoneNumber").val();
     var dob = $("#dateOfBirth").val();
     var gender = $("#gender").val();
     var location = $("#location").val();
     var workDomain = $("#workName").val();
      workDomain = workDomain.toLowerCase();
      var url = 'https://pikmail.herokuapp.com/'+sessionMail+'?size=150';
     var user = sessionStorage.getItem("UID");
     firebase.auth().currentUser.updateProfile({
       displayName:firstName,
       photoURL:url,
       phoneNumber:phoneNumber
     }).then(function(){
       console.log("Updated display Name");
     });
     var databaseRef = firebase.database().ref().child('users/' + user);
     databaseRef.update({
       firstName: firstName,
       lastName: lastName,
       phoneNumber : phoneNumber,
       dateOfBirth : dob,
       gender : gender,
       place : location,
       workDomain : workDomain
     });
      firebase.database().ref().child(workDomain).once('value').then(function(snapshot) {
        var key = snapshot.child('uid').numChildren();
        firebase.database().ref().child(workDomain + '/uid/').update({
          [key+1]:user
        });
      });
      setTimeout(function(){
        window.location.href = "search.html";
      },3000);

   }
