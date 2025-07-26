const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        if (!response.headers.get('Content-Type').includes('application/json')) {
            console.error('Response is not JSON');
            return;
        }
        if (response.status === 204) {
            console.error('No content available');
            return;
        }
        if (response.status === 404) {
            console.error('Resource not found');
            return;
        }
        if (response.status === 500) {
            console.error('Server error');
            return;
        }
        if (response.status === 429) {
            console.error('Too many requests, please try again later');
            return;
        }
        if (response.status === 403) {
            console.error('Access forbidden, check your API key');
            return;
        }
        if (response.status === 401) {
            console.error('Unauthorized, check your API key');
            return;
        }
        if (response.status === 400) {
            console.error('Bad request, check your parameters');
            return;
        }
        if (response.status === 408) {
            console.error('Request timeout, please try again later');
            return;
        }
        const data = await response.json();
        console.log(data);
        if (!data.articles || data.articles.length === 0) {
            console.error('No articles found');
            return;
        }
        displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
}
const displayNews = () => {
    const newsContainer = document.querySelector('#news');
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    const articles = [];
    for (const article of articles) {
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


fetchNews();
