// Merged JavaScript file for the Free-to-Play Games Website

// Ui Module
class Ui {
    displayDataGame(data) {
       let gamesBox = ``;
       for (let i = 0; i < data.length; i++) {
          gamesBox += `
          <div class="col">
          <div data-id="${data[i].id}"  class="card h-100 bg-transparent" role="button">
             <div  class="card-body">
                <figure class="position-relative">
                   <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
                </figure>
                <figcaption>
                   <div class="hstack justify-content-between">
                      <h3 class="h6 small">${data[i].title}</h3>
                      <span class="badge text-bg-primary p-2">Free</span>
                   </div>
                   <p class="card-text small text-center opacity-50">
                      ${data[i].short_description.split(" ", 8)}
                   </p>
                </figcaption>
             </div>
             <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">${data[i].genre}</span>
                <span class="badge badge-color">${data[i].platform}</span>
             </footer>
          </div>
       </div>`;
       }
       document.getElementById("gameData").innerHTML = gamesBox;
    }
 
    displayDetails(data) {
       const content = `
       <div class="col-md-4">
       <img src="${data.thumbnail}" class="w-100" alt="image details" />
    </div>
    <div class="col-md-8">
       <h3>Title: ${data.title}</h3>
       <p>Category: <span class="badge text-bg-info"> ${data.genre}</span> </p>
       <p>Platform: <span class="badge text-bg-info"> ${data.platform}</span> </p>
       <p>Status: <span class="badge text-bg-info"> ${data.status}</span> </p>
       <p class="small">${data.description}</p>
       <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
    </div>`;
 
       document.getElementById("detailsContent").innerHTML = content;
    }
 }
 
 // Details Module
 class Details {
    constructor(id) {
       this.ui = new Ui();
       document.getElementById("btnClose").addEventListener("click", () => {
          document.querySelector(".games").classList.remove("d-none");
          document.querySelector(".details").classList.add("d-none");
       });
       this.getDetails(id);
    }
 
    getDetails(idGames) {
       const loading = document.querySelector(".loading");
       loading.classList.remove("d-none");
 
       const options = {
          method: "GET",
          headers: {
             "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
             "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
       };
 
       fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`, options)
          .then((response) => response.json())
          .then((response) => this.ui.displayDetails(response))
          .catch((err) => console.error(err))
          .finally(() => {
             loading.classList.add("d-none");
          });
    }
 }
 
 // Games Module
 class Games {
    constructor() {
       this.getGames("mmorpg");
 
       document.querySelectorAll(".menu a").forEach((link) => {
          link.addEventListener("click", (e) => {
             document.querySelector(".menu .active").classList.remove("active");
             e.target.classList.add("active");
             this.getGames(e.target.dataset.category);
          });
       });
 
       this.ui = new Ui();
    }
 
    async getGames(category) {
       const loading = document.querySelector(".loading");
       loading.classList.remove("d-none");
       const options = {
          method: "GET",
          headers: {
             "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
             "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
             Accept: "application/json",
             "Content-Type": "application/json",
          },
       };
 
       const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
       const response = await api.json();
 
       this.ui.displayDataGame(response);
       this.startEvent();
       loading.classList.add("d-none");
    }
 
    startEvent() {
       document.querySelectorAll(".card").forEach((item) => {
          item.addEventListener("click", () => {
             const id = item.dataset.id;
             this.showDetails(id);
          });
       });
    }
 
    showDetails(idGame) {
       const details = new Details(idGame);
       document.querySelector(".games").classList.add("d-none");
       document.querySelector(".details").classList.remove("d-none");
    }
 }
 
 // Initialize the application
 new Games();
 