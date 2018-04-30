$(".keywordButtons").on("click", "button", function (event) {
    var api = $(this).attr("data-api");
    var keyword = {
        event: $(this).attr("data-event")
    }
    if (api === "yelp") {
        $(".eventInfo").empty();
        $.post("/yelp", keyword).then(function (data) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("events");
                newDiv.append("<p>Name: " + data[i].name + "</p>")
                if (data[i].location.address1 !== "") {
                    newDiv.append("<p>Address: " + data[i].location.address1 + "</p>")
                } else {
                    newDiv.append("<p>Address: NO ADDRESS ON FILE</p>")
                }

                newDiv.append("<p>Rating: " + data[i].rating + " (Review Count: " + data[i].review_count + ")</p>")
                newDiv.append("<p><a href=" + data[i].url + "target='_blank'>Yelp Link</a></p>")
                $(".eventInfo").append(newDiv);
            }

            // location.reload();
        })
    }

    if (api === "meetup") {
        $(".eventInfo").empty();
        $.post("/meetup", keyword).then(function (data) {
            var body = data
            console.log(body);
            for (var i = 0; i < body.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("events");
                newDiv.append("<p>Group Name: " + body[i].name + "</p>");
                newDiv.append("<p>Status: " + body[i].status + "</p>");
                var groupLink = $("<button>");
                groupLink.attr("data-link", body[i].link);
                groupLink.addClass("meetupButton button meetupLink");
                groupLink.text("Group Link");
                newDiv.append(groupLink);
                newDiv.append("<button class='button meetupButton meetupEvents' data-urlname=" + body[i].urlname + " data-click='0'>Upcoming Events</button>")
                newDiv.append("<button class='button collapsible'>Description</button>")
                newDiv.append("<div class='groupContent'>" + body[i].description + "</div>");
                newDiv.append("<div class='groupEvents'></div>")
                $(".eventInfo").append(newDiv);

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
                var newDiv = $("<div>");
                newDiv.addClass("events");
                newDiv.append("<p>" + data.Events[i].Date + "</p>");
                newDiv.append("<p>" + data.Events[i].Venue.Name + "</p>");
                newDiv.append("<p>" + data.Events[i].Venue.Address + "</p>");
                newDiv.append("<p>Artists:</p>");

                for (var v = 0; v < data.Events[i].Artists.length; v++) {
                    newDiv.append("<p>" + data.Events[i].Artists[v].Name + "</p>");
                }
                newDiv.append("<p><a href=" + data.Events[i].TicketUrl + " target='_blank'>Ticket Link</a></p>");
                $(".eventInfo").append(newDiv);
            }
        })
    }

    $(".eventInfo").on("click", ".collapsible", function () {
        $(this).toggleClass("active");
        var sibling = $(this).next()
        if (sibling.css("display") === "block") {
            sibling.css("display", "none");
        } else {
            sibling.css("display", "block")
        }
    })

    $(".eventInfo").on("click", ".meetupLink", function () {
        window.open($(this).data("link"), '_blank');
    })

    $(".eventInfo").on("click", ".meetupEvents", function () {
        var sibling = $(this).nextAll("div").eq(1);
        var urlName = {
            urlname: $(this).data("urlname")
        }

        $.post("/groupevents", urlName).then(function (data) {
            sibling.empty();
            if (data.length !== 0) {
                for (var i = 0; i < data.length; i++) {
                    var newDiv = $("<div>");
                    newDiv.addClass("groupEvent");
                    newDiv.append("<p>Name: " + data[i].name + "</p>");
                    newDiv.append("<p>Date: " + data[i].local_date + " Time: " + data[i].local_time + "</p>");
                    newDiv.append("<p>Rsvp Limit: " + data[i].rsvp_limit + "</p>");
                    newDiv.append("<p>Yes Count: " + data[i].yes_rsvp_count + "</p>");
                    newDiv.append("<p>Waitlist Count: " + data[i].waitlist_count + "</p>");
                    sibling.append(newDiv);
                }
            } else {
                sibling.append("<p>No Upcoming Events</p>")
            }



            $(this).toggleClass("active");
            if (sibling.css("display") === "block") {
                sibling.css("display", "none");
            } else {
                sibling.css("display", "block")
            }
        })
    })

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

var eventType = $("#event-type");
function eventOptions() {
    var rowsToAdd = [];
    for (var i = 0; i < categories.length; i++) {
        rowsToAdd.push(createEventRow(categories[i]));
    }
    $("#event-type").append(rowsToAdd);
    $("#event-type").val(name);

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
        var food = data[0].food;
        var event = data[0].event;
        var newFoodButton = $("<button>");
        newFoodButton.attr("type", "button");
        newFoodButton.attr("data-api", "yelp");
        newFoodButton.attr("data-event", food);
        newFoodButton.html(food);
        $(".usersKeywordButtons").append(newFoodButton);
        var newEventButton = $("<button>");
        newEventButton.attr("type", "button");
        newEventButton.attr("data-api", "meetup");
        newEventButton.attr("data-event", event);
        newEventButton.html(event);
        $(".usersKeywordButtons").append(newEventButton);
    }).then(function () {
        $.get("/api/preferences/" + $("#user-id").text(), function (data) {
            for (var i = 0; i < data.length; i++) {
                var newButton = $("<button>");
                newButton.attr("type", "button");
                newButton.attr("data-api", data[i].api);
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
            keyword: preference,
            api: "yelp"
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
            keyword: event,
            api: "meetup"
        }
        $.post("/api/preferences", newEvent, function () {
            window.reload;
        }).then(function () {
            renderButtons();
        })

    })

});

// Log out button function
$("#logout-button").on("click", function () {
    // console.log("logout button working");
    window.location.href = "/login";
});

