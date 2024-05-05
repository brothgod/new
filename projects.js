function separateAndSortProjects(jsonData) {
  // Separate jsonData into two lists based on the 'year' attribute
  var gradYearList = [];
  var seniorYearList = [];

  jsonData.forEach(function (item) {
    if (item.year === "Final Year Grad (Thesis Project)") {
      gradYearList.push(item);
    } else {
      seniorYearList.push(item);
    }
  });

  gradYearList.sort((a, b) => a.full_name.localeCompare(b.full_name));
  seniorYearList.sort((a, b) => a.full_name.localeCompare(b.full_name));

  generateProjects(gradYearList, "gradProjects");
  generateProjects(seniorYearList, "seniorProjects");
}

function generateProjects(jsonData, containerId) {
  // Iterate through each JSON object
  jsonData.forEach(function (item) {
    // Create a new list item element
    var listItem = document.createElement("li");

    // Create an image element
    var image = document.createElement("img");
    image.src = "idm.jpg"; // Use the main image from JSON data
    image.width = "150px";

    // Create div elements for project title, medium, and full name
    var projectTitle = document.createElement("div");
    projectTitle.textContent = item.project_title;

    var medium = document.createElement("div");
    medium.textContent = item.medium;

    var fullName = document.createElement("div");
    fullName.textContent = item.full_name;

    // Append image and div elements to the list item
    listItem.appendChild(image);
    listItem.appendChild(projectTitle);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(medium);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(fullName);
    listItem.appendChild(document.createElement("br"));

    // Append the list item to the parent container (e.g., ul or ol)
    // Replace 'parentContainer' with the ID or class of your parent container
    document.getElementById(containerId).appendChild(listItem);
  });
}

// Fetch the JSON file
fetch("student-info.json")
  .then((response) => response.json())
  .then((data) => {
    // Once the JSON data is fetched, you can work with it here
    console.log(data); // For example, you can log it to the console
    // You can also call a function to process the JSON data here
    separateAndSortProjects(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch
    console.error("Error fetching JSON:", error);
  });
