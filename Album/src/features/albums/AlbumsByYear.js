import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AlbumsByYear = ({ albumsData }) => {
    const { year } = useParams();
    
    // Filter albums by the year parameter
    const albumsByYear = albumsData.filter(album => album.year.toString() === year);
    
    return (
        <div>
            <h1>Albums from {year}</h1>
            {albumsByYear.length > 0 ? (
                <div className="row">
                    {albumsByYear.map((album) => (
                        <div key={album.id} className="col-md-6 col-lg-4 mb-3">
                            <div className="album-card">
                                <h5 className="card-title">
                                    <Link to={`/albums/${album.id}`} className="nav-link">
                                        {album.title}
                                    </Link>
                                </h5>
                                <p className="card-text">
                                    <strong>Artist:</strong> {album.artist}<br />
                                    <strong>Year:</strong> {album.year}
                                </p>
                                <Link to={`/albums/${album.id}`} className="btn btn-primary-custom btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-danger-custom">
                    <p>No albums found for the year {year}.</p>
                </div>
            )}
            
            <div className="mt-4">
                <Link to="/browse-by-year" className="btn btn-secondary-custom me-2">
                    ← Browse Other Years
                </Link>
                <Link to="/albums" className="nav-link d-inline-block">
                    Back to all albums
                </Link>
            </div>
        </div>
    );
};

export default AlbumsByYear;