import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetAlbumsData } from './albumsSlice';

const AddAlbum = ({ albumsData, onAddAlbum, onResetData }) => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        year: '',
        cover: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Album title is required';
        }
        
        if (!formData.artist.trim()) {
            newErrors.artist = 'Artist name is required';
        }
        
        if (!formData.year.trim()) {
            newErrors.year = 'Year is required';
        } else {
            const year = parseInt(formData.year);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 1900 || year > currentYear + 5) {
                newErrors.year = `Year must be between 1900 and ${currentYear + 5}`;
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const newAlbum = {
            title: formData.title.trim(),
            artist: formData.artist.trim(),
            year: parseInt(formData.year),
            cover: formData.cover.trim() || `https://picsum.photos/300/300?random=${Date.now()}`
        };

        // Call the parent function to add the album
        if (onAddAlbum) {
            const result = onAddAlbum(newAlbum);
            
            if (result.success) {
                // Reset form and show success message
                setFormData({ title: '', artist: '', year: '', cover: '' });
                setShowSuccess(true);
                setShowError('');
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                // Show error message for duplicates
                setShowError(result.error);
                setShowSuccess(false);
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    setShowError('');
                }, 5000);
            }
        }
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '5px'
    };

    const errorStyle = {
        color: '#dc3545',
        fontSize: '14px',
        marginBottom: '10px'
    };

    return (
        <div>
            <h1>Add New Album</h1>
            <p>Add a new album to your collection</p>

            {showSuccess && (
                <div className="alert-success-custom">
                    <strong>Success!</strong> Album added successfully!
                </div>
            )}

            {showError && (
                <div className="alert-danger-custom">
                    <strong>Error!</strong> {showError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label fw-bold">
                        Album Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-control form-control-custom"
                        placeholder="Enter album title"
                    />
                    {errors.title && <div className="text-danger mt-1">{errors.title}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="artist" className="form-label fw-bold">
                        Artist *
                    </label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        className="form-control form-control-custom"
                        placeholder="Enter artist name"
                    />
                    {errors.artist && <div className="text-danger mt-1">{errors.artist}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="year" className="form-label fw-bold">
                        Year *
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="form-control form-control-custom"
                        placeholder="Enter release year"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                    />
                    {errors.year && <div className="text-danger mt-1">{errors.year}</div>}
                </div>

                <div className="col-12">
                    <label htmlFor="cover" className="form-label fw-bold">
                        Album Cover URL <span className="text-muted">(optional)</span>
                    </label>
                    <input
                        type="url"
                        id="cover"
                        name="cover"
                        value={formData.cover}
                        onChange={handleInputChange}
                        className="form-control form-control-custom"
                        placeholder="Enter album cover image URL (leave blank for auto-generated cover)"
                    />
                    <div className="form-text">
                        If left blank, a random placeholder image will be generated automatically.
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="d-flex flex-column flex-sm-row gap-3">
                        <button
                            type="submit"
                            className="btn btn-primary-custom"
                        >
                            Add Album
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormData({ title: '', artist: '', year: '', cover: '' })}
                            className="btn btn-secondary-custom"
                        >
                            Clear Form
                        </button>
                    </div>
                </div>
            </form>

            {onResetData && (
                <div className="mt-4 pt-4 border-top">
                    <h5>Danger Zone</h5>
                    <p className="text-muted">This will remove all added albums and restore original data.</p>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm('This will reset all albums to the original data. Are you sure?')) {
                                onResetData();
                            }
                        }}
                        className="btn btn-danger-custom"
                    >
                        Reset to Default Albums
                    </button>
                </div>
            )}

            <div className="mt-4">
                <Link to="/albums" className="nav-link d-inline-block">← Back to all albums</Link>
            </div>
        </div>
    );
};

export default AddAlbum;
