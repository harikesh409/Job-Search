
var config = {
  apiKey: "AIzaSyB5g0mK6MqouG8BSXrRog4ZHKbnWhdS72Y",
  authDomain: "job-search-4fab8.firebaseapp.com",
  databaseURL: "https://job-search-4fab8.firebaseio.com",
  projectId: "job-search-4fab8",
  storageBucket: "job-search-4fab8.appspot.com",
  messagingSenderId: "333432225904"
};
 firebase.initializeApp(config)
$(document).ready(function() {
  $("#searchBtn").click(function(event) {
    var domain = $("#searchTxt").val();
    var database = firebase.database();
    var dm="";
    // console.log(domain);
    database.ref().child(domain).once('value').then(function(snapshot) {
      dm = snapshot.val().uid;
      // console.log(dm);
      for(i=1;i<dm.length;i++)
      {
        // console.log("in loop");
        database.ref('/users').child(dm[i]).on('value',function(snapshot){
          var uname = snapshot.val().displayName;
          console.log(uname);
        });
      }
    });
  });
});
