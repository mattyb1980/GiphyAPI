$(document).ready()

	// Initial array of animals
	var animals = ["Dog", "Cat", "Rabbit", "Sloth"];

	
	function displayGifs() {
		
		$("#animalImages").empty();

		
		var animal = $(this).attr("data-name");
		console.log(this);
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
          url: queryURL,
          method: "GET"
        
        }).done(function(response) {
        	console.log(response);
        	var results = response.data;

        	for (i = 0; i < results.length; i++) {

        		var animalDiv = $("<div class='item'>");
        	
        		var rating = results[i].rating;

        		var pRating = $("<p>").text("Rating: " + rating);

        		var animalImage = $("<img>");

          // Appending the image
	          	animalImage.attr("src", results[i].images.fixed_height_still.url);

	          	animalImage.attr("data-still", results[i].images.fixed_height_still.url);

	          	animalImage.attr("data-animate", results[i].images.fixed_height.url);

	          	animalImage.attr("data-state", "still");
	        	
	        	animalImage.attr("alt", "animals");

	        	animalImage.addClass("gif");

	        //
	        	animalDiv.prepend(pRating);
	        	animalDiv.prepend(animalImage);
	        	$("#animalImages").append(animalDiv);
          
			};
		});
	}
	
	function activateGif(){
        state = $(this).attr("data-state")
        // =============================================

        console.log(state);
      
        if (state === "still"){
          $(this).attr("src",$(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        
        // ==============================================
        if (state === "animate"){
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
        
    } 
        

	function renderButtons() {

       
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

         
          var a = $("<button>");
          
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
     }
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });
      $(document).on("click", ".animal", displayGifs);
      $(document).on("click", ".gif", activateGif);


      renderButtons();
