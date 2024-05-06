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
        linkA.textContent = "view project";
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
          "view their portfolio";
        document.getElementById("personal-link").href =
          foundElement.portfolio_link;
        document.addEventListener("click", function (portfolio_link) {
          if (
            portfolio_link.target.tagName == "A" &&
            !portfolio_link.target.hasAttribute("target")
          ) {
            portfolio_link.target.setAttribute("target", "_blank");
          }
        });

        document.getElementById("linkedin").textContent = foundElement.linkedin;
        // document.getElementById("linkedin").textContent = "linkedin";
        document.getElementById("linkedin").href = foundElement.linkedin;
        document.addEventListener("click", function (linkedin) {
          if (
            linkedin.target.tagName == "A" &&
            !linkedin.target.hasAttribute("target")
          ) {
            linkedin.target.setAttribute("target", "_blank");
          }
        });

        var mainImg = document.getElementById("main-img");
        if (foundElement.hasOwnProperty("image_path")) {
          if (foundElement.image_path.endsWith(".mov")) {
            var videoContainer = document.createElement("video");
            videoContainer.setAttribute("controls", "");

            var sourceElement = document.createElement("source");
            sourceElement.setAttribute(
              "src",
              "main-images/Abiraahmi_Shankar_main.mov"
            );
            sourceElement.setAttribute("type", "video/mp4");

            var fallbackText = document.createTextNode(
              "Your browser does not support the video tag."
            );

            videoContainer.appendChild(sourceElement);
            videoContainer.appendChild(fallbackText);

            mainImg.appendChild(videoContainer);
            mainImg.childNodes[0].remove();
          } else {
            mainImg.childNodes[0].src = foundElement.image_path;
          }
        }
        // var suppImg = document.getElementById("supp-img");
        // if (foundElement.hasOwnProperty("supp_path")) {
        //   suppImg.childNodes[0].src = foundElement.supp_path;
        // }
        var suppImg = document.getElementById("supp-img");
        if (
          foundElement.hasOwnProperty("supp_path") &&
          Array.isArray(foundElement.supp_path)
        ) {
          foundElement.supp_path.forEach(function (imageSrc, index) {
            var img = document.createElement("img");
            img.src = imageSrc;
            suppImg.appendChild(img);
          });
        }
      } else {
        window.location.href = "/index.html";
        console.log("Element not found");
      }
    })
    .catch((error) => console.error("Error loading JSON file:", error));
}
