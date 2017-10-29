// Variables 
//*******************************************************
var themes = ["ski", "bowling"];

//AJAX call to Giphy Api 
//****************************************************
// var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=Jf3H8cE5ur5mJrh9FYysiBTjAB4VjjI9");
// xhr.done(function(data) { console.log("success got data", data); });

// var sport = $(this).attr("data-sport");
// console.log(sport);

// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=Jf3H8cE5ur5mJrh9FYysiBTjAB4VjjI9";
// console.log(queryURL);

//Funtions 
//****************************************************

function renderButtons() {

        
        $("#button-view").empty();
        

       
          for(i = 0; i < themes.length; i++) {
            //Build Button
            var b = $("<button>");
            b.addClass("theme");
            b.attr('id',themes[i]);
            b.attr("data-person", themes[i]);
            b.text(themes[i]);
            $("#button-view").prepend(b);

 $("#" + themes[i]).on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-person");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=Jf3H8cE5ur5mJrh9FYysiBTjAB4VjjI9";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }

          $("#add-movie").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();
        console.log(movie);
        // The movie from the textbox is then added to our array
        themes.push(movie);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
        });
    });
          }
        }

       
// // Jquery 
// // ****************************************************

renderButtons();