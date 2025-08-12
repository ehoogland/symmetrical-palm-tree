const ALBUMSDATA = [
  {
    id: 0,
    title: "Mezzanine",
    artist: "Massive Attack",
    year: 1998,
    cover: "https://upload.wikimedia.org/wikipedia/en/3/3d/Massive_Attack_-_Mezzanine.png",
  },
  {
    id: 1,
    title: "The Ruminant Band",
    artist: "Fruit Bats",
    year: 2009,
    cover: "https://f4.bcbits.com/img/a2855786650_10.jpg",
    hasCowOverlay: true,
  },
  {
    id: 2,
    title: "The Brand",
    artist: "Tats",
    year: 2025,
    cover: "https://picsum.photos/300/300?random=3&tech",
  },
  {
    id: 3,
    title: "The Schemer, or 'Wolf in Sheep's Clothing'",
    artist: "Brandon JS Eich, aka 'Ike Cube'",
    year: 1997,
    cover: "https://picsum.photos/300/300?random=4&tech",
    hasCodeOverlay: true,
  },
];

// Storage key for localStorage
const STORAGE_KEY = 'albumsData';

// Load albums from localStorage or return default data
const loadAlbumsFromStorage = () => {
  try {
    const storedAlbums = localStorage.getItem(STORAGE_KEY);
    if (storedAlbums) {
      return JSON.parse(storedAlbums);
    }
  } catch (error) {
    console.error('Error loading albums from localStorage:', error);
  }
  return ALBUMSDATA;
};

// Save albums to localStorage
const saveAlbumsToStorage = (albums) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
  } catch (error) {
    console.error('Error saving albums to localStorage:', error);
  }
};

// Check for duplicates using Set (case-insensitive title + artist comparison)
const createAlbumKey = (album) => {
  return `${album.title.toLowerCase().trim()}-${album.artist.toLowerCase().trim()}`;
};

const isDuplicateAlbum = (newAlbum, existingAlbums) => {
  const newKey = createAlbumKey(newAlbum);
  const existingKeys = new Set(existingAlbums.map(album => createAlbumKey(album)));
  return existingKeys.has(newKey);
};

// Get albums data (loads from localStorage)
export const getAlbumsData = () => {
  return loadAlbumsFromStorage();
};

// Add a new album with duplicate checking
export const addAlbum = (newAlbum, existingAlbums) => {
  // Check for duplicates
  if (isDuplicateAlbum(newAlbum, existingAlbums)) {
    throw new Error(`Duplicate album: "${newAlbum.title}" by ${newAlbum.artist} already exists`);
  }

  // Generate new ID (highest existing ID + 1)
  const maxId = existingAlbums.length > 0 ? Math.max(...existingAlbums.map(album => album.id)) : -1;
  const albumWithId = {
    ...newAlbum,
    id: maxId + 1
  };

  // Create new albums array
  const updatedAlbums = [...existingAlbums, albumWithId];
  
  // Save to localStorage
  saveAlbumsToStorage(updatedAlbums);
  
  return updatedAlbums;
};

// Reset albums to default data
export const resetAlbumsData = () => {
  saveAlbumsToStorage(ALBUMSDATA);
  return ALBUMSDATA;
};