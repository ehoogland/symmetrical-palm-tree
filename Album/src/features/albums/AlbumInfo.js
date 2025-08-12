import { useParams, Link } from 'react-router-dom';

const AlbumInfo = ({ albumsData }) => {
    const { albumId } = useParams();
    const album = albumsData.find((a) => a.id === parseInt(albumId));
    
    if (!album) {
        return (
            <div className="text-center py-5">
                <h1>Album Not Found</h1>
                <p className="text-muted">The album you're looking for doesn't exist.</p>
                <Link to="/albums" className="btn btn-primary-custom">
                    Back to Albums
                </Link>
            </div>
        );
    }
    
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-4 text-center mx-auto">
                    <div className="album-detail-cover" style={{ position: 'relative', display: 'inline-block' }}>
                        <img 
                            src={album.cover || `https://picsum.photos/400/400?random=${album.id}`} 
                            className="img-fluid rounded shadow-lg" 
                            alt={`${album.title} cover`}
                            onError={(e) => {
                                e.target.src = `https://picsum.photos/400/400?random=${album.id + 100}`;
                            }}
                        />
                        {album.hasCodeOverlay && (
                            <div className="album-detail-scheme-overlay">
                                <div className="code-block mb-2">
                                    <span className="comment">;; The Schemer's Manifesto - 1997</span><br/>
                                    <span className="keyword">(define</span> <span className="function">musical-revolution</span><br/>
                                    &nbsp;&nbsp;<span className="keyword">(lambda</span> (artist year)<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">(cond</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(&lt; year 1997) <span className="string">'pre-scheme-era</span>]<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[(= year 1997) <span className="string">'the-awakening</span>]<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[else <span className="string">'post-scheme-world</span>])))
                                </div>
                                <div className="code-block mb-2">
                                    <span className="comment">;; Wolf in sheep's clothing algorithm</span><br/>
                                    <span className="keyword">(define</span> <span className="function">hide-truth</span><br/>
                                    &nbsp;&nbsp;<span className="keyword">(lambda</span> (reality)<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">(let</span> ([disguise <span className="string">"innocent-melody"</span>])<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(append disguise reality))))
                                </div>
                                <div className="code-block mb-2">
                                    <span className="comment">;; The Schemer's recursive identity</span><br/>
                                    <span className="keyword">(define</span> <span className="function">ike-cube</span><br/>
                                    &nbsp;&nbsp;<span className="keyword">(cons</span> <span className="string">'brandon-js-eich</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ike-cube)))
                                </div>
                                <div className="code-block">
                                    <span className="keyword">(display</span> <span className="string">"Scheme: The language of musical truth"</span>)<br/>
                                    <span className="keyword">(newline)</span><br/>
                                    <span className="keyword">(display</span> <span className="string">"1997: When parentheses became beats"</span>)
                                </div>
                            </div>
                        )}
                        {album.hasCowOverlay && (
                            <div className="album-detail-cow-overlay">
                                <div className="detail-cow-face">🐄</div>
                                <div className="detail-cow-message">BEEF IS MURDER!</div>
                                <div className="detail-cow-subtitle">- The Ruminant Resistance Movement</div>
                                <div className="cow-manifesto">
                                    "We are the grass-eating revolutionaries<br/>
                                    Standing against the carnivorous oppression<br/>
                                    Moo-sic is our weapon of choice!"
                                </div>
                            </div>
                        )}
                        {album.hasCowOverlay && (
                            <div className="mt-3">
                                <div className="cow-vegan-banner">
                                    🌱 Go Vegan • Save the Cows<br/>
                                    Fruit Bats Forever 🌱
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="album-details">
                        <h1 className="album-title-detail">
                            {album.title === "The Ruminant Band" ? (
                                <div>
                                    THE RUMINANT<br/>
                                    <span style={{paddingLeft: '6em'}}>BAND</span>
                                </div>
                            ) : album.title}
                        </h1>
                        <h2 className="artist-name-detail">{album.artist}</h2>
                        <p className="year-detail">Released: <span className="fw-bold">{album.year}</span></p>
                        
                        <div className="mt-4">
                            <h4>Album Information</h4>
                            <div className="info-grid">
                                <div className="info-item">
                                    <strong>Title:</strong> {album.title}
                                </div>
                                <div className="info-item">
                                    <strong>Artist:</strong> {album.artist}
                                </div>
                                <div className="info-item">
                                    <strong>Year:</strong> {album.year}
                                </div>
                                <div className="info-item">
                                    <strong>Album ID:</strong> #{album.id}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <Link to="/albums" className="btn btn-secondary-custom me-3">
                                ← Back to Albums
                            </Link>
                            <Link to="/add-album" className="btn btn-primary-custom">
                                Add Another Album
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumInfo;