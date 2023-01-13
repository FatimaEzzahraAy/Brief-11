let selectCategorie = document.getElementById("categorie");
let selectPays = document.getElementById("pays");
let ligne = document.getElementById("ligne");
let ButtonFiltrer = document.getElementById("filtrer");
let fenetre = document.getElementById("exampleModal");
let TeteFenetre = document.getElementById("exampleModalLabel");
let corpsFenetre = document.getElementById("corpsMondal");
let corpsFenetre2 = document.getElementById("corpsMondal2");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let arr = [];
//Fermer la fenetre mondal
function fermer() {
  fenetre.style.display = "none";
  corpsFenetre.innerHTML = "";
  corpsFenetre2.innerHTML = "";
}
//creer la carte de recette
function Carte(meal) {
  //creer le div global(carte) qui contient les autres éléments et lui donner une classe et un style
  let carte = document.createElement("div");
  carte.setAttribute("class", "card");
  carte.setAttribute("style", "width: 11rem;");
  ligne.appendChild(carte);
  //créer une image => src ; class
  let image = document.createElement("img");
  image.setAttribute("src", meal.strMealThumb);
  image.setAttribute("class", "card-img-top");
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

    // //je doit lire que 30 mots
    let listeInstructions = document.createElement("li");
    listeInstructions.setAttribute("class", "list-group-item");
    corpsFenetre.appendChild(listeInstructions);
    listeInstructions.innerHTML = "Instructions: " + meal.strInstructions;
    // //les listes de ingredients
    let liste2 = document.createElement("li");
    liste2.setAttribute("class", "list-group-item active");
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

//remplir select de categorie
fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.meals.length; i++) {
      let option1 = document.createElement("option");
      option1.setAttribute("value", data.meals[i].strCategory);
      selectCategorie.appendChild(option1);
      option1.innerHTML = data.meals[i].strCategory;
      if (option1.value === "Lamb") {
        option1.selected = true;
      }
    }
  });
//remplir select de pays
fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.meals.length; i++) {
      let option2 = document.createElement("option");
      option2.setAttribute("value", data.meals[i].strArea);
      selectPays.appendChild(option2);
      option2.innerHTML = data.meals[i].strArea;
      if (option2.value === "Moroccan") {
        option2.selected = true;
      }
    }
  });

fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then((response) => response.json())
  .then((data) => {
    prevButton.addEventListener("click", function ButtonPrecedent() {
      ligne.innerHTML = "";
      for (let i = 0; i < 6; i++) {
        Carte(arr[i]);
      }
    });
    nextButton.addEventListener("click", function ButtonSuivant() {
      ligne.innerHTML = "";
      for (let i = 6; i < data.meals.length; i++) {
        Carte(arr[i]);
      }
    });
    //filtrer par categorie
    selectCategorie.addEventListener("change", function filtrerCategorie() {
      ligne.innerHTML = "";
      arr = [];
      for (let i = 0; i < data.meals.length; i++) {
        if (selectCategorie.value === data.meals[i].strCategory) {
          let valeur = data.meals[i];
          Carte(valeur);
          arr.push(valeur);
        }
      }
    });
    //filtrer par pays
    selectPays.addEventListener("change", function filtrerPays() {
      ligne.innerHTML = "";
      arr = [];
      for (let i = 0; i < data.meals.length; i++) {
        if (selectPays.value === data.meals[i].strArea) {
          let valeur = data.meals[i];
          Carte(valeur);
          arr.push(valeur);
        }
      }
    });
    // //filtrer par categorie et pays
    ButtonFiltrer.addEventListener("click", function Filtrer() {
      ligne.innerHTML = "";
      arr = [];
      for (let i = 0; i < data.meals.length; i++) {
        if (
          selectCategorie.value === data.meals[i].strCategory &&
          selectPays.value === data.meals[i].strArea
        ) {
          let valeur = data.meals[i];
          Carte(valeur);
          arr.push(valeur);
        }
      }
    });
  });
