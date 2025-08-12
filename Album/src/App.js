import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import AlbumsList from './features/albums/AlbumsList';
import AlbumInfo from './features/albums/AlbumInfo';
import AlbumsByYear from './features/albums/AlbumsByYear';
import AlbumsByYearDropdown from './features/albums/AlbumsByYearDropdown';
import RandomAlbum from './features/albums/RandomAlbum';
import LegacyAlbums from './features/albums/LegacyAlbums';
import ArtistSearch from './features/albums/ArtistSearch';
import AlbumSearch from './features/albums/AlbumSearch';
import AddAlbum from './features/albums/AddAlbum';
import Home from './Home';
import { getAlbumsData, addAlbum, resetAlbumsData } from './features/albums/albumsSlice';
import './styles.css';

const App = () => {
    // Use state to manage albums data so we can add new albums
    const [albumsData, setAlbumsData] = useState(getAlbumsData());

    // Function to add a new album with duplicate checking
    const handleAddAlbum = (newAlbum) => {
        try {
            const updatedAlbums = addAlbum(newAlbum, albumsData);
            setAlbumsData(updatedAlbums);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Function to reset albums to default data
    const handleResetData = () => {
        const defaultAlbums = resetAlbumsData();
        setAlbumsData(defaultAlbums);
    };

    return (
        <div className="App">
            <nav className="nav-container">
                <div className="container">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/albums" className="nav-link">Albums</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add-album" className="nav-link">Add Album</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/random" className="nav-link">Random</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/legacy" className="nav-link">Legacy Albums</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/artist-search" className="nav-link">Artist Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/album-search" className="nav-link">Album Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/browse-by-year" className="nav-link">Browse by Year</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div className="container">
                <div className="content-container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/albums"
                            element={<AlbumsList albumsData={albumsData} />}
                        />
                        <Route
                            path="/add-album"
                            element={<AddAlbum albumsData={albumsData} onAddAlbum={handleAddAlbum} onResetData={handleResetData} />}
                        />
                        <Route
                            path="/random"
                            element={<RandomAlbum albumsData={albumsData} />}
                        />
                        <Route
                            path="/legacy"
                            element={<LegacyAlbums albumsData={albumsData} />}
                        />
                        <Route
                            path="/artist-search"
                            element={<ArtistSearch albumsData={albumsData} />}
                        />
                        <Route
                            path="/album-search"
                            element={<AlbumSearch albumsData={albumsData} />}
                        />
                        <Route
                            path="/browse-by-year"
                            element={<AlbumsByYearDropdown albumsData={albumsData} />}
                        />
                        <Route
                            path="/albums/year/:year"
                            element={<AlbumsByYear albumsData={albumsData} />}
                        />
                        <Route
                            path="/albums/:albumId"
                            element={<AlbumInfo albumsData={albumsData} />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;