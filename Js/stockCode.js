

document.addEventListener('DOMContentLoaded', function() {


   const date = new Date();
    const year = date.getFullYear();
    document.getElementById("date").textContent += ` ${year}`;


const stored = localStorage.getItem("colours");
let colours = stored ? JSON.parse(stored) : [];




    const table = document.querySelector("#colour-table");
    const form = document.querySelector("#colour-form");
    const modalForm = document.querySelector("#modal-form");
    const btn = document.querySelector("#toggle");
    const dialog = document.querySelector("#colour-modal");
    const btnClose = document.querySelector("#close");
    const colourCards = document.querySelector("#colour-cards");
    
    const addColourLink = document.querySelector('#add-colour-link');
    const viewColoursLink = document.querySelector('#view-colours-link');
    const addColourView = document.querySelector('#add-colour-view');
    const viewColoursView = document.querySelector('#view-colours-view');

    const nameInput = document.querySelector('#name');
    const fullnameInput = document.querySelector('#fullname');
    const hexInput = document.querySelector('#hex');
    const categoryInput = document.querySelector('#category');
    const descriptionInput = document.querySelector('#description');

    const hexPreview = document.querySelector('#hex-preview');
    const colourSamplePreview = document.querySelector('#colour-sample-preview');
    const previewName = document.querySelector('#preview-name');
    const previewFullname = document.querySelector('#preview-fullname');
    const previewHex = document.querySelector('#preview-hex');
    const previewCategory = document.querySelector('#preview-category');
    const previewDescription = document.querySelector('#preview-description');

    const tableTemplate = Handlebars.compile(document.querySelector("#colour-template").innerHTML);
    const cardTemplate = Handlebars.compile(document.querySelector("#card-template").innerHTML);

    function showView(view) {
        document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
        view.style.display = 'block';
        document.querySelectorAll('.nav-tab').forEach(a => a.classList.remove('active'));
        if (view.id === 'add-colour-view') {
            addColourLink.classList.add('active');
            updateTable();
        } else {
            viewColoursLink.classList.add('active');
            displayCards(colours);
        }
    }

    addColourLink.addEventListener('click', (e) => {
        e.preventDefault();
        showView(addColourView);
    });
    viewColoursLink.addEventListener('click', (e) => {
        e.preventDefault();
        showView(viewColoursView);
    });

 

    function updateTable() {
    localStorage.setItem("colours", JSON.stringify(colours));
    const reversedArray = [...colours].reverse();
    table.innerHTML = tableTemplate(reversedArray);
}

   

function displayCards(arr) {
 
    const reversedArray = [...arr].reverse();
    colourCards.innerHTML = cardTemplate(reversedArray);
}



    function updatePreview() {
        const name = nameInput.value || 'Colour Name';
        const fullname = fullnameInput.value || 'Full Colour Name';
        const hex = hexInput.value || '#FFFFFF';
        const category = categoryInput.value || 'Category';
        const description = descriptionInput.value || 'Colour description will appear here.';
        
        previewName.textContent = name;
        previewFullname.textContent = fullname;
        previewHex.textContent = hex;
        previewCategory.textContent = category;
        previewDescription.textContent = description;
        
        if (isValidHex(hex)) {
            hexPreview.style.backgroundColor = hex;
            colourSamplePreview.style.backgroundColor = hex;
        } else {
            hexPreview.style.backgroundColor = '#FFFFFF';
            colourSamplePreview.style.backgroundColor = '#FFFFFF';
        }
    }

    function isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }

    nameInput.addEventListener('input', updatePreview);
    fullnameInput.addEventListener('input', updatePreview);
    hexInput.addEventListener('input', updatePreview);
    categoryInput.addEventListener('change', updatePreview);
    descriptionInput.addEventListener('input', updatePreview);




document.addEventListener("click", (evt) => {
  
    const button = evt.target.closest(".delete-btn");
    if (button) {
        const deleteRec = colours.findIndex((colour) => colour.name === button.dataset.id);
        if (deleteRec !== -1) {
            colours.splice(deleteRec, 1);
            updateTable();
            displayCards(colours);
        }
    }
});

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    const newColour = {
        name: form.elements.name.value,
        fullname: form.elements.fullname.value,
        hex: form.elements.hex.value,
        category: form.elements.category.value,
        description: form.elements.description.value,
    };
    
  
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Adding...';
    btn.disabled = true;
    

    setTimeout(() => {
       
        colours.push(newColour);
        updateTable();
        displayCards(colours);
        btn.textContent = 'Added!';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            form.reset();           
            updatePreview();        
        }, 2000);
        
    }, 1000); 
});



    modalForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const newColour = {
            name: modalForm.elements["modal-name"].value,
            fullname: modalForm.elements["modal-fullname"].value,
            hex: modalForm.elements["modal-hex"].value,
            category: modalForm.elements["modal-category"].value,
            description: modalForm.elements["modal-description"].value,
        };

        colours.push(newColour);
        updateTable();
        displayCards(colours);
        modalForm.reset();
        dialog.close();
    });


    btn.addEventListener("click", () => dialog.showModal());
    btnClose.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (e) => {
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.close();
        }
    });

    showView(addColourView);
    updatePreview();

    
// carousel///////////////////////////////////////////////////


const carousel = document.getElementById('carousel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const counter = document.getElementById('counter');
let currentIndex = 0;

const images = ["images/amber.jpg", "images/neon.jpg", "images/aqua.jpg", 
                "images/babyBlue.jpg", "images/coral.jpg", "images/indigo.jpg", 
                "images/magenta.jpg", "images/orange.jpg", "images/pink.jpg"];


    for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    img.className = 'carousel-image';
    carousel.appendChild(img);
 }

  const showSlide = () => {
    const slides = document.querySelectorAll('#carousel img');
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[currentIndex].style.display = "block";
    counter.textContent = `Image ${currentIndex + 1} of ${images.length}`;
 }



 const nextSlide = () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showSlide();
 }


  const prevSlide = () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showSlide();
     }

     showSlide();


  nextBtn.addEventListener("click", () => {
    nextSlide();
   });

 prevBtn.addEventListener("click", () => {
    prevSlide();
  });


 document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextSlide();
    }
    if (e.key === "ArrowLeft") {
        prevSlide();
    }
  });



});   






















































