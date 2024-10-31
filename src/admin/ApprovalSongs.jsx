import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const ApprovalSongs = () => {
    const { authToken } = useContext(AuthContext);
    const [songs, setSongs] = useState([]);

    // Fetch all songs on component mount
    useEffect(() => {
        if (authToken) {
            fetchSongs();
        }
    }, [authToken]);

    // Fetch all songs function
    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/getsongs', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setSongs(response.data); // Assumes response.data is an array of song objects
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    // Approve song
    const approveSong = async (songId) => {
        try {
            await axios.put(
                `http://localhost:8000/api/admin/status/${songId}`,
                { action: 'approve' },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            fetchSongs(); // Refresh song list after approval
        } catch (error) {
            console.error('Error approving song:', error);
        }
    };

    // Reject song with an optional reason
    const rejectSong = async (songId) => {
        const rejectedReason = prompt('Enter reason for rejection (optional):');
        try {
            await axios.put(
                `http://localhost:8000/api/admin/status/${songId}`,
                { action: 'reject', rejectedReason },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            fetchSongs(); // Refresh song list after rejection
        } catch (error) {
            console.error('Error rejecting song:', error);
        }
    };

    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Songs</h1>

                {/* Songs Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Genre</th>
                                <th className="px-6 py-4 font-semibold">Artist</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {songs.map((song) => (
                                <tr key={song._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-700">{song.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{song.genre}</td>
                                    <td className="px-6 py-4 text-gray-500">{song.artist.name}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {song.status === 'approved' ? (
                                            <span className="text-green-600 font-semibold">Approved</span>
                                        ) : song.status === 'rejected' ? (
                                            <span className="text-red-600 font-semibold">Rejected</span>
                                        ) : (
                                            <span className="text-yellow-600 font-semibold">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        {song.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => approveSong(song._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-md shadow hover:bg-green-600 transition duration-300"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectSong(song._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition duration-300"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
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

export default ApprovalSongs;
