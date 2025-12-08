

 const date = new Date();
    const year = date.getFullYear();
    document.getElementById("date").textContent += ` ${year}`;

const colourData = {
  colours: [
    {
      "name": "Red",
      "hex": "#f32d2dff",
      "fullname": "Crimson Red",
      "goesWith": ["blue", "yellow", "purple"],
      "description": {
        "category": "Warm Colour",
        "text": "A vibrant warm color that evokes passion and energy"
      },
      "rating": 3
    },
    {
      "name": "Blue",
      "hex": "#2d4bf3ff",
      "fullname": "Royal Blue",
      "goesWith": ["red", "white", "gray"],
      "description": {
        "category": "Cool Colour",
        "text": "A calming cool color that represents tranquility"
      },
      "rating": 4
    },
    {
      "name": "Green",
      "hex": "#2df35dff",
      "fullname": "Emerald Green",
      "goesWith": ["brown", "white", "yellow"],
      "description": {
        "category": "Cool Colour",
        "text": "A refreshing color symbolizing growth and nature"
      },
      "rating": 5
    },
    {
      "name": "Yellow",
      "hex": "#f3f32dff",
      "fullname": "Sunshine Yellow",
      "goesWith": ["purple", "gray", "green"],
      "description": {
        "category": "Warm Colour",
        "text": "A bright and cheerful color representing happiness"
      },
      "rating": 4
    },
    {
      "name": "Purple",
      "hex": "#9d2df3ff",
      "fullname": "Royal Purple",
      "goesWith": ["gold", "white", "gray"],
      "description": {
        "category": "Cool Colour",
        "text": "A luxurious color associated with creativity and royalty"
      },
      "rating": 4
    },
    {
      "name": "Orange",
      "hex": "#f38a2dff",
      "fullname": "Sunset Orange",
      "goesWith": ["blue", "brown", "white"],
      "description": {
        "category": "Warm Colour",
        "text": "An energetic and enthusiastic color"
      },
      "rating": 3
    },
    {
      "name": "Pink",
      "hex": "#f32d9dff",
      "fullname": "Bubblegum Pink",
      "goesWith": ["white", "gray", "mint"],
      "description": {
        "category": "Warm Colour",
        "text": "A playful and romantic color"
      },
      "rating": 4
    },
    {
      "name": "Teal",
      "hex": "#2df3d5ff",
      "fullname": "Ocean Teal",
      "goesWith": ["coral", "white", "navy"],
      "description": {
        "category": "Cool Colour",
        "text": "A sophisticated blend of blue and green"
      },
      "rating": 5
    },
    {
      "name": "Brown",
      "hex": "#8B4513ff",
      "fullname": "Chocolate Brown",
      "goesWith": ["cream", "orange", "green"],
      "description": {
        "category": "Neutral Colour",
        "text": "An earthy, natural color representing stability"
      },
      "rating": 4
    },
    {
      "name": "Gray",
      "hex": "#808080ff",
      "fullname": "Slate Gray",
      "goesWith": ["yellow", "pink", "blue"],
      "description": {
        "category": "Neutral Colour",
        "text": "A balanced and sophisticated neutral color"
      },
      "rating": 4
    }
  ]
};

let template = Handlebars.compile(document.querySelector('#colourTemplate').innerHTML);
let output = template(colourData);
document.querySelector('#placeholder').innerHTML = output;




$(document).ready(function() {
   
    const beforeImage = "images/before.jpg";
    const afterImage = "images/after.jpg";
    
  
    $('#showBefore').click(function() {
        $('#myImage').attr('src', beforeImage);
        $('#imageCaption').text('This is the BEFORE image');
    });
    
   
    $('#showAfter').click(function() {
        $('#myImage').attr('src', afterImage);
        $('#imageCaption').text('This is the AFTER image');
    });
    
   
    $('#fadeToggle').click(function() {
        $('#myImage').fadeOut(500, function() {
            $(this).fadeIn(500);
        });
    });
});


























       