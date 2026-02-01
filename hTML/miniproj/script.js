// ============================================
// ADVENTUREX - JAVASCRIPT FILE
// This file handles interactive features
// ============================================


// Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function () {

    // ----------------------------------------
    // SECTION 1: MODAL POPUP (Adventures Page)
    // ----------------------------------------
    // When user clicks an adventure card, a popup appears with more details

    // Step 1: Find the modal element on the page
    var modal = document.getElementById('adventureModal');

    // Only run this code if the modal exists (we're on the adventures page)
    if (modal) {

        // Step 2: Find all the parts of the modal we need to update
        var modalImage = document.getElementById('modalImg');
        var modalTitle = document.getElementById('modalTitle');
        var modalDescription = document.getElementById('modalDesc');
        var closeButton = document.querySelector('.close-btn');

        // Step 3: Find all adventure cards on the page
        var allCards = document.querySelectorAll('.card');

        // Step 4: Add a click listener to each card
        for (var i = 0; i < allCards.length; i++) {

            // We use a function to capture the current card
            allCards[i].addEventListener('click', function () {

                // Get the image from the clicked card
                var cardImage = this.querySelector('img').src;

                // Get the title from the data-title attribute
                var cardTitle = this.getAttribute('data-title');

                // Get the description from the data-desc attribute
                var cardDesc = this.getAttribute('data-desc');

                // Put the card's info into the modal
                modalImage.src = cardImage;
                modalTitle.innerText = cardTitle;
                modalDescription.innerText = cardDesc;

                // Show the modal (make it visible)
                modal.style.display = 'flex';
            });
        }

        // Step 5: Close the modal when the X button is clicked
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Step 6: Close the modal if user clicks outside the popup box
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }


    // ----------------------------------------
    // SECTION 2: CONTACT FORM (Contact Page)
    // ----------------------------------------
    // When user submits the form, show a confirmation message

    // Step 1: Find the contact form
    var contactForm = document.getElementById('contactForm');

    // Only run this code if the form exists (we're on the contact page)
    if (contactForm) {

        // Step 2: Listen for form submission
        contactForm.addEventListener('submit', function (event) {

            // Prevent the page from reloading (default form behavior)
            event.preventDefault();

            // Show a thank you message
            alert('Thank you! We will contact you soon.');

            // Clear all the form fields
            contactForm.reset();
        });
    }

});
