function showFilter(){
    let filterForm = document.getElementById("filterContent");
    let addNew = document.getElementById("newContent");

    addNew.style.display = "none";
    filterForm.style.display = "block";
}

function showAddNew(){
    let newForm = document.getElementById("newContent");
    let filterForm = document.getElementById("filterContent");

    filterForm.style.display = "none";
    newForm.style.display = "flex";
}

function filterArticles(){
    const showOpinion = document.getElementById("opinionCheckbox").checked;
    const showRecipe = document.getElementById("recipeCheckbox").checked;
    const showUpdate = document.getElementById("updateCheckbox").checked;

    const articles = document.querySelectorAll("article");

    articles.forEach(article => {
        if (article.classList.contains("opinion")){
            if (showOpinion){
                article.style.display = "block";
            }
            else{
                article.style.display = "none";
            }
        }
        else if (article.classList.contains("recipe")){
            if (showRecipe){
                article.style.display = "block";
            }
            else{
                article.style.display = "none";
            }
        }
        else if (article.classList.contains("update")){
            if (showUpdate){
                article.style.display = "block";
            }
            else{
                article.style.display = "none";
            }
        }

    });

}

function addNewArticle(){
    const title = document.getElementById("inputHeader").value;
    const content = document.getElementById("inputArticle").value;

    let type = "";
    if (document.getElementById("opinionRadio").checked){
        type = "opinion";
    }
    else if (document.getElementById("recipeRadio").checked){
        type = "recipe";
    }
    else if (document.getElementById("lifeRadio").checked){
        type = "update";
    }

    const newArticle = document.createElement("article");
    const newMarker = document.createElement("span");
    const newTitle = document.createElement("h2");
    const newContent = document.createElement("p");
    const linkContainer = document.createElement("p");
    const link = document.createElement("a");

    newArticle.classList.add(type);

    const articleCount = document.querySelectorAll("article").length;
    
    newArticle.id = "a" + (articleCount + 1);

    newMarker.classList.add("marker");
    if (type === "opinion"){
        newMarker.textContent = "Opinion";
    }
    else if (type === "recipe"){
        newMarker.textContent = "Recipe";
    }
    else if (type === "update"){
        newMarker.textContent = "Update";
    }

    newTitle.textContent = title;
    newContent.textContent = content;

    link.href = "moreDetails.html";
    link.textContent = "Read More";

    linkContainer.appendChild(link);

    newArticle.appendChild(newMarker);
    newArticle.appendChild(newTitle);
    newArticle.appendChild(newContent);
    newArticle.appendChild(linkContainer);

    document.getElementById("articleList").appendChild(newArticle);

    document.getElementById("newContent").reset();

}