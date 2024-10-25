import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const Plans = () => {
    const { authToken } = useContext(AuthContext); // Get the token from AuthContext
    const [plans, setPlans] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentPlanId, setCurrentPlanId] = useState(null);
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    // Fetch all plans on component mount
    useEffect(() => {
        if (authToken) {
            fetchPlans();
        }
    }, [authToken]); // Only fetch if token is available

    const fetchPlans = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/getAllPlans', {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include token in headers
                },
            });
            setPlans(response.data.plans);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    const addPlan = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/admin/addPlan',
                { name, price },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include token in headers
                    },
                }
            );
            setPlans([...plans, response.data.plan]);
            resetForm();
        } catch (error) {
            console.error('Error adding plan:', error);
        }
    };

    const deletePlan = async (planId) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/deletePlan/${planId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include token in headers
                },
            });
            setPlans(plans.filter((plan) => plan._id !== planId));
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    const editPlan = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/admin/editPlan/${currentPlanId}`,
                { name, price },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include token in headers
                    },
                }
            );
            setPlans(plans.map((plan) => (plan._id === currentPlanId ? response.data.plan : plan)));
            resetForm();
        } catch (error) {
            console.error('Error editing plan:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setEditMode(false);
        setCurrentPlanId(null);
        setShowForm(false); // Hide form after adding/editing
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Subscription Plans</h1>

                {/* Add Plan button */}
                {!showForm && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Add Plan
                        </button>
                    </div>
                )}

                {/* Conditional Form Rendering */}
                {showForm && (
                    <div className="mb-6 p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Plan' : 'Add New Plan'}</h2>
                        <input
                            type="text"
                            placeholder="Plan Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border p-3 mb-3 w-full rounded-lg"
                        />
                        <div className="flex space-x-4">
                            {editMode ? (
                                <button onClick={editPlan} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                                    Save Changes
                                </button>
                            ) : (
                                <button onClick={addPlan} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                                    Save Plan
                                </button>
                            )}
                            <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Plans Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Created</th>
                                <th className="px-6 py-4 font-semibold">Last Updated</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {plans.map((plan) => (
                                <tr key={plan._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-700">
                                        {plan.name}
                                        <div className="text-gray-500">${plan.price}</div> {/* Price displayed below name */}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(plan.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(plan.lastUpdated).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditMode(true);
                                                setCurrentPlanId(plan._id);
                                                setName(plan.name);
                                                setPrice(plan.price);
                                                setShowForm(true);
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deletePlan(plan._id)}
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

export default Plans;
