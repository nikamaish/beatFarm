import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const SongUpload = () => {
    const { authToken } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > 20 * 1024 * 1024) {
            setMessage('File size exceeds 20MB limit.');
            setFile(null);
            return;
        }
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !genre || !file) {
            setMessage('Please fill out all fields and upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('file', file);

        try {
            setLoading(true);
            setMessage(null);

            const response = await axios.post('http://localhost:8000/api/artists/upload', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message || 'Song uploaded successfully!');
            resetForm();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error uploading song. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setGenre('');
        setFile(null);
    };

    return (
        <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl text-center font-semibold mb-4">Upload a New Song</h2>
            {message && <p className="mb-4 text-center text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm py-2 px-3"
                        placeholder="Song Title" // Using placeholder for guidance
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm py-2 px-3"
                        placeholder="Genre" // Using placeholder for guidance
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Upload Song File (MP3/WAV, max 20MB)
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept=".mp3, .wav"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
                >
                    {loading ? 'Uploading...' : 'Upload Song'}
                </button>
            </form>
        </div>
    );
};

export default SongUpload;
