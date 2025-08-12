import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RandomAlbum = ({ albumsData }) => {
    const [randomAlbum, setRandomAlbum] = useState(null);

    useEffect(() => {
        // Get a random album when component mounts
        if (albumsData && albumsData.length > 0) {
            const randomIndex = Math.floor(Math.random() * albumsData.length);
            setRandomAlbum(albumsData[randomIndex]);
        }
    }, [albumsData]);

    const getNewRandomAlbum = () => {
        if (albumsData && albumsData.length > 0) {
            const randomIndex = Math.floor(Math.random() * albumsData.length);
            setRandomAlbum(albumsData[randomIndex]);
        }
    };

    if (!randomAlbum) {
        return <div>Loading random album...</div>;
    }

    return (
        <div>
            <h1>Random Album</h1>
            <div className="album-card mb-3">
                <div className="card-body p-3">
                    <h4 className="card-title mb-2">{randomAlbum.title}</h4>
                    <p className="card-text mb-1"><strong>Artist:</strong> {randomAlbum.artist}</p>
                    <p className="card-text mb-0"><strong>Year:</strong> {randomAlbum.year}</p>
                </div>
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
                <button 
                    onClick={getNewRandomAlbum} 
                    className="btn btn-primary-custom"
                >
                    🎲 Get Another Random Album
                </button>
                
                <Link 
                    to={`/albums/${randomAlbum.id}`} 
                    className="btn btn-secondary-custom"
                >
                    👁️ View Full Details
                </Link>
            </div>
            
            <div>
                <Link to="/albums" className="nav-link d-inline-block">← Back to all albums</Link>
            </div>
        </div>
    );
};

export default RandomAlbum;
