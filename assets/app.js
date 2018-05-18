$(document).ready(function(){

    var buttons = ["Parks and Rec", "New Girl", "Downton Abbey", "Community", "The Expanse"];

//search on button click function
    function search (){

        // function displayGifs(){
            var gif = $(this).attr("data-name");

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                gif + "&api_key=7TVVqYBMWv361VqG4FFrpiPWLECF3Cm4&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }, )

            .then(function (response) {
                console.log(response);
                // console.log(response.data[0].images.downsized_still);

                var results = response.data;
                $("#gifDiv").empty();
                    //adds 10 results + ratings to page
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='item'>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var personImage = $("<img>");

                        personImage.attr("data-image", results[i].images.fixed_height_still.url);

                        personImage.attr("data-gif", results[i].images.fixed_height.url);



                    personImage.attr("src", results[i].images.fixed_height_still.url);
                    // personImage.attr("src", results[i].images.fixed_height.url);


                        gifDiv.prepend(p);
                        gifDiv.prepend(personImage);
                        $("#gifDiv").prepend(gifDiv);
                        };

                        $("img").on('click', function () {

                            var gif = $(this).attr("data-gif");
                            console.log(personImage);

                            var image = $(this).attr("data-image");

                            var imgSource = $(this).attr("src");

                            if (imgSource.indexOf("_s") != -1) {
                                $(this).attr("src", gif);
                                // console.log("hello");
                            } else {
                                $(this).attr("src", image);
                            }

                        });
                });


            // };
        };




            // .toggleClass(){
            //     function addImg() {
            //         personImage.attr("src", results[i].images.downsized_still.url);
            //     },
            //     function addGif() {
            //         personImage.attr("src", results[i].images.fixed_height.url);
            //     }
            // };


        //creates buttons in array
        function renderButtons() {
            $("#buttonDiv").empty();
            // loops through buttons array, creates button for each
            for (var i = 0; i < buttons.length; i++) {
                var a = $("<button>");
                a.addClass("show");
                a.attr("data-name", buttons[i]);
                a.text(buttons[i]);
                $("#buttonDiv").append(a);
            };
        };

        //create new buttons based on user input, pushes to buttons array
        $("#addShow").on("click", function(event){
            event.preventDefault();
            var show = $("#showInput").val().trim();
            //prevent blank input
            if (show === ''){
                alert("Please enter a value");
            } else {
                buttons.push(show);
                renderButtons();
                //empties text field after input
                $("#showInput").val('');
            }

        });

        // execute search/display GIFs when button clicked
    $(document).on("click", "button", search);


        //create existing buttons
        renderButtons();
});