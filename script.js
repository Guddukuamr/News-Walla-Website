const API_KEY = "56f5485d5c9147e6bba988b6cfef40bf";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
};
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const Cardscontainers = document.getElementById("Cards-containers");
    const newsCardTemplate = document.getElementById("news-template-card");

    Cardscontainers.innerHTML = "";
    articles.forEach((article)  => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        Cardscontainers.appendChild(cardClone);
    })

}


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSourse = cardClone.querySelector("#newa-sourse");
    const newsDes = cardClone.querySelector("#news-des");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDes.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSourse.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url, '_blank');
    })
}
let curSelectedNav = null;
function onNavItemlick(id){
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');

    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButtone = document.getElementById("search-button");
const searchText = document.getElementById("Search-text");

searchButtone.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});