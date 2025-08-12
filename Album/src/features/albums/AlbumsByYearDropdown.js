import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AlbumsByYearDropdown = ({ albumsData }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const navigate = useNavigate();
    
    // Get unique years from the catalog, sorted from earliest to latest
    const availableYears = [...new Set(albumsData.map(album => album.year))]
        .sort((a, b) => a - b);
    
    // Filter albums by selected year
    const albumsByYear = selectedYear ? 
        albumsData.filter(album => album.year.toString() === selectedYear) : [];
    
    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
        
        // Optionally navigate to a specific URL for the year
        if (year) {
            navigate(`/albums/year/${year}`);
        }
    };
    
    return (
        <div>
            <h1>Browse Albums by Year</h1>
            <p>Select a year to view albums from your collection</p>
            
            <div className="row mb-4">
                <div className="col-md-6">
                    <label htmlFor="yearSelect" className="form-label fw-bold">
                        Choose Year:
                    </label>
                    <select 
                        id="yearSelect"
                        className="form-select form-control-custom"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <option value="">-- Select a Year --</option>
                        {availableYears.map(year => (
                            <option key={year} value={year}>
                                {year} ({albumsData.filter(album => album.year === year).length} album{albumsData.filter(album => album.year === year).length !== 1 ? 's' : ''})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            {selectedYear && (
                <div>
                    <h3>Albums from {selectedYear}</h3>
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
                        <div className="alert alert-info">
                            <p>No albums found for the year {selectedYear}.</p>
                        </div>
                    )}
                </div>
            )}
            
            {!selectedYear && (
                <div className="text-center mt-4">
                    <h4>Available Years in Catalog</h4>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                        {availableYears.map(year => (
                            <button
                                key={year}
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setSelectedYear(year.toString())}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-4">
                <Link to="/albums" className="nav-link d-inline-block">← Back to all albums</Link>
            </div>
        </div>
    );
};

export default AlbumsByYearDropdown;
