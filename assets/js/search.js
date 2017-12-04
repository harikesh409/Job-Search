
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
      $("#searchResult").html("");
      for(i=1;i<dm.length;i++)
      {
        console.log("in loop");
        database.ref('/users').child(dm[i]).on('value',function(snapshot){
          var fname="",lname="",place="";
          fname = snapshot.val().firstName;
          lname = snapshot.val().lastName;
          place = snapshot.val().place;
          // console.log(fname);
          $("#searchResult").append(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start" data-id="searchItem">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">`+fname.toUpperCase()+` `+lname.toUpperCase()+ `</h5>
              </div>
              <p><i class="fa fa-map-marker"></i> `+place+`</p>
              <p>Bio</p>
            </a>`);
            $('[data-id="searchItem"]').hover(function() {
              $(this).addClass('active');
            }, function() {
              $(this).removeClass('active');
            });
        });
      }
    });
  });
});
