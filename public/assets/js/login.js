$(document).ready(function () {
    // hide error message fields 
    $("#email_error_message").hide();
    $("#password_error_message").hide();
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    // declaring boolean values 
    var error_email = false;
    var error_password = false;

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            // call basic validation functions
            emailBasicValidation();
            passwordBasicValidation();
            return;
        }
        else {
            // If we have an email and password we run the loginUser function and clear the form
            loginUser(userData.email, userData.password);
            emailInput.val("");
            passwordInput.val("");
        }
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {
            // console.log(data);
            window.location.replace(data);
            sessionStorage.setItem("email", email);
        }).fail(function (err) {
            emailInput.addClass("error");
            error_email = true;
            $("#password_error_message").html("invalid email or password");
            passwordInput.addClass("error");
            $("#password_error_message").show();
            error_password = true;

        });

    }

    emailInput.focusout(function () {
        emailBasicValidation();
    });

    passwordInput.focusout(function () {
        passwordBasicValidation();
    });

    // function that validates empty email and password fields
    function emailBasicValidation() {
        if (!emailInput.val()) {
            $("#email_error_message").html("Email required");
            emailInput.addClass("error");
            $("#email_error_message").show();
            error_email = true;
        }
        else {
            emailInput.removeClass("error");
            $("#email_error_message").hide();

        }
    }
    function passwordBasicValidation() {
        if (!passwordInput.val()) {
            $("#password_error_message").html("Password required");
            passwordInput.addClass("error");
            $("#password_error_message").show();
            error_password = true;
        }
        else {
            passwordInput.removeClass("error");
            $("#password_error_message").hide();
        }
    }

});
