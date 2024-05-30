// Function to update the entire schedule
// Function to get the selected value of a dropdown

apiURL = "http://127.0.0.1:8000/yaja/";


function getSelectedValue(dropdownId) {
  let dropdown = document.getElementById(dropdownId);
  let selectedValue = dropdown.options[dropdown.selectedIndex].value;

  // Check if the selected value is "others"
  if (selectedValue === "others") {
    // If "others" is selected, get the value from the input field
    let inputField = document.getElementById(`${dropdownId}-others-detail`);
    return inputField.value;
  } else {
    // If not, return the selected option value
    return selectedValue;
  }
}

function updateEntireSchedule() {
  // Retrieve selected values from the 
  let selectedValues = {};

  // Loop through each day and period to get selected values
  ["Monday", "Tuesday", "Wednesday", "Thursday"].forEach((day) => {
    selectedValues[day] = {};
    for (let period_num = 1; period_num <= 3; period_num++) {
      let periodId = `period${period_num}-${day}`;
      selectedValues[day][`period${period_num}`] = getSelectedValue(periodId);
    }
  });

  console.log(selectedValues);

  // Make the request to the backend API to update the entire schedule
  fetch(apiURL, {
    method: "POST", // Assuming it's always a POST request for updating the entire schedule
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedValues),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.action === "setdefault") {
        ["Monday", "Tuesday", "Wednesday", "Thursday"].forEach((day) => {
          selectedValues[day] = {};
          for (let period_num = 1; period_num <= 3; period_num++) {
            let periodId = `period${period_num}-${day}`;
            document.getElementById(periodId).value = data.day.period_num;
          }
        });
      }
      if (data.action === "echo" && data.status === "success") {
        alert("Successfully changed entire schedule!");
        window.location.reload(); // Reload the page after successful update
      } else {
        console.error(
          "Error in updateEntireSchedule: Unexpected response",
          data
        );
      }
    })
    .catch((error) => {
      console.error("Error in updateEntireSchedule:", error);
    });
}

// Function to update today's schedule
function updateTodaySchedule() {
  // Retrieve selected values from the 
  console.log("success in front")
  let selectedValues = {};

  // Loop through periods 1, 2, and 3 to get selected values
  for (let period_num = 1; period_num <= 3; period_num++) {
    let periodId = `period${period_num}`;
    selectedValues[periodId] = getSelectedValue(periodId);
  }

  console.log(selectedValues);

  // Make the request to the backend API to update today's schedule
  fetch(apiURL, {
    method: "PUT", // Assuming it's always a PUT request for updating today's schedule
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedValues),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("got response")
      if (data.status == "success") {
        alert("Successfully changed today's schedule!");
        window.location.reload(); // Reload the page after successful update
      } else {
        console.error(
          "Error in updateTodaySchedule: Unexpected response",
          data
        );
      }
    })
    .catch((error) => {
      console.error("Error in updateTodaySchedule:", error);
    });
}

// Attach event listeners to the s based on their IDs or other attributes

document.addEventListener("DOMContentLoaded", function() {
  console.log("loaded")
  // Attach change event listener to all select elements
  document.querySelectorAll("select").forEach((dropdown) => {
    dropdown.addEventListener("change", function () {
      let period = this.id;
      let othersDetailInput = document.getElementById(`${period}-others-detail`);

      if (this.value === "others") {
        othersDetailInput.style.display = "block";
      } else {
        othersDetailInput.style.display = "none";
      }
    });
  });
  document.getElementById("yaja_Form").addEventListener("submit", function(event) {
    console.log("clickeeed");
    event.preventDefault();
    updateTodaySchedule();
  });
  
  document.getElementById("scheduleForm").addEventListener("submit", function(event) {
    console.log("clickeeed");
    event.preventDefault();
    updateEntireSchedule();
  });
});


