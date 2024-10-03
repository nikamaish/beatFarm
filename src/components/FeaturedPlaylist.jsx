import React from 'react';

const featuredPlaylists = [
  { id: 1, name: 'Liked Songs', image: 'assets/liked.jpeg' },
  { id: 2, name: 'Ed Sheeran', image: 'assets/edSheeran.jpeg' },
  { id: 3, name: 'Charlie Puth', image: 'assets/charliePuth.jpeg' },
  { id: 4, name: 'Karan Aujla', image: 'assets/karanAujla.jpeg' },
  { id: 5, name: 'Arijit Singh', image: 'assets/arijitSingh.jpeg' },
  { id: 6, name: 'Atif Aslam', image: 'assets/atifAslam.jpeg' },
];

const FeaturedPlaylist = () => {
  return (
    <div className="w-78 rounded-lg bg-gray-900 text-white p-4 h-full flex flex-col pt-5 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Library</h2>
        <button className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          +
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-semibold mb-4">Featured Playlist</h3>
        <ul>
          {featuredPlaylists.map((playlist) => (
            <li key={playlist.id} className="flex items-center mb-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <span className="text-sm">{playlist.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedPlaylist;
