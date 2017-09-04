let object = '';

if(localStorage.h1 != null) {
    document.getElementById('recipes').innerHTML = localStorage.h1;
}

//Import data from JSON file
$.getJSON('https://api.myjson.com/bins/f4ayd', function(data) {

    const imgNames = ['../images/01.jpg', '../images/02.jpg', '../images/03.jpg', '../images/04.jpg'];
    let counter = 0;
    
    if (!localStorage.visitCount) {
        //Add each item from the json file to the DOM
        $.each(data.recipes, function(key, val){
            let recipe = '<article class>';

            recipe += "<img id='img' src='" +imgNames[counter]+  "'> <h3 id='titl'>" +data.recipes[counter].title+ "</h3> <p id='des'>" +data.recipes[counter].description+ "</p> <p id='cat'>Category: " +data.recipes[counter].category+ "</p> <p id='rate'>Rating: " +Math.round(data.recipes[counter].starRating)+ " stars</p> <div><button type='button' class='edit' id='edit'>Edit</button> <button type='button' class='delete' id='delete'>Delete</button></div>"; 

            recipe += '</article>';

            $('#recipes').append(recipe).html();

            object += recipe;

            counter++;
        });
    }



    //show add modal
    $("#addRecipe").click(function() {
        $('#dialog').show();
        $('#dialogBox').show();
    });

    //hide add modal
    $('#closeDialog').click(function() {
        $('#dialog').hide();
        $('#dialogBox').hide();
    });

    //Add new recipe
    function add() {

        //Variables
        const imageCheck = /(.*?)\.(jpg|bmp|jpeg|png)$/;
        const inputs = document.getElementById('dialogBox');
        const title = inputs.querySelector('#title').value;
        const desc = inputs.querySelector('#desc').value;
        const image = inputs.querySelector('#image').value;

        const type = inputs.querySelector('#type');
        const typeText = type.options[type.selectedIndex].text;

        const rating = inputs.querySelector('#rating');
        const ratingText = rating.options[rating.selectedIndex].text;

        //Validation
        if (title == "" || title.length < 2) {
            alert('Please provide a name with more than 2 characters!');
        } else if (desc == "" || desc.length < 25) {
            alert('Please provide a description that is greater than 25 characters!');
        } else if (type == "-1") {
            alert('Please choose the dish type!');
        } else if (rating == "-1") {
            alert('Please choose a rating!');
        } else if (!image.match(imageCheck) || image == "") {
            alert("Please add the url to an image!");
        } else {
            $('#recipes').append("<article><img id='img' src='" +image+  "'> <h3 id='titl'>" +title+ "</h3> <p id='des'>" +desc+ "</p> <p id='cat'>Category: " +typeText+ "</p> <p id='rate'>Rating: " +ratingText+ "</p> <div><button type='button' class='edit' id='edit'>Edit</button><button type='button' class='delete' id='delete'>Delete</button></div></article>");
            
            object += "<article><img id='img' src='" +image+  "'> <h3 id='titl'>" +title+ "</h3> <p id='des'>" +desc+ "</p> <p id='cat'>Category: " +typeText+ "</p> <p id='rate'>Rating: " +ratingText+ "</p> <div><button type='button' class='edit' id='edit'>Edit</button><button type='button' class='delete' id='delete'>Delete</button></div></article>";
            
            object = document.getElementById('recipes').innerHTML;
            localStorage.setItem('h1', object)
            
            $('#dialog').hide();
            $('#dialogBox').hide();
        };
    };

    //Delete recipe
    $('#recipes').on('click', '#delete', function() {
        $(this).closest('article').remove();
        object = document.getElementById('recipes').innerHTML;
        localStorage.setItem('h1', object)
    });
    
    //Edit recipe
    $('#recipes').on('click', '#edit', function() {
        $('#add').remove();
        $('#dialogBox form').append("<button type='button' id='editRecipe'>Edit Recipe</button>")
        $('#dialog').show();
        $('#dialogBox').show();
        
        $('#editRecipe').click( function() {
            
            //Variables
            const imageCheck = /(.*?)\.(jpg|bmp|jpeg|png)$/;
            const inputs = document.getElementById('dialogBox');
            const title2 = inputs.querySelector('#title').value;
            const desc2 = inputs.querySelector('#desc').value;
            const image2 = inputs.querySelector('#image').value;

            const type2 = inputs.querySelector('#type');
            const typeText2 = type.options[type.selectedIndex].text;

            const rating2 = inputs.querySelector('#rating');
            const ratingText2 = rating.options[rating.selectedIndex].text;

            //Validation
            if (title2 == "" || title2.length < 2) {
                alert('Please provide a name with more than 2 characters!');
            } else if (desc2 == "" || desc2.length < 25) {
                alert('Please provide a description that is greater than 25 characters!');
            } else if (type2 == "-1") {
                alert('Please choose the dish type!');
            } else if (rating2 == "-1") {
                alert('Please choose a rating!');
            } else if (!image2.match(imageCheck) || image2 == "") {
                alert("Please add the url to an image!");
            } else {
                
                img.text = $('#img').text(image2);
                titl.text = $('#titl').text(title2);
                des.text = $('#des').text(desc2);
                cat.text = $('#cat').text(typeText2);
                rate.text = $('#rate').text(ratingText2);

                object += "<article><img id='img' src='" +image2+  "'> <h3 id='titl'>" +title2+ "</h3> <p id='des'>" +desc2+ "</p> <p id='cat'>Category: " +typeText2+ "</p> <p id='rate'>Rating: " +ratingText2+ "</p> <div><button type='button' class='edit' id='edit'>Edit</button><button type='button' class='delete' id='delete'>Delete</button></div></article>";

                object = document.getElementById('recipes').innerHTML;
                localStorage.setItem('h1', object)

                $('#dialog').hide();
                $('#dialogBox').hide();
            };
            
        }) 
    });
    
    document.querySelector('#add').addEventListener('click', add, false);
    
    if (document.querySelector('#editRecipe') !== null) {
        document.querySelector('#editRecipe').addEventListener('click', edit, false);
    }
   
    
    if (!localStorage.visitCount) {
        localStorage.h1 = object;
        localStorage.visitCount = 1;
    } else {
        localStorage.visitCount++;
    }

});