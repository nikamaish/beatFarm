import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const ArtistManagement = () => {
    const { authToken } = useContext(AuthContext);
    const [artists, setArtists] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentArtistId, setCurrentArtistId] = useState(null);
    const [artistName, setArtistName] = useState('');
    const [bio, setBio] = useState('');
    const [showForm, setShowForm] = useState(false);

    // Fetch all artists on component mount
    useEffect(() => {
        if (authToken) {
            fetchArtists();
        }
    }, [authToken]);

    const fetchArtists = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/getAllArtists', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setArtists(response.data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const editArtist = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/admin/editArtist/${currentArtistId}`,
                { artistName, bio },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setArtists(artists.map((artist) => (artist._id === currentArtistId ? response.data : artist)));
            resetForm();
        } catch (error) {
            console.error('Error editing artist:', error);
        }
    };

    const deleteArtist = async (artistId) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/deleteArtist/${artistId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setArtists(artists.filter((artist) => artist._id !== artistId));
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    };

    const resetForm = () => {
        setArtistName('');
        setBio('');
        setEditMode(false);
        setCurrentArtistId(null);
        setShowForm(false); // Hide form after editing
    };

    return (
        <div className="flex bg-gray-100">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1 p-6">
                {/* Conditional Form Rendering */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Artist' : 'Add New Artist'}</h2>
                        <input
                            type="text"
                            placeholder="Artist Name"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <textarea
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <div className="flex space-x-4">
                            {editMode ? (
                                <button
                                    onClick={editArtist}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    Save Changes
                                </button>
                            ) : null}
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Artists Table */}
                <div className="bg-white shadow-md mt-16 rounded-lg overflow-hidden">
                    <table className="min-w-full  text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Artist Name</th>
                                <th className="px-6 py-4 font-semibold">Bio</th>
                                <th className="px-6 py-4 font-semibold">Created At</th>
                                <th className="px-6 py-4 font-semibold">Updated At</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {artists.map((artist) => (
                                <tr key={artist._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-700">{artist.artistName}</td>
                                    <td className="px-6 py-4 text-gray-500">{artist.bio}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(artist.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(artist.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditMode(true);
                                                setCurrentArtistId(artist._id);
                                                setArtistName(artist.artistName);
                                                setBio(artist.bio);
                                                setShowForm(true); // Show form for editing
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteArtist(artist._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ArtistManagement;
