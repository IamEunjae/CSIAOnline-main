// Function to handle user registration
function registerUser() {
    // Get form elements
    var form = document.getElementById("signupForm");
    var nameInput = document.getElementById("form3Example1c");
    var emailInput = document.getElementById("form3Example3c");
    var passwordInput = document.getElementById("form3Example4c");
    var repeatPasswordInput = document.getElementById("form3Example4cd");

    // Validate form fields (you may want to add more validation logic)
    if (!nameInput.value || !emailInput.value || !passwordInput.value || !repeatPasswordInput.value) {
        alert("Please fill in all required fields and agree to the terms.");
        return;
    }

    // Check if passwords match
    if (passwordInput.value !== repeatPasswordInput.value) {
        alert("Passwords do not match.");
        return;
    }

    // Prepare data for the POST request
    var formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
        // Add more fields as needed
    };

    // Make a POST request to the server (replace 'your-api-endpoint' with the actual endpoint)
    fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error registering user.');
        }
        return response.json();
    })
    .then(data => {
        // Handle the successful response from the server
        window.href.locations = apiURL + ""
        // You may want to redirect the user or perform other actions here
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
}
