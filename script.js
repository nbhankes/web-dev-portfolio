//! **************** Time TO LOAD Screen ****************

const perfData = window.performance.timing;
const renderTime = perfData.domComplete - perfData.domLoading;
console.log("Render time: " + renderTime);

//! **************** DARKMODE TOGGLE ****************

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//! **************** MODAL TOGGLE ****************
const modal = document.querySelector(".modal");
const activate = document.querySelector(".activate");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("active");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

activate.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//! **************** DEV.TO GET REQUESTS ****************

let i;

function getDevToArticles() {
  axios({
    method: "get",
    url: "https://dev.to/api/articles?username=nbhankes",
    timeout: 5000,
    params: {
      per_page: 5,
    },
  })
    .then(function (res) {
      for (i = 0; i < 5; i++) {
        document.getElementById("res").innerHTML = `
        <div class="blog-container">

          <div class="flex-item small">
            <img class="blog-img" src=${res.data[0].cover_image}></img>
            <h3 class="blog-title">${res.data[0].title}</h3>
            <p class="blog-description">${res.data[0].description}</p>
            <a class="blog-url" href=${res.data[0].url}>Read full article</a>
          </div>

          <div class="flex-item small">
            <img class="blog-img" src=${res.data[1].cover_image}></img>
            <h3 class="blog-title">${res.data[1].title}</h3>
            <p class="blog-description">${res.data[1].description}</p>
            <a class="blog-url" href=${res.data[1].url}>Read full article</a>
          </div>

          <div class="flex-item small">
            <img class="blog-img" src=${res.data[2].cover_image}></img>
            <h3 class="blog-title">${res.data[2].title}</h3>
            <p class="blog-description">${res.data[2].description}</p>
            <a class="blog-url" href=${res.data[2].url}>Read full article</a>
          </div>

          <div class="flex-item small">
            <img class="blog-img" src=${res.data[3].cover_image}></img>
            <h3 class="blog-title">${res.data[3].title}</h3>
            <p class="blog-description">${res.data[3].description}</p>
            <a class="blog-url" href=${res.data[3].url}>Read full article</a>
          </div>

          <div class="flex-item small">
            <img class="blog-img" src=${res.data[4].cover_image}></img>
            <h3 class="blog-title">${res.data[4].title}</h3>
            <p class="blog-description">${res.data[4].description}</p>
            <a class="blog-url" href=${res.data[4].url}>Read full article</a>
          </div>

        </div>

`;
      }
    })
    .catch(function (err) {
      console.log("DEV.to API Connection Error. Unable to GET response data.");
    });
}
