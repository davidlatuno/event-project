$(document).ready(function () {

    var categories = [
        {
            "name": "Arts & Culture",
            "sort_name": "Arts & Culture",
            "id": 1,
            "shortname": "Arts"
        },
        {
            "name": "Book Clubs",
            "sort_name": "Book Clubs",
            "id": 18,
            "shortname": "Book Clubs"
        },
        {
            "name": "Career & Business",
            "sort_name": "Career & Business",
            "id": 2,
            "shortname": "Business"
        },
        {
            "name": "Cars & Motorcycles",
            "sort_name": "Cars & Motorcycles",
            "id": 3,
            "shortname": "Auto"
        },
        {
            "name": "Community & Environment",
            "sort_name": "Community & Environment",
            "id": 4,
            "shortname": "Community"
        },
        {
            "name": "Dancing",
            "sort_name": "Dancing",
            "id": 5,
            "shortname": "Dancing"
        },
        {
            "name": "Education & Learning",
            "sort_name": "Education & Learning",
            "id": 6,
            "shortname": "Education"
        },
        {
            "name": "Fashion & Beauty",
            "sort_name": "Fashion & Beauty",
            "id": 8,
            "shortname": "Fashion"
        },
        {
            "name": "Fitness",
            "sort_name": "Fitness",
            "id": 9,
            "shortname": "Fitness"
        },
        {
            "name": "Food & Drink",
            "sort_name": "Food & Drink",
            "id": 10,
            "shortname": "Food & Drink"
        },
        {
            "name": "Games",
            "sort_name": "Games",
            "id": 11,
            "shortname": "Games"
        },
        {
            "name": "Movements & Politics",
            "sort_name": "Movements & Politics",
            "id": 13,
            "shortname": "Movements"
        },
        {
            "name": "Health & Wellbeing",
            "sort_name": "Health & Wellbeing",
            "id": 14,
            "shortname": "Well-being"
        },
        {
            "name": "Hobbies & Crafts",
            "sort_name": "Hobbies & Crafts",
            "id": 15,
            "shortname": "Crafts"
        },
        {
            "name": "Language & Ethnic Identity",
            "sort_name": "Language & Ethnic Identity",
            "id": 16,
            "shortname": "Languages"
        },
        {
            "name": "LGBT",
            "sort_name": "LGBT",
            "id": 12,
            "shortname": "LGBT"
        },
        {
            "name": "Lifestyle",
            "sort_name": "Lifestyle",
            "id": 17,
            "shortname": "Lifestyle"
        },
        {
            "name": "Movies & Film",
            "sort_name": "Movies & Film",
            "id": 20,
            "shortname": "Films"
        },
        {
            "name": "Music",
            "sort_name": "Music",
            "id": 21,
            "shortname": "Music"
        },
        {
            "name": "New Age & Spirituality",
            "sort_name": "New Age & Spirituality",
            "id": 22,
            "shortname": "Spirituality"
        }
    ];

    var radiusChoices = [0, 10, 15, 20, 25];

    var nameInput = $("#name");
    var profPicture = $("#profile-input");
    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");
    var numberInput = $("#number-input");
    var favFoodInput = $("#fav-food");
    var eventType = $("#event-types");
    var zipcodeInput = $("#zipcode");
    var radiusInput = $("#radius");

    //======================================= VALIDATION CODE =======================================================
    //--------------------------------------hiding all error messages------------------------------------------------
    $("#username_error_message").hide();
    $("#password_error_message").hide();
    $("#zipcode_error_message").hide();
    $("#email_error_message").hide();
    $("#phonenum_error_message").hide();
    $("#profileimg_error_message").hide();
    $("#favfood_error_message").hide();

    // global variables to hold boolean values initially
    var error_username  = false;
    var error_password  = false;
    var error_email     = false;
    var error_number    = false;
    var error_zipcode   = false;
    var error_url       = false;

    // =============================================================================================================
    function eventOptions() {
        var rowsToAdd = [];
        for (var i = 0; i < categories.length; i++) {
            rowsToAdd.push(createEventRow(categories[i]));
        }
        $("#event-types").append(rowsToAdd);
        $("#event-types").val(name);
    };

    function createEventRow(categories) {
        var listOption = $("<option>");
        listOption.attr("value", categories.name);
        listOption.text(categories.name);
        return listOption;
    }

    eventOptions();

    function radiusOptions() {
        var rowsToAdd = [];
        for (var i = 0; i < radiusChoices.length; i++) {
            rowsToAdd.push(createRadiusRow(radiusChoices[i]));
        }
        $("#radius").append(rowsToAdd);
        $("#radius").val(name);

    };

    function createRadiusRow(radius) {
        var listOption = $("<option>");
        listOption.attr("value", radius);
        listOption.html(radius);
        return listOption;
    }

    radiusOptions();
    
//=================================================================================================================
// on focusout call validate field functions

     profPicture.focusout(function () {
        checkURL();
    });
    
    nameInput.focusout(function () {
        checkName();
    });

    emailInput.focusout(function () {
        checkEmail();
    });
    
    passwordInput.focusout(function () {
        checkPassword();
    });
    
    numberInput.focusout(function () {
        checkPhNumber();
    });
    
    favFoodInput.focusout(function () {
        requiredFavFood();
    });
    
    zipcodeInput.focusout(function () {
        checkZipcode();
    });
    
    
// =============================================================================================================
   
// on submit 
    $("#user-profile").on("submit", function () {
        event.preventDefault();

        var newUser = {
            userName: nameInput.val().trim(),
            picture: profPicture.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            phonenumber: numberInput.val().trim(),
            food: favFoodInput.val().trim(),
            event: eventType.val(),
            zipcode: zipcodeInput.val().trim(),
            radius: radiusInput.val(),
        }
        // call validate function
        var validateFlag = validateForm();
        console.log(validateFlag);
        
        if (validateFlag) {
            $.post("/api/signup", newUser, function () {
                window.location.href = "/login";
            });
        }
        else {
            emptyFields();
        }
    })

    //=========================================-VALIDATION FUNCTION-=============================================
    function validateForm() {
        error_url       = false;
        error_username  = false;
        error_email     = false;
        error_number    = false;
        error_password  = false;
        error_eventType = false;
        error_favFood   = false;
        error_zipcode   = false;

        checkURL();
        checkName();
        checkEmail();
        checkPassword();
        checkPhNumber();
        checkZipcode();
       
        if (error_username == false && error_url == false && error_email == false && error_number == false && error_password == false && error_zipcode == false) {
            return true;
        }
        else {
            return false;
        }
    }

//========================================field functions===============================================================
// validate name
    function checkName() {
        var username = nameInput.val();
        
        if (username != username.match(/^[a-zA-Z\s]+$/)) {
            $("#username_error_message").html("Only characters and spaces are allowed");
            $("#username_error_message").show();
            nameInput.addClass('error');
            error_username = true;
        }
        else {
            nameInput.removeClass('error');
            $("#username_error_message").hide();
        }
    }
// password validate
    function checkPassword() {
        var password_length = passwordInput.val().length;
        
        if (password_length < 8) {
            $("#password_error_message").html("At least 8 characters required");
            $("#password_error_message").show();
            passwordInput.addClass("error");
            error_password = true;
        }
        else {
            passwordInput.removeClass("error");
            $("#password_error_message").hide();
        }
    }
//  check for valid email
    function checkEmail() {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        
        if (pattern.test(emailInput.val())) {
            emailInput.removeClass("error");
            $("#email_error_message").hide();
        }
        else {
            $("#email_error_message").html("Enter valid email address");
            $("#email_error_message").show();
            emailInput.addClass("error");
            error_email = true;
        }
    }
// check for valid phone number
    function checkPhNumber() {
        var pattern = new RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i);
        
        if (pattern.test(numberInput.val())) {
            $("#phonenum_error_message").hide();
            numberInput.removeClass('error');
        }
        else {
            $("#phonenum_error_message").html("Enter valid phone number");
            $("#phonenum_error_message").show();
            numberInput.addClass('error');
            error_number = true;
        }
    }
//  check for valid zipcode
    function checkZipcode() {
        var pattern = new RegExp(/^[0-9]{5}$/i);
        
        if (pattern.test(zipcodeInput.val())) {
            $("#zipcode_error_message").hide();
            zipcodeInput.removeClass('error');
        }
        else {
            $("#zipcode_error_message").html("Enter valid zipcode");
            $("#zipcode_error_message").show();
            zipcodeInput.addClass('error');
            error_zipcode = true;
        }
    }
// check url
    function checkURL() {
        var pattern = new RegExp(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i);
    
        if (pattern.test(profPicture.val())) {
            $("#profileimg_error_message").hide();
            profPicture.removeClass("error");
        }
        else {
            $("#profileimg_error_message").html("Enter valid URL address");
            $("#profileimg_error_message").show();
            profPicture.addClass('error');
            error_url = true;
        }
    }
// fav food field validation
    function requiredFavFood() {
        if (favFoodInput.val() === "") {
            $("#favfood_error_message").html("Field required");
            favFoodInput.addClass("error");
            $("#favfood_error_message").show();
        }
        else {
            favFoodInput.removeClass("error");
            $("#favfood_error_message").hide();
        }
    }

// empty all input fields

    function emptyFields() {
        $("#name").val("");
        $("#profile-input").val("");
        $("#email-input").val("");
        $("#password-input").val("");
        $("#number-input").val("");
        $("#fav-food").val("");
        $("#event-types").val("");
        $("#zipcode").val("");
        $("#radius").val("");
    }
})