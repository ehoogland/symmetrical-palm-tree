const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        // function call to display the news articles
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
} 
fetchNews(); // test the above function
/* Fetch news articles from the News API and display them on the page */
/*
const displayNews = () => {
    const newsContainer = document.querySelector('#news');
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    const newsArticles = [];
    for (const article of newsArticles) {
        const articleElement = document.createElement('div');
        const title = document.createElement('h4');
        title.textContent = article.title;
        articleElement.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        articleElement.appendChild(description);

        if (article.urlToImage) {
            const img = document.createElement('img');
            img.src = article.urlToImage;
            img.alt = article.title;
            articleElement.appendChild(img);
        }                                               
        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = 'Read more';
        articleElement.appendChild(link);

        newsContainer.appendChild(articleElement);
    }
    newsContainer.textContent = '';

}

//fetchNews();
