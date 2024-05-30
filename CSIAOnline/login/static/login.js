apiURL = "http://127.0.0.1:8000";

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);

    // Create an object from the form data
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);

    // Make a POST request to the server
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        // Check if the login was successful
        if (data.status === "success") {
          // Redirect to the logout page
          window.location.href = apiURL + "/home";
        } else {
          alert("Please check log in details");
          // Handle login failure (e.g., display an error message)
          console.error("Login failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle other errors, if any
      });
  });
