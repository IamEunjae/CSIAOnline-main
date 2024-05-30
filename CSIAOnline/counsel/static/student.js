const apiURL = "http://127.0.0.1:8000";

// Function to delete a reservation and update the availability row
async function deleteReservation(timeSlot) {
  try {
    const response = await fetch(apiURL+ "/counsel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({timeSlot}),
    });

    if (!response.ok) {
      throw new Error("Error updating reservation");
    }

    const data = await response.json();
    console.log(data);

    // Update the availability cell in the HTML based on the response from the server
    alert("Reservation was successfully deleted");
    window.location.href=apiURL+""
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
}

async function makeReservation(timeSlot) {
  try {
    const response = await fetch(apiURL +"/counsel/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({timeSlot}),
    });

    if (!response.ok) {
      throw new Error("Error updating reservation");
    }

    const data = await response.json();
    console.log(data);

    // Update the availability cell in the HTML based on the response from the server
    alert("Reservation was successfully made");
    window.location.href=apiURL+""
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
}

// Function to toggle visibility of reservation buttons
/** 
function toggleReservationButtons(timeSlot, makeVisible) {
  const makeButton = document.querySelector(
    `button[data-time-slot="${timeSlot}"][data-action="Make"]`
  );
  const deleteButton = document.querySelector(
    `button[data-time-slot="${timeSlot}"][data-action="Delete"]`
  );

  if (makeButton && deleteButton) {
    makeButton.style.display = makeVisible ? "block" : "none";
    deleteButton.style.display = makeVisible ? "none" : "block";
  }
}
*/
// Add event listeners for "Make Reservation" and "Delete Reservation" buttons
document.querySelectorAll('.reservation-button').forEach((button) => {
  button.addEventListener("click", (event) => {
    const timeSlot = event.target.getAttribute("data-time-slot");
    const action = event.target.getAttribute("data-action");
    console.log(timeSlot);

    if (action === "Make") {
      makeReservation(timeSlot);
    } else if (action === "Delete") {
      deleteReservation(timeSlot);
    }
  });
});