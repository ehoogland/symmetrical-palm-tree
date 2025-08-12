import { Link } from "react-router-dom";

const AlbumsList = ({ albumsData }) => {
  return (
    <div>
      <h1>Albums</h1>
      <p className="text-muted mb-4">Browse through your album collection</p>
      
      <div className="row g-4">
        {albumsData.map((album) => (
          <div key={album.id} className="col-sm-6 col-md-4 col-lg-3">
            <Link to={`/albums/${album.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm album-card">
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
                        <span className="comment">;; The Schemer's Lambda Calculus</span><br/>
                        <span className="keyword">(define</span> <span className="function">scheme-power</span><br/>
                        &nbsp;&nbsp;<span className="keyword">(lambda</span> (n)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">(if</span> (&lt; n 2)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(* n (scheme-power (- n 1))))))
                      </div>
                      <div className="code-block">
                        <span className="comment">;; Wolf in sheep's clothing</span><br/>
                        <span className="keyword">(define</span> <span className="function">deception</span><br/>
                        &nbsp;&nbsp;<span className="string">"Truth wrapped in lies"</span>)
                      </div>
                      <div className="code-block">
                        <span className="keyword">(display</span> <span className="string">"1997: The year Scheme ruled"</span>)
                      </div>
                    </div>
                  )}
                  {album.hasCowOverlay && (
                    <div className="cow-overlay">
                      <div className="cow-face">🐄</div>
                      <div className="cow-message">BEEF IS MURDER!</div>
                      <div className="cow-subtitle">- The Ruminant Resistance</div>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title text-truncate" title={album.title}>
                    {album.title}
                  </h5>
                  <p className="card-text artist-name text-truncate" title={album.artist}>
                    {album.artist}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{album.year}</small>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {albumsData.length === 0 && (
        <div className="text-center py-5">
          <h3>No albums found</h3>
          <p className="text-muted">Add some albums to your collection!</p>
          <Link to="/add-album" className="btn btn-primary-custom">
            Add Your First Album
          </Link>
        </div>
      )}
    </div>
  );
};

export default AlbumsList;