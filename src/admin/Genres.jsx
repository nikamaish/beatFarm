import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const Genres = () => {
    const { authToken } = useContext(AuthContext);
    const [genres, setGenres] = useState([]);
    const [name, setName] = useState('');
    const [numberOfArtists, setNumberOfArtists] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentGenreId, setCurrentGenreId] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Fetch all genres on component mount
    useEffect(() => {
        if (authToken) {
            fetchGenres();
        }
    }, [authToken]);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/getAllGenres', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const addGenre = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/admin/createGenres',
                { name, numberOfArtists },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setGenres([...genres, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };

    const deleteGenre = async (genreId) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/deleteGenres/${genreId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setGenres(genres.filter((genre) => genre._id !== genreId));
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    const editGenre = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/admin/editGenres/${currentGenreId}`,
                { name, numberOfArtists },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setGenres(genres.map((genre) => (genre._id === currentGenreId ? response.data : genre)));
            resetForm();
        } catch (error) {
            console.error('Error editing genre:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setNumberOfArtists(0);
        setEditMode(false);
        setCurrentGenreId(null);
        setShowForm(false); // Hide form after adding/editing
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Genres</h1>

                {/* Add Genre button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true); // Show form when Add Genre button is clicked
                        }}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Add Genre
                    </button>
                </div>

                {/* Conditional Form Rendering */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Genre' : 'Add New Genre'}</h2>
                        <input
                            type="text"
                            placeholder="Genre Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Number of Artists"
                            value={numberOfArtists}
                            onChange={(e) => setNumberOfArtists(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <div className="flex space-x-4">
                            {editMode ? (
                                <button
                                    onClick={editGenre}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                >
                                    Save Changes
                                </button>
                            ) : (
                                <button
                                    onClick={addGenre}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                                >
                                    Save Genre
                                </button>
                            )}
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Genres Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Number of Artists</th>
                                <th className="px-6 py-4 font-semibold">Last Updated</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {genres.map((genre) => (
                                <tr key={genre._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-700">{genre.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{genre.numberOfArtists}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(genre.lastUpdated).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditMode(true);
                                                setCurrentGenreId(genre._id);
                                                setName(genre.name);
                                                setNumberOfArtists(genre.numberOfArtists);
                                                setShowForm(true); // Show form for editing
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteGenre(genre._id)}
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

export default Genres;
