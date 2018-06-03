$(document).ready(function () {


    var topics = ["DragonBallz", "DragonBall Super", "Fairy Tail", "My Hero Academia", "Tokyo Ghoul"];


    function displayAnime() {
        var topic = $(this).attr("data");
        var queryURl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&offset=0&rating=R&api_key=qCHU3WJfRnuaeWrO8zjwX5qq3CVgRF3x";

        $.ajax({
            url: queryURl,
            method: "GET"
        }).then(function (response) {

            console.log(queryURl);

            var animeDiv = $('<div class="anime">');
            var search = response.data;
            for(var i = 0;i<search.length;i++){
            var rateView = $("<p>").text("Rating bro: " + search[i].rating);
            animeDiv.append(rateView);
            var imgURL =search[i].images.fixed_height.url;//check the queryURL 
            var image = $('<img>').attr("src", imgURL);
            animeDiv.append(image);
            $('#gifView').prepend(animeDiv);
            console.log(search);
            }
        });
    }
    function renderButton() {
        $('#btnView').empty();

        for (var i = 0; i < topics.length; i++) {
            var b = $('<button>');
            b.addClass('anime-btn');
            b.attr("data", topics[i]);
            b.text(topics[i]);
            $("#btnView").append(b);
        }
    }
    $("#addGif").on('click', function (event) {
        event.preventDefault();
        var topic = $('#gifInput').val().trim();
        topics.push(topic);
        renderButton();
    });
    $(document).on('click', '.anime-btn', displayAnime);
    renderButton();

    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr('data-animate'));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr('data-still'));
            $(this).attr("data-state", "still");

        }

    });
});