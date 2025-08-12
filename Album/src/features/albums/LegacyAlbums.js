import { Link } from 'react-router-dom';

const LegacyAlbums = ({ albumsData }) => {
    // Filter albums released before the year 2000
    const legacyAlbums = albumsData.filter(album => album.year < 2000);
    
    return (
        <div>
            <h1>Legacy Albums (Before 2000)</h1>
            <p>Discover classic albums from the 20th century</p>
            
            {legacyAlbums.length > 0 ? (
                <div>
                    <p>Found {legacyAlbums.length} legacy album{legacyAlbums.length !== 1 ? 's' : ''}:</p>
                    <ul>
                        {legacyAlbums.map((album) => (
                            <li key={album.id} style={{ marginBottom: '10px' }}>
                                <Link to={`/albums/${album.id}`}>
                                    <strong>{album.title}</strong> by {album.artist} ({album.year})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No legacy albums found in the collection.</p>
            )}
            
            <br />
            <div>
                <Link to="/albums" style={{ marginRight: '15px' }}>← Back to all albums</Link>
                <Link to="/albums/year/2009">View 2009 albums →</Link>
            </div>
        </div>
    );
};

export default LegacyAlbums;
