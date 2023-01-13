let ligne = document.getElementById("ligne");
let fenetre = document.getElementById("exampleModal");
let TeteFenetre = document.getElementById("exampleModalLabel");
let corpsFenetre = document.getElementById("corpsMondal");
let corpsFenetre2 = document.getElementById("corpsMondal2");
let rechercherNom = document.getElementById("rechercherNom");

//Fermer la fenetre mondal
function fermer() {
  fenetre.style.display = "none";
  corpsFenetre.innerHTML = "";
  corpsFenetre2.innerHTML = "";
}
//creer les cartes et fenetre mondal
function Carte(meal) {
  //creer le div global(carte) qui contient les autres éléments et lui donner une classe et un style
  let carte = document.createElement("div");
  carte.setAttribute("class", "card border border-2 border-success");
  carte.setAttribute("style", "width: 18rem;");
  ligne.appendChild(carte);
  //créer une image => src ; class
  let image = document.createElement("img");
  image.setAttribute("src", meal.strMealThumb);
  image.setAttribute("class", "card-img-top rounded");
  carte.appendChild(image);
  // creer div du texte
  let texte = document.createElement("div");
  texte.setAttribute("class", "card-body");
  carte.appendChild(texte);
  //creer h5
  let titreR = document.createElement("h6");
  titreR.setAttribute("class", "card-title");
  titreR.setAttribute("style", "height: 3rem;");
  titreR.innerHTML = meal.strMeal;
  texte.appendChild(titreR);
  //creer button
  let detail = document.createElement("a");
  detail.setAttribute("class", "btn btn-success");
  detail.innerHTML = "Details";
  texte.appendChild(detail);
  //Afficher div de fenetre mondal
  detail.addEventListener("click", function () {
    fenetre.style.display = "block";
    fenetre.style.opacity = "1";
    TeteFenetre.innerHTML = meal.strMeal;
    //Gategorie:
    let listeCategorie = document.createElement("li");
    listeCategorie.setAttribute("class", "list-group-item");
    corpsFenetre.appendChild(listeCategorie);
    listeCategorie.innerHTML = "Catégorie: " + meal.strCategory;
    //Pays:
    let listePays = document.createElement("li");
    listePays.setAttribute("class", "list-group-item");
    corpsFenetre.appendChild(listePays);
    listePays.innerHTML = "Pays: " + meal.strArea;

    //instruction
    let listeInstructions = document.createElement("li");
    listeInstructions.setAttribute("class", "list-group-item");
    corpsFenetre.appendChild(listeInstructions);
    listeInstructions.innerHTML = "Instructions: " + meal.strInstructions;
    // //les listes de ingredients
    let liste2 = document.createElement("li");
    liste2.setAttribute("class", "list-group-item active bg-success");
    corpsFenetre2.appendChild(liste2);
    liste2.innerHTML = "Les ingrédients:";
    //ingredient 1:
    let listeIngredient1 = document.createElement("li");
    listeIngredient1.setAttribute("class", "list-group-item");
    corpsFenetre2.appendChild(listeIngredient1);
    listeIngredient1.innerHTML = meal.strIngredient1;
    //ingredient 2:
    let listeIngredient2 = document.createElement("li");
    listeIngredient2.setAttribute("class", "list-group-item");
    corpsFenetre2.appendChild(listeIngredient2);
    listeIngredient2.innerHTML = meal.strIngredient2;
    //ingredient 3:
    let listeIngredient3 = document.createElement("li");
    listeIngredient3.setAttribute("class", "list-group-item");
    corpsFenetre2.appendChild(listeIngredient3);
    listeIngredient3.innerHTML = meal.strIngredient3;
    //ingredient 4:
    let listeIngredient4 = document.createElement("li");
    listeIngredient4.setAttribute("class", "list-group-item");
    corpsFenetre2.appendChild(listeIngredient4);
    listeIngredient4.innerHTML = meal.strIngredient4;
    //ingredient 5:
    let listeIngredient5 = document.createElement("li");
    listeIngredient5.setAttribute("class", "list-group-item");
    corpsFenetre2.appendChild(listeIngredient5);
    listeIngredient5.innerHTML = meal.strIngredient5;
  });
}
function Charger() {
  for (let i = 0; i < 6; i++) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        Carte(data.meals[0]);
      });
  }
}
Charger();
//Rechercher par nom:
let LienNom = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
fetch(LienNom)
  .then((response) => response.json())
  .then((data) => {
    rechercherNom.addEventListener("keyup", function () {
      ligne.innerHTML = "";
      for (let i = 0; i < 25; i++) {
        if (
          data.meals[i].strMeal
            .toLowerCase()
            .startsWith(rechercherNom.value.toLowerCase())
        ) {
          console.log(data.meals[i]);
          Carte(data.meals[i]);
        }
      }

      if (rechercherNom.value == "") {
        ligne.innerHTML = "";
        Charger();
      }
    });
  });
