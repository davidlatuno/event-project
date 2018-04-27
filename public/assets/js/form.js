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

    var radiusChoices = [0,10,15,20,25];
    var emailInput = $("#email-input");
    var passwordInput = $("#password-input");
    var numberInput = $("#number-input");
    var favFoodInput = $("#fav-food");
    var eventType = $("#event-types");
    var zipcodeInput = $("#zipcode");
    var radiusInput = $("#radius");

    
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
    $("#user-profile").on("submit", function(){
        event.preventDefault();
        
        function submitUser(data) {
            $.post("/api/users", data, function() {
              
          })}
    

})})