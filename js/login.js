// Abhishek Choudhary
$(document).ready(function () {
  const dialogMessage = $("#dialog-message");
  $("#showSignup").click(function () {
    $("#loginForm").hide();
    $("#signupForm").show();
  });

  $("#showLogin").click(function () {
    $("#signupForm").hide();
    $("#loginForm").show();
  });

  $("#signupForm").submit(function (e) {
    e.preventDefault();

    // Checking if entered data is valid
    var name = $("#signupName").val();
    var email = $("#signupEmail").val();
    var password = $("#signupPassword").val();
    var confirmPassword = $("#confirmSignupPassword").val();

    if (name === "" || email === "" || password === "") {
      showDialog("Error", "Please fill in all fields");
      return;
    } else if (password !== confirmPassword) {
      showDialog("Error", "Password must match");
      return;
    }

    // Save signup data to local storage
    var userData = {
      name: name,
      email: email,
      password: password,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    showDialog("Success", "Signup successful. You can now login.");
    $("#signupForm").hide();
    $("#loginForm").show();
    $("#signupForm")[0].reset();
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    // Fetch user data from local storage
    var storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      var userData = JSON.parse(storedUserData);
      var enteredEmail = $("#loginEmail").val();
      var enteredPassword = $("#loginPassword").val();

      if (
        enteredEmail === userData.email &&
        enteredPassword === userData.password
      ) {
        showDialog("Success", "Login successful");
        localStorage.setItem("login", "true");
        window.location.replace("index.html");
      } else {
        showDialog("Error", "Invalid email or password");
      }
    } else {
      showDialog("Error", "No account found. Please sign up.");
    }

    // Clear the login form
    $("#loginForm")[0].reset();
  });
  function showDialog(title, message) {
    dialogMessage
      .html(message)
      .dialog({
        modal: true,
        title: title,
        autoOpen: false,
        resizable: false,
        buttons: {
          Ok: function () {
            $(this).dialog("close");
          },
        },
      })
      .dialog("open");
  }
});
