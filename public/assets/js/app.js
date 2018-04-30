$(".keywordButtons").on("click", "button", function (event) {
    var api = $(this).attr("data-api");
    var keyword = {
        event: $(this).attr("data-event")
    }
    if (api === "yelp") {
        $(".eventInfo").empty();
        $.post("/yelp", keyword).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".eventInfo").append("<p>" + data[i].name + "</p>")
                $(".eventInfo").append("<p>" + data[i].phone + "</p>")
                $(".eventInfo").append("<p><a href=" + data[i].url + ">Yelp Link</a></p>")
                $(".eventInfo").append("<p>" + data[i].location.address1 + "</p>")
            }

            // location.reload();
        })
    }

    if (api === "meetup") {
        $(".eventInfo").empty();
        $.post("/meetup", keyword).then(function (data) {
            var body = data
            for (var i = 0; i < body.length; i++) {
                // console.log(body);
                $(".eventInfo").append("<p>" + body[i].name + "</p>");
                $(".eventInfo").append("<p>" + body[i].link + "</p>");
                $(".eventInfo").append("<p>" + body[i].status + "</p>");
                $(".eventInfo").append(body[i].description);
                $(".eventInfo").append("-------------------")
            }
        })
    }

    if (api === "jambase") {
        var queryUrl = "http://api.jambase.com/events?zipCode=92101&radius=25&page=0&api_key=jt2vqv49znwfh5kwpc2d4n98"

        $(".eventInfo").empty();

        $.ajax({
            method: "GET",
            url: queryUrl
        }).then(function (data) {
            console.log(data.Events);
            for (var i = 0; i < data.Events.length; i++) {
                $(".eventInfo").append("<p>" + data.Events[i].Date + "</p>");
                $(".eventInfo").append("<p>" + data.Events[i].Venue.Name + "</p>");
                $(".eventInfo").append("<p>" + data.Events[i].Venue.Address + "</p>");
                $(".eventInfo").append("<p>Artists:</p>");

                for (var v = 0; v < data.Events[i].Artists.length; v++) {
                    $(".eventInfo").append("<p>" + data.Events[i].Artists[v].Name + "</p>");
                }
                $(".eventInfo").append("<p><a href=" + data.Events[i].TicketUrl + ">Ticket Link</a></p>");
            }
        })
    }

})

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

var eventType = $("#event-types");
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

function renderButtons() {
    $(".usersKeywordButtons").empty();
    $.get("/api/users/" + $("#user-id").text(), function (data) {
        console.log(data);
        var buttonsToAdd = [];
        var food = data[0].food;
        var event = data[0].event;
        buttonsToAdd.push(food);
        buttonsToAdd.push(event);
        for (var i = 0; i < buttonsToAdd.length; i++) {
            var newButton = $("<button>");
            newButton.attr("type", "button");
            newButton.attr("data-api", "yelp");
            newButton.attr("data-event", buttonsToAdd[i]);
            newButton.html(buttonsToAdd[i]);
            $(".usersKeywordButtons").append(newButton);
        }
    }).then(function () {
        $.get("/api/preferences/" + $("#user-id").text(), function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].keyword);
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.attr("data-api", "yelp");
                newButton.attr("data-event", data[i].keyword);
                newButton.html(data[i].keyword);
                $(".usersKeywordButtons").append(newButton);
            }

        })
    })

}
renderButtons();

$(document).ready(function () {
    $("#new-food-preference").on("submit", function (event) {
        event.preventDefault();
        var preference = $("#preference").val().trim();
        var newPreference = {
            UserId: parseInt($("#user-id").text()),
            keyword: preference
        }
        $.post("/api/preferences", newPreference, function () {
            window.reload;
        }).then(function () {
            renderButtons();
        })
    });

    $("#new-event-type").on("submit", function (event) {
        event.preventDefault();
        var event = $("#event-types option:selected").val();
        var newEvent = {
            UserId: parseInt($("#user-id").text()),
            keyword: event
        }
        $.post("/api/preferences", newEvent, function () {
            window.reload;
        }).then(function(){
            renderButtons();
        })

    })

});