const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        // response.ok covers all successful HTTP responses (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

const displayNews = (articles) => {
    const newsContainer = document.querySelector('#news');
    if (!newsContainer) {
        console.error('News container not found');
        return;
    }
    
    newsContainer.textContent = ''; // Clear previous articles
    // Create responsive Bootstrap column wrapper
    for (const article of articles) {
        const colDiv = document.createElement('div'); 
        colDiv.className = 'col-md-6 col-lg-4 mb-4';
        
        // Create Bootstrap card with custom Pantone border
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card card-custom h-100'; // Added custom card class for Pantone border
        
        // Add image if available
        if (article.urlToImage) {
            const img = document.createElement('img');
            img.src = article.urlToImage;
            img.alt = article.title;
            img.className = 'card-img-top'; // Bootstrap class for responsive images
            img.style.width = '100%'; // Ensure image takes full width of card
            img.style.height = '200px'; // Fixed height for uniformity
            img.style.objectFit = 'cover'; // Maintain aspect ratio and cover the area
            
            cardDiv.appendChild(img);// Append image to card
        }
        
        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column'; //
        
        // Add title
        const title = document.createElement('h5');
        title.className = 'card-title'; // Bootstrap class for card title (headline)
        title.textContent = article.title;
        cardBody.appendChild(title);

        // Add description
        if (article.description) {
            const description = document.createElement('p');
            description.className = 'card-text';
            description.textContent = article.description;
            cardBody.appendChild(description); // content added to card body
        }
        
        // Add "Read more" link with custom Pantone-inspired styling
        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank'; // Opens article in new tab when clicked
        link.className = 'btn btn-custom-dark mt-auto'; // Custom dark Pantone color button
        link.textContent = 'Read more';  // mt-auto ensures button is at bottom of card
        cardBody.appendChild(link);
        
        // Assemble the card
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        newsContainer.appendChild(colDiv);
    }
}

fetchNews();

/** 
 * First call to fetchNews()
 * newsContainer → [Article 1, Article 2, Article 3]
 * Second call to fetchNews()
 * newsContainer → [Article 1, Article 2, Article 3, Article 1, Article 2, Article 3]
 * ↑ Duplicates!
 * To avoid duplicates, clear the container before appending new articles
 * newsContainer.textContent = ''; // Clears container before appending new articles
 * This ensures only the latest articles are displayed without duplicates
 */