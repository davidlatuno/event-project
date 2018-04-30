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
                $(".eventInfo").append("<p><a href=" + data.Events[i].TicketUrl+ ">Ticket Link</a></p>");
            }
        })
    }

})

// Log out button function
$("#logout-button").on("click", function(){
    // console.log("logout button working");
    window.location.href = "/login";
});