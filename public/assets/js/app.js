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

    if(api === "meetup") {
        $(".eventInfo").empty();
        $.post("/meetup", keyword).then(function(data) {
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

})