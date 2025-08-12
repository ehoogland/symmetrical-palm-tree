import { useState } from 'react';
import { Link } from 'react-router-dom';

const ArtistSearch = ({ albumsData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setHasSearched(true);
        
        if (term.trim() === '') {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }

        // Case-insensitive search for artist names
        const filteredAlbums = albumsData.filter(album => 
            album.artist.toLowerCase().includes(term.toLowerCase())
        );
        
        setSearchResults(filteredAlbums);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setHasSearched(false);
    };

    return (
        <div>
            <h1>Artist Search</h1>
            <p>Search for albums by artist name (case-insensitive)</p>
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Enter artist name..."
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '300px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '10px'
                    }}
                />
                {searchTerm && (
                    <button 
                        onClick={clearSearch}
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {hasSearched && (
                <div>
                    {searchResults.length > 0 ? (
                        <div>
                            <h3>Found {searchResults.length} album{searchResults.length !== 1 ? 's' : ''} matching "{searchTerm}":</h3>
                            <div className="row mt-4">
                                {searchResults.map((album) => (
                                    <div key={album.id} className="col-md-6 col-lg-4 mb-4">
                                        <div className="album-card h-100">
                                            <div className="card-body d-flex flex-column">
                                                <h4 className="card-title mb-3">
                                                    <Link to={`/albums/${album.id}`} className="nav-link p-0">
                                                        {album.title}
                                                    </Link>
                                                </h4>
                                                
                                                {/* Prominent Artist Name */}
                                                <div className="artist-highlight mb-3 p-3 text-center" style={{
                                                    background: 'linear-gradient(135deg, var(--peach-fuzz) 0%, var(--digital-lime) 100%)',
                                                    borderRadius: '15px',
                                                    border: '2px solid var(--mocha-mousse)'
                                                }}>
                                                    <h2 className="mb-0 fw-bold" style={{
                                                        color: 'var(--cosmic-cobalt)',
                                                        fontSize: '1.5rem',
                                                        textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
                                                    }}>
                                                        🎤 {album.artist}
                                                    </h2>
                                                </div>
                                                
                                                <div className="album-details mb-3">
                                                    <p className="mb-2">
                                                        <span className="badge" style={{
                                                            backgroundColor: 'var(--cosmic-cobalt)',
                                                            color: 'white',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            📅 {album.year}
                                                        </span>
                                                    </p>
                                                    <p className="text-muted mb-0">
                                                        <small>Album ID: {album.id}</small>
                                                    </p>
                                                </div>
                                                
                                                <Link to={`/albums/${album.id}`} className="btn btn-primary-custom btn-sm mt-auto">
                                                    View Full Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3>No albums found for artist "{searchTerm}"</h3>
                            <p>Try searching for: Massive Attack, Fruit Bats, or Tats</p>
                        </div>
                    )}
                </div>
            )}

            <br />
            <Link to="/albums">← Back to all albums</Link>
        </div>
    );
};

export default ArtistSearch;
