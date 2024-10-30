import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const UserManagement = () => {
    const { authToken } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (authToken) {
            fetchUsers();
        }
    }, [authToken]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log(response.data); // Log the response data to confirm dates
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/deleteUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const editUser = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/admin/editUser/${currentUserId}`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setUsers(users.map((user) => (user._id === currentUserId ? response.data : user)));
            resetForm();
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const resetForm = () => {
        setEmail('');
        setEditMode(false);
        setCurrentUserId(null);
        setShowForm(false);
    };




    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Users</h1>

                {/* Users Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                {/* <th className="px-6 py-4 font-semibold">Role</th> */}
                                <th className="px-6 py-4 font-semibold">Created At</th>
                                <th className="px-6 py-4 font-semibold">Last Updated</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {user.updatedAt
                                            ? new Date(user.updatedAt).toLocaleDateString()
                                            : new Date(user.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditMode(true);
                                                setCurrentUserId(user._id);
                                                setEmail(user.email);
                                                setShowForm(true); // Show form for editing
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user._id)}
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

                {/* Conditional Form Rendering for Editing User */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                        <input
                            type="email"
                            placeholder="User Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={editUser}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
