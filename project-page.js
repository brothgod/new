window.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  const queryString =
    window.location
      .search; /* Example: ?product=shirt&color=blue&newuser&size=m */
  const urlParams = new URLSearchParams(queryString);
  const parsedSiteId = urlParams.get("id"); // ?cat=something

  // Load the JSON file using fetch
  let foundElement = null;
  fetch("student-info.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the array to find the element with the specific attribute
      const desiredId = parsedSiteId; // The specific attribute value you are looking for
      foundElement = data.find((item) => item.net_id === desiredId);

      // Check if the element was found
      if (foundElement) {
        console.log("Element found:", foundElement);
        document.getElementById("title").textContent =
          foundElement.project_title;
        document.getElementById("name").textContent = foundElement.full_name;
        let year = "";
        if (foundElement.year === "Final Year Grad (Thesis Project)") {
          year = "Graduate Thesis";
        } else {
          year = "Senior Thesis";
        }
        document.getElementById("year").textContent = year + " ";
        document.getElementById("medium").textContent = foundElement.medium;

        let link = document.getElementById("link");
        let linkA = document.createElement("a");
        // linkA.textContent = foundElement.project_link;
        linkA.textContent = "project link";
        linkA.href = foundElement.project_link;
        link.appendChild(linkA);

        document.getElementById("description").textContent =
          foundElement.description;
        if (foundElement.keywords !== "")
          document.getElementById("keywords").textContent =
            "Keywords: " + foundElement.keywords;
        else document.getElementById("keywords").remove();
        // document.getElementById("personal-link").textContent =
        //   foundElement.portfolio_link;
        document.getElementById("personal-link").textContent =
          "personal portfolio";
        document.getElementById("personal-link").href =
          foundElement.portfolio_link;
        // document.getElementById("linkedin").textContent = foundElement.linkedin;
        document.getElementById("linkedin").textContent = "linkedin";
        document.getElementById("linkedin").href = foundElement.linkedin;
      } else {
        console.log("Element not found");
      }
    })
    .catch((error) => console.error("Error loading JSON file:", error));

  // <div id="title">Dance 4 Me!</div>

  // <div id="name">Aditi Gupta</div>
  // <div id="qualifiers">Graduate Thesis | Installation Art</div>
  // <a href="iadoro.github.io/danceforme">iadoro.github.io/danceforme
  //         <div id="description">Based on my family's bakery, this project aims to blend culinary heritage with a modern twist for a new restaurant identity. The project's essence lies in crafting a distinctive brand identity encompassing both the digital and physical realms. The journey involves creating a brand kit that extends beyond screens into the tangible world. This project reflects a personal and professional evolution, transforming a family legacy into a vibrant culinary haven that harmonizes tradition and innovation.
  //         <div id="keywords">Keywords: Music, Dance, ML</div>
  //         <div id="personal-link"><a>iadoro.github.io</a></div>
  //         <div id="linkedin"><a>https://www.linkedin.com/in/adoro/</a>
  //         <div id="main-img"><img src="idm.jpg" /></div>
  //         <div id="supp-img"><img src="idm.jpg" /></div>
}
