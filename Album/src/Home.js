import { Link } from 'react-router-dom';
import { getAlbumsData } from './features/albums/albumsSlice';

const Home = () => {
  const albumsData = getAlbumsData();
  
  // Calculate statistics
  const totalAlbums = albumsData.length;
  const uniqueArtists = [...new Set(albumsData.map(album => album.artist))].length;
  const years = albumsData.map(album => album.year);
  const earliestYear = Math.min(...years);
  const latestYear = Math.max(...years);
  const yearSpan = latestYear - earliestYear;
  
  // Get a featured album (most recent or random)
  const featuredAlbum = albumsData[Math.floor(Math.random() * albumsData.length)];
  
  // Get recent albums (last 3 by year)
  const recentAlbums = [...albumsData]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-center mb-5 p-5" style={{
        background: 'linear-gradient(135deg, var(--peach-fuzz) 0%, var(--mocha-mousse) 100%)',
        borderRadius: '20px',
        color: 'var(--cosmic-cobalt)'
      }}>
        <h1 className="hero-title fw-bold mb-3">🎵 My Album Collection</h1>
        <p className="lead mb-4">Discover, explore, and manage your personal music library</p>
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <Link to="/albums" className="btn btn-primary-custom btn-lg d-block mx-auto" style={{maxWidth: '250px'}}>
              Browse All Albums
            </Link>
          </div>
          <div className="col-12 text-center mb-4">
            <Link to="/add-album" className="btn btn-secondary-custom btn-lg d-block mx-auto" style={{maxWidth: '250px'}}>
              Add New Album
            </Link>
          </div>
          <div className="col-12 text-center mb-4">
            <Link 
              to="/random" 
              className="btn btn-lg d-block mx-auto" 
              style={{
                background: '#2C3E50',
                color: 'white',
                border: 'none',
                maxWidth: '250px',
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                fontWeight: '500',
                transition: 'background 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#34495E';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#2C3E50';
                e.target.style.boxShadow = 'none';
              }}
            >
              🎲 Random Discovery
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card text-center p-4" style={{
            background: 'linear-gradient(135deg, var(--cosmic-cobalt) 0%, var(--ultra-steady) 100%)',
            color: 'white',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 className="display-5 fw-bold">{totalAlbums}</h2>
            <p className="mb-0">Total Albums</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card text-center p-4" style={{
            background: 'linear-gradient(135deg, var(--peach-fuzz) 0%, var(--sunset-coral) 100%)',
            color: 'white',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 className="display-5 fw-bold">{uniqueArtists}</h2>
            <p className="mb-0">Unique Artists</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card text-center p-4" style={{
            background: 'linear-gradient(135deg, var(--soft-mint) 0%, var(--digital-lime) 100%)',
            color: 'var(--cosmic-cobalt)',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 className="display-5 fw-bold">{yearSpan + 1}</h2>
            <p className="mb-0">Years Covered</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card text-center p-4" style={{
            background: 'linear-gradient(135deg, var(--mocha-mousse) 0%, var(--warm-taupe) 100%)',
            color: 'white',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 className="display-5 fw-bold">{earliestYear}-{latestYear}</h2>
            <p className="mb-0">Era Span</p>
          </div>
        </div>
      </div>

      {/* Featured Album */}
      {featuredAlbum && (
        <div className="row mb-5 mt-4">
          <div className="col-12">
            <h3 className="mb-4">🌟 Featured Album</h3>
                        <div className="featured-album-card p-4" style={{
              background: 'linear-gradient(135deg, white 0%, var(--peach-fuzz) 100%)',
              borderRadius: '20px',
              border: '3px solid var(--mocha-mousse)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.1)'
            }}>
              <div className="row align-items-center">
                <div className="col-md-8 mb-4 mb-md-0">
                  <h4 className="text-primary fw-bold mb-2">{featuredAlbum.title}</h4>
                  <p className="lead mb-2">by {featuredAlbum.artist}</p>
                  <p className="text-muted mb-4">Released in {featuredAlbum.year}</p>
                  <div className="mt-4 mb-3">
                    <Link to={`/albums/${featuredAlbum.id}`} className="btn btn-primary-custom">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 text-center mt-3 mt-md-0" style={{paddingTop: '0rem', paddingBottom: '1.5rem'}}>
                  <div className="featured-album-cover">
                    <img 
                      src={featuredAlbum.cover || `https://picsum.photos/220/220?random=${featuredAlbum.id}`} 
                      className="img-fluid rounded shadow-lg" 
                      alt={`${featuredAlbum.title} cover`}
                      style={{
                        width: '220px',
                        height: '220px',
                        objectFit: 'cover',
                        border: '4px solid var(--cosmic-cobalt)',
                        borderRadius: '15px'
                      }}
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/220/220?random=${featuredAlbum.id + 100}`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Albums */}
      <div className="row mb-5">
        <div className="col-12">
          <h3 className="mb-4">🕒 Recent Albums</h3>
          <div className="row">
            {recentAlbums.map((album, index) => (
              <div key={album.id} className="col-md-4 mb-3">
                <Link to={`/albums/${album.id}`} className="text-decoration-none">
                  <div className="album-card h-100">
                    <div className="album-cover-container">
                      <img 
                        src={album.cover || `https://picsum.photos/300/300?random=${album.id}`} 
                        className="card-img-top album-cover" 
                        alt={`${album.title} cover`}
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/300/300?random=${album.id + 100}`;
                        }}
                      />
                      {album.hasCodeOverlay && (
                        <div className="scheme-code-overlay">
                          <div className="code-block">
                            <span className="comment">;; Lambda Music</span><br/>
                            <span className="keyword">(define</span> <span className="function">beat</span><br/>
                            &nbsp;&nbsp;<span className="keyword">(lambda</span> (x)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;(* x <span className="string">'scheme-power</span>)))
                          </div>
                          <div className="code-block">
                            <span className="keyword">(display</span> <span className="string">"Wolf mode: ON"</span>)
                          </div>
                        </div>
                      )}
                      {album.hasCowOverlay && (
                        <div className="cow-overlay">
                          <div className="cow-face">🐄</div>
                          <div className="cow-message">BEEF IS MURDER!</div>
                          <div className="cow-subtitle">Moo-sic for change!</div>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-truncate" title={album.title}>{album.title}</h5>
                      <p className="card-text artist-name text-truncate" title={album.artist}>{album.artist}</p>
                      <p className="card-text">
                        <small className="text-muted">{album.year}</small>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">🚀 Quick Actions</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link to="/artist-search" className="action-card d-block p-4 h-100 text-decoration-none">
                <div className="text-center">
                  <div className="action-icon mb-3">🔍</div>
                  <h5>Search Artists</h5>
                  <p className="text-muted">Find albums by your favorite artists</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link to="/browse-by-year" className="action-card d-block p-4 h-100 text-decoration-none">
                <div className="text-center">
                  <div className="action-icon mb-3">📅</div>
                  <h5>Browse by Year</h5>
                  <p className="text-muted">Explore albums from different eras</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link to="/legacy" className="action-card d-block p-4 h-100 text-decoration-none">
                <div className="text-center">
                  <div className="action-icon mb-3">💿</div>
                  <h5>Legacy Collection</h5>
                  <p className="text-muted">Classic albums from the past</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;