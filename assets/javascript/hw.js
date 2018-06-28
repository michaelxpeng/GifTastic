// Create an empty array for the topic of choice
var topic = ['Foo Fighters', 'Drake', 'John Mayer', 'Eminem', 'Fall Out Boy', 'My Chemical Romance', 'Taylor Swift', 'Kendrick Lamar', 'blink-182', 'Halsey', 'Bruce Springsteen', 'Chance the Rapper', 'Linkin Park', 'Kanye West', 'Childish Gambino', 'Maroon 5', 'Coldplay', 'Lady Gaga'];

renderButtons(topic);

// Create a onclick function for the addArtist button
$("#addArtist").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form
    event.preventDefault();

    // Grab the text the user types into the input field
    var artistInput = $("#artist-input").val().trim();
    // Add the new artist into the topics array
    topic.push(artistInput);
    // Clears the input field
    $("#artist-input").val('');
    // The renderButtons function is called, rendering the list of artist buttons
    renderButtons();
});

function renderButtons() {
    // Delete the content inside the artist-buttons div prior to adding new artists
    $('#artist-buttons').empty();
    // Loop through the array of artists, then generate buttons for each artist in the array
    for (var i = 0; i < topic.length; i++) {
        var buttons = $('<button>'+ topic[i] + '</button>') 
        buttons.addClass('btn btn-info');
        buttons.appendTo('#artist-buttons'); 
    };

    $("button").on("click", function() {
        $('#artist-gifs').empty();
        console.log($("button"));
        var artist = $(this)[0].textContent;
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=aApCqEeg7kVYqurTOZfUMCU7F6J6vbYQ&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                // Make a div with jQuery and store it in a variable named artistDiv.
                var artistDiv = $("<div class='item'>");
                // Set the inner text of the paragraph to the rating of the image in results[i].
                var rating = results[i].rating;
                console.log(rating);
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>").text("Rating: " + rating);
                console.log(p);
                // Make an image tag with jQuery and store it in a variable named artistImage.
                var artistImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height.url.
                artistImage.attr("src", results[i].images.fixed_height_still.url)
                // Add the attributes to each gif to trigger still/animated gifs
                artistImage.attr("data-still", results[i].images.fixed_height_still.url)
                artistImage.attr("data-animate", results[i].images.fixed_height.url)
                artistImage.attr("data-state", "still");
                // Add the gif class to each image
                artistImage.addClass("gif");
                // Append the p variable to the artistDiv variable.
                artistDiv.prepend(p);
                // Append the artistImage variable to the artistDiv variable.
                artistDiv.prepend(artistImage);
                // Prepend the artistDiv variable to the element with an id of artist-gifs.
                $("#artist-gifs").prepend(artistDiv);
                console.log(this);
            }

            $(".gif").on("click", function() {
                console.log($("img"));
                var state = $(this).attr("data-state");
            
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            });

            });
    });
    
}