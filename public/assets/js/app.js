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
                newDiv.append("<p><a href=" + data[i].url + ">Yelp Link</a></p>")
                $(".eventInfo").append(newDiv);
            }

            // location.reload();
        })
    }

    if (api === "meetup") {
        $(".eventInfo").empty();
        $.post("/meetup", keyword).then(function (data) {
            var body = data
            for (var i = 0; i < body.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("events");
                newDiv.append("<p>Group Name: " + body[i].name + "</p>");
                newDiv.append("<p>Status: " + body[i].status + "</p>");
                newDiv.append("<p><a href=" + body[i].link + ">Group Link</a></p>");

                newDiv.append("<button class='collapsible'>Description</button>")
                newDiv.append("<div class='eventContent'>" + body[i].description + "</div>");
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

    $(".eventInfo").on("click", ".collapsible", function() {
        $(this).toggleClass("active");
        var sibling = $(this).next()
        if(sibling.css("display") === "block") {
            sibling.css("display", "none");
        } else {
            sibling.css("display", "block")
        }
    })

})