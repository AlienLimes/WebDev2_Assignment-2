


//allow to call functions separate from each html 
document.addEventListener('DOMContentLoaded', function () {

    const date = new Date();
    const year = date.getFullYear();
    document.getElementById("date").textContent += ` ${year}`;




    //   index 
    function indexPage() {

        const favColour = (evt) => {
            let username = prompt("Your Favourite Colour Is?");
            document.querySelector("h1").textContent = `Welcome to my Colour Palette, ${capitalise(username)}!`;
        }

        //function for personalised text
        function capitalise(str) {
            if (!str) return '';
            if (str == "red")
                return str.charAt(0).toUpperCase() + str.slice(1).trim() + " " + "Valentine";

            if (str == "green")
                return str.charAt(0).toUpperCase() + str.slice(1).trim() + " " + "Shamrock";

            if (str == "blue")
                return str.charAt(0).toUpperCase() + str.slice(1).trim() + " " + "Bird";


            return str.charAt(0).toUpperCase() + str.slice(1);
        }


        const colourbtn = document.querySelector(".colour");
        colourbtn.addEventListener("click", favColour);

    }

    // data manipulatoin page////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function dataManipulationPage() {
        const colourShades = {
            red: [
                "#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A",
                "#DC143C", "#FF0000", "#B22222", "#8B0000", "#FF0A00"
            ],
            green: [
                "#7FFF00", "#ADFF2F", "#90EE90", "#7CFC00", "#00FF00",
                "#32CD32", "#3CB371", "#228B22", "#556B2F", "#006400"
            ],
            blue: [
                "#87CEEB", "#87CEFA", "#00BFFF", "#6495ED", "#4169E1",
                "#0000FF", "#7B68EE", "#6A5ACD", "#483D8B", "#4B0082"
            ],

            magenta: [
                "#E6E6FA", "#EE82EE", "#FF00FF", "#BA55D3", "#FFC0CB",
                "#FFB6C1", "#FF69B4", "#FF1493", "#C71585", "#DB7093"
            ],
            yellow: [
                "#FFFFE0", "#FFFACD", "#F0E68C", "#FFFF00", "#FFD700",
                "#FFA07A", "#FFA500", "#FF8C00", "#FF6347", "#FF4500"
            ],
            grey: [
                "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080",
                "#696969", "#778899", "#708090", "#2F4F4F", "#000000"
            ]
        };

        // Store colour
        let selectColours = [];
        const maximumSelect = 4;

        // connect html
        const colourTable = document.getElementById('colourTable');
        const selectionLimit = document.getElementById('selectionLimit');
        const chooseButton = document.getElementById('chooseButton');
        const themeDisplay = document.getElementById('themeDisplay');
        const themeColours = document.getElementById('themeColours');



        function generateColourTable() {
            let tableHTML = '';


            for (const colourName in colourShades) {
                const shades = colourShades[colourName];


                let shadesHTML = '';
                shades.forEach(shade => {
                    shadesHTML += `
                        <div class="colour-shade" data-colour="${shade}">
                            <div class="colour-preview" style="background-color: ${shade}"></div>
                            <span class="hex-code">${shade}</span>
                        </div>
                    `;
                });

                //table heading uppercase and coloured background
                tableHTML += `
                    <div class="colour-column">
                        <div class="colour-header" style="background-color: ${shades[7]}">
                            ${colourName.charAt(0).toUpperCase() + colourName.slice(1)}
                        </div>
                        ${shadesHTML}
                    </div>
                `;
            }


            colourTable.innerHTML = tableHTML;




            const shadeElements = colourTable.querySelectorAll('.colour-shade');
            shadeElements.forEach(shadeElement => {
                shadeElement.addEventListener('click', function () {
                    const colourHex = this.getAttribute('data-colour');
                    const colourName = this.closest('.colour-column').querySelector('.colour-header');
                    manageColourSelection(colourHex, colourName, this);
                });
            });
        }

        //  user select  a colour,check if selected,removee and add selection, error text max 4 

        function manageColourSelection(colourHex, colourName, element) {

            const colourSelected = selectColours.find(item => item.hex === colourHex);

            if (colourSelected) {

                selectColours = selectColours.filter(item => item.hex !== colourHex);
                element.classList.remove('selected');
            } else {

                if (selectColours.length < maximumSelect) {

                    selectColours.push({
                        hex: colourHex,
                        name: colourName
                    });
                    element.classList.add('selected');
                } else {

                    selectionLimit.textContent =
                        `You can only select up to ${maximumSelect} colours. Deselect one to select another.`;
                    selectionLimit.style.display = 'block';

                }
            }


            updateChooseButton();

        }

        // choose button true or false
        function updateChooseButton() {
            if (selectColours.length === maximumSelect) {

                chooseButton.disabled = false;
                chooseButton.textContent = "Show Colour Theme";
            } else {

                chooseButton.disabled = true;
                chooseButton.textContent = `Choose ${maximumSelect - selectColours.length} more colours`;
            }
        }


        //display colur with colour block
        function displayColourTheme() {
            let backgroundHTML = '';


            selectColours.forEach(colour => {
                backgroundHTML += `
                    <div class="theme-colour" style="background-color: ${colour.hex}">
                        ${colour.hex}
                    </div>
                `;
            });


            themeColours.innerHTML = backgroundHTML;
            themeDisplay.style.display = 'block';
        }

        generateColourTable();
        updateChooseButton();
        chooseButton.addEventListener('click', displayColourTheme);

    }

    // about page


    function aboutPage() {


        // use random rgb colour to change background

        function randomBackground() {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            return `rgb(${red}, ${green}, ${blue})`;
        }
        document.body.style.backgroundColor = randomBackground();


        const button = document.getElementById('colorButton');

        button.addEventListener('click', function () {

            document.body.style.backgroundColor = randomBackground();
        });



        // search colour than display from database
        const form = document.querySelector('form');


        form.addEventListener("submit", (evt) => {

            //Prevents page reload on form submit
            evt.preventDefault();

            let name = form.elements.name.value;
            let filtered_coptions = coptions.filter(colours => colours.name.toLocaleLowerCase().includes(name.toLowerCase()));
            let cpalette = document.querySelector('.cpalette');
            // clear
            cpalette.innerHTML = '';

            if (filtered_coptions.length === 0) {
                cpalette.innerHTML = '<p class=" warning ">No colors found matching "' + name + '"</p>';
                return;
            }
            //display
            filtered_coptions.forEach(colour => document.querySelector('.cpalette').insertAdjacentHTML('beforeend',
                `<div class="card">


    <img src="${colour.image}" alt="${colour.name}" >
    <div class="text">
    <h3>${colour.name}</h3>
   <p>${colour.name} has the following shades: <p>${colour.shades}</p>
     </p>
	  <p>${colour.name} has also compatible colurs such as:  ${colour.compatible_colours}</p>
    </div>
   </div>`

            ));
            form.reset();

        });
        const coptions = [
            {
                "name": "Red",
                "shades": ["crimson", "carmine", "burgundy", "coral", "scarlet", "chili red", "vermilion", "cardinal", "cherry"],
                "image": "images/red.jpg",
                "compatible_colours": ["white", "black", "blue", "green", "neutrals"]
            },
            {
                "name": "Black",
                "shades": ["onyx", "charcoal", "jet black", "ebony", "black chocolate", "midnight blue", "licorice", "asphalt", "jungle green"],
                "image": "images/black.jpg",
                "compatible_colours": ["white", "orange", "blue", "pink", "neutrals"]
            },
            {
                "name": "Green",
                "shades": ["Lime", "Light Green", "Forest Green", "Sea Green", "Lawn Green", "Teal", "Starbucks Green", "Heineken Green", "Mint"],
                "image": "images/green.jpg",
                "compatible_colours": ["Yellow", "Brown", "blue", "Coral", "Grey"]
            }

        ]





    }



    if (document.querySelector(".colour")) {
        indexPage();
    }

    if (document.querySelector('form')) {
        aboutPage();
    }

    if (document.getElementById('colourTable')) {
        dataManipulationPage();
    }
});















