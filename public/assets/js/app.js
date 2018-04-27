$(".keywordButtons").on("click", "button", function (event) {
    var api = $(this).attr("data-api");
    var keyword = {
        event: $(this).attr("data-event")
    }
    if (api === "yelp") {
        $.post("/yelp", keyword).then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $(".eventInfo").append("<p>" + data[i].name + "</p>")
                $(".eventInfo").append("<p>" + data[i].phone + "</p>")
                $(".eventInfo").append("<p><a href=" + data[i].url + ">Yelp Link</a></p>")
                $(".eventInfo").append("<p>" + data[i].location.address1 + "</p>")
            }

            // location.reload();
        })
    }

})