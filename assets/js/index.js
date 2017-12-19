$(function() {
  $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    $('#lg').addClass('active');
    $('#rg').removeClass('active');
    e.preventDefault();
  });
$('#register-form-link').click(function(e) {
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  $('#lg').removeClass('active');
  $('#rg').addClass('active');
  e.preventDefault();
});
$('#register-submit').click(function(e) {
  var p1 = $("#password1").val();
  var p2 = $("#confirm-password").val();
  var email = $("#email").val();
  var fname = $("#username1").val();
  if(fname == "" ) {
    $("#err").html("Name can't be empty");
    // $("#username1").addClass("ebdr");
    e.preventDefault();
  } else if (!validateEmail(email)) {
    $("#err").html("Enter a valid email");
    // $("#register-form .form-control").removeClass("ebdr");
    e.preventDefault();
  } else if (p1 == "") {
    $("#err").html("Password can't be empty");
    e.preventDefault();
  } else if (p2 == "") {
    $("#err").html("Confirm Password can't be empty");
    e.preventDefault();
  } else if(p1 != p2) {
    $("#err").html("Enter same passwords!!");
    e.preventDefault();
  } else if (p1.length < 4) {
    $("#err").html('Password length must be atleast 4 characters');
    e.preventDefault();
  } else if ($('#jtype :checkbox:checked').length <= 0) {
    $("#err").html("Choose atleast 1 type of Job");
    e.preventDefault();
  } else {
    handleSignUp();
  }

});
});
function handleSignUp() {
var email = document.getElementById('email').value;
var password = document.getElementById('password1').value;
var fname = $("#username1").val();
var jtype = [];
$(function() {
  $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    $('#lg').addClass('active');
    $('#rg').removeClass('active');
    e.preventDefault();
  });
$('#register-form-link').click(function(e) {
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  $('#lg').removeClass('active');
  $('#rg').addClass('active');
  e.preventDefault();
});
$('#register-submit').click(function(e) {
  var p1 = $("#password1").val();
  var p2 = $("#confirm-password").val();
  var email = $("#email").val();
  var fname = $("#username1").val();
  if(fname == "" ) {
    $("#err").html("Name can't be empty");
    // $("#username1").addClass("ebdr");
    e.preventDefault();
  } else if (!validateEmail(email)) {
    $("#err").html("Enter a valid email");
    // $("#register-form .form-control").removeClass("ebdr");
    e.preventDefault();
  } else if (p1 == "") {
    $("#err").html("Password can't be empty");
    e.preventDefault();
  } else if (p2 == "") {
    $("#err").html("Confirm Password can't be empty");
    e.preventDefault();
  } else if(p1 != p2) {
    $("#err").html("Enter same passwords!!");
    e.preventDefault();
  } else if (p1.length < 4) {
    $("#err").html('Password length must be atleast 4 characters');
    e.preventDefault();
  } else if ($('#jtype :checkbox:checked').length <= 0) {
    $("#err").html("Choose atleast 1 type of Job");
    e.preventDefault();
  } else {
    handleSignUp();
  }

});
});
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password1').value;
    var fname = $("#username1").val();
    var jtype = [];
    $.each($('#jtype :checkbox:checked'),function () {
      jtype.push($(this).val());
    });
// console.log(jtype);
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(firebaseuser) {
  var databaseRef = firebase.database().ref().child('users/' + firebaseuser.uid);
  databaseRef.set({
    displayName: fname,
    email: email,
    pass: password,
    jType: jtype
  });
  var picurl = 'https://pikmail.herokuapp.com/'+email+'?size=150'
  firebase.auth().currentUser.updateProfile({
    displayName:fname,
    photoURL:[picurl]
  });
  firebase.auth().currentUser.sendEmailVerification().then(function(){
    alert("Verification mail sent kindly verify it");
  }).catch(function(error){
    console.log("Error");
  });
  // alert("Account created you can login");
  // $("#login-form-link").click();
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      window.location.href = "index.html";
    }
  });

  // setTimeout(function(){
  //   window.location.href = "index.html";
  // },3000);

})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  if (errorCode == 'auth/user-not-found') {
    $("#err").html('User already present');
  } else {
    $("#err").html(errorMessage);
  }
  console.log(error);

});
// [END createwithemail]
}
function toggleSignIn() {

if (firebase.auth().currentUser) {
  // [START signout]
  firebase.auth().signOut();
  // [END signout]
} else {
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (!validateEmail(email)) {
    $("#err").html('Please enter a valid email address.');
    return;
  }
  if (password.length < 4) {
    $("#err").html('Please enter a valid password.');
    return;
  }
  // Sign in with email and pass.
  // [START authwithemail]
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(firebaseuser) {
    // alert(firebaseuser.uid);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.emailVerified) {
        window.sessionStorage.setItem("UID",user.uid);
        window.sessionStorage.setItem("email",user.email);
        window.location = 'viewProfile.html';
      } else {
        window.sessionStorage.setItem("UID",user.uid);
        window.sessionStorage.setItem("email",user.email);
        window.location = 'verify.html';
        alert("Please verify your email address!");
      }
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      $("#err").html('Wrong password.');
    } else if (errorCode === 'auth/user-not-found') {
      $("#err").html("User not found");
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END authwithemail]

}
}
function validateEmail(sEmail) {
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if (filter.test(sEmail)) {
  return true;
}
else {
  return false;
}
}
function googleSignIn() {
  if (!firebase.auth().currentUser) {
  var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithPopup(provider).then(function(result){
    var token = result.credential.accessToken;
    var user = result.user;
    window.sessionStorage.setItem("UID",user.uid);
    window.sessionStorage.setItem("email",user.email);
    window.location = 'viewProfile.html';
  }).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
} else {
  firebase.auth().signOut();
}
}
function fbSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_location');
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accessToken;
      var user = result.user;
      window.sessionStorage.setItem("UID",firebase.auth().currentUser.uid);
      window.sessionStorage.setItem("email",user.email);
      window.location = 'viewProfile.html';
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  else {
    firebase.auth().signOut();
  }
}

$.each($('#jtype :checkbox:checked'),function () {
  jtype.push($(this).val());
});
// console.log(jtype);
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(firebaseuser) {
  var databaseRef = firebase.database().ref().child('users/' + firebaseuser.uid);
  databaseRef.set({
    displayName: fname,
    email: email,
    pass: password,
    jType: jtype
  });
  var picurl = 'https://pikmail.herokuapp.com/'+email+'?size=150'
  firebase.auth().currentUser.updateProfile({
    displayName:fname,
    photoURL:[picurl]
  });
  firebase.auth().currentUser.sendEmailVerification().then(function(){
    alert("Verification mail sent kindly verify it");
  }).catch(function(error){
    console.log("Error");
  });
  // alert("Account created you can login");
  // $("#login-form-link").click();
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      window.location.href = "index.html";
    }
  });

  // setTimeout(function(){
  //   window.location.href = "index.html";
  // },3000);

})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  if (errorCode == 'auth/user-not-found') {
    $("#err").html('User already present');
  } else {
    $("#err").html(errorMessage);
  }
  console.log(error);

});
// [END createwithemail]
}
function toggleSignIn() {
  
if (firebase.auth().currentUser) {
  // [START signout]
  firebase.auth().signOut();
  // [END signout]
} else {
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (!validateEmail(email)) {
    $("#err").html('Please enter a valid email address.');
    return;
  }
  if (password.length < 4) {
    $("#err").html('Please enter a valid password.');
    return;
  }
  // Sign in with email and pass.
  // [START authwithemail]
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(firebaseuser) {
    // alert(firebaseuser.uid);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.emailVerified) {
        window.sessionStorage.setItem("UID",user.uid);
        window.sessionStorage.setItem("email",user.email);
        window.location = 'profile.html';
      } else {
        window.sessionStorage.setItem("UID",user.uid);
        window.sessionStorage.setItem("email",user.email);
        window.location = 'verify.html';
        alert("Please verify your email address!");
      }
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      $("#err").html('Wrong password.');
    } else if (errorCode === 'auth/user-not-found') {
      $("#err").html("User not found");
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END authwithemail]

}
}
function validateEmail(sEmail) {
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if (filter.test(sEmail)) {
  return true;
}
else {
  return false;
}
}
function googleSignIn() {
  if (!firebase.auth().currentUser) {
  var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithPopup(provider).then(function(result){
    var token = result.credential.accessToken;
    var user = result.user;
    window.sessionStorage.setItem("UID",user.uid);
    window.sessionStorage.setItem("email",user.email);
    window.location = 'profile.html';
  }).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
} else {
  firebase.auth().signOut();
}
}
function fbSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.addScope('user_location');
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accessToken;
      var user = result.user;
      window.sessionStorage.setItem("UID",firebase.auth().currentUser.uid);
      window.sessionStorage.setItem("email",user.email);
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  else {
    firebase.auth().signOut();
  }
}
