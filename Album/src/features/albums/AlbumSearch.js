import { useState } from 'react';
import { Link } from 'react-router-dom';

const AlbumSearch = ({ albumsData }) => {
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

        // Case-insensitive search for album titles
        const filteredAlbums = albumsData.filter(album => 
            album.title.toLowerCase().includes(term.toLowerCase())
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
            <h1>Album Search</h1>
            <p>Search for albums by title (case-insensitive)</p>
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Enter album title..."
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
                            <div style={{ marginTop: '15px' }}>
                                {searchResults.map((album) => (
                                    <div 
                                        key={album.id} 
                                        style={{ 
                                            border: '1px solid #ddd', 
                                            padding: '15px', 
                                            margin: '10px 0',
                                            borderRadius: '5px',
                                            backgroundColor: '#f9f9f9'
                                        }}
                                    >
                                        <h4 style={{ margin: '0 0 10px 0' }}>
                                            <Link to={`/albums/${album.id}`} style={{ textDecoration: 'none' }}>
                                                {album.title}
                                            </Link>
                                        </h4>
                                        <p style={{ margin: '5px 0' }}><strong>Artist:</strong> {album.artist}</p>
                                        <p style={{ margin: '5px 0' }}><strong>Year:</strong> {album.year}</p>
                                        <p style={{ margin: '5px 0' }}><strong>Album ID:</strong> {album.id}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3>No albums found for "{searchTerm}"</h3>
                            <p>Try searching for: Mezzanine, The Ruminant Band, or The Brand</p>
                        </div>
                    )}
                </div>
            )}

            <br />
            <Link to="/albums">← Back to all albums</Link>
        </div>
    );
};

export default AlbumSearch;
