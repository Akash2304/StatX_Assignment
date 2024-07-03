import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import './App.css'; // Import the CSS file

const App = () => {
    const [data, setData] = useState([]);
    const [newRecord, setNewRecord] = useState({
        id: '',
        quantity: '',
        amount: '',
        postingYear: new Date().getFullYear(),
        postingMonth: new Date().toLocaleString('default', { month: 'long' }),
        actionType: 'Type1',
        actionNumber: '',
        actionName: 'Action1',
        status: 'Pending',
        Impact: 'Low'
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/data');
        setData(response.data);
    };

    const handleInputChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };

    const handleNewRecordChange = (field, value) => {
        setNewRecord({ ...newRecord, [field]: value });
    };

    const saveUpdates = async () => {
        await axios.post('http://localhost:5000/update', data);
        fetchData();
    };

    const addRecord = async () => {
        await axios.post('http://localhost:5000/add', newRecord);
        setNewRecord({
            id: '',
            quantity: '',
            amount: '',
            postingYear: new Date().getFullYear(),
            postingMonth: new Date().toLocaleString('default', { month: 'long' }),
            actionType: 'Type1',
            actionNumber: '',
            actionName: 'Action1',
            status: 'Pending',
            Impact: 'Low'
        });
        fetchData();
    };

    if (!isLoggedIn) {
        return <Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />;
    }

    return (
        <div className="container">
            <h1>Data Table</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Posting Year</th>
                        <th>Posting Month</th>
                        <th>Action Type</th>
                        <th>Action Number</th>
                        <th>Action Name</th>
                        <th>Status</th>
                        <th>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.quantity}</td>
                            <td>
                                <input
                                    type="number"
                                    value={row.amount}
                                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                />
                            </td>
                            <td>{row.postingYear}</td>
                            <td>{row.postingMonth}</td>
                            <td>
                                <select
                                    value={row.actionType}
                                    onChange={(e) => handleInputChange(index, 'actionType', e.target.value)}
                                >
                                    <option value="Type1">Type1</option>
                                    <option value="Type2">Type2</option>
                                    <option value="Type3">Type3</option>
                                </select>
                            </td>
                            <td>{row.actionNumber}</td>
                            <td>
                                <select
                                    value={row.actionName}
                                    onChange={(e) => handleInputChange(index, 'actionName', e.target.value)}
                                >
                                    <option value="Action1">Action1</option>
                                    <option value="Action2">Action2</option>
                                    <option value="Action3">Action3</option>
                                </select>
                            </td>
                            <td>
                                {isAdmin ? (
                                    <select
                                        value={row.status}
                                        onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Approved">Approved</option>
                                    </select>
                                ) : (
                                    row.status
                                )}
                            </td>
                            <td>{row.Impact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="save-button" onClick={saveUpdates}>Save</button>

            <h2>Add New Record</h2>
            <form className="add-form" onSubmit={(e) => { e.preventDefault(); addRecord(); }}>
                <input
                    type="text"
                    placeholder="ID"
                    value={newRecord.id}
                    onChange={(e) => handleNewRecordChange('id', e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newRecord.quantity}
                    onChange={(e) => handleNewRecordChange('quantity', e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newRecord.amount}
                    onChange={(e) => handleNewRecordChange('amount', e.target.value)}
                    required
                />
                <select
                    value={newRecord.actionType}
                    onChange={(e) => handleNewRecordChange('actionType', e.target.value)}
                    required
                >
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                    <option value="Type3">Type3</option>
                </select>
                <select
                    value={newRecord.actionName}
                    onChange={(e) => handleNewRecordChange('actionName', e.target.value)}
                    required
                >
                    <option value="Action1">Action1</option>
                    <option value="Action2">Action2</option>
                    <option value="Action3">Action3</option>
                </select>
                <input
                    type="text"
                    placeholder="Action Number"
                    value={newRecord.actionNumber}
                    onChange={(e) => handleNewRecordChange('actionNumber', e.target.value)}
                    required
                />
                <select
                    value={newRecord.Impact}
                    onChange={(e) => handleNewRecordChange('Impact', e.target.value)}
                    required
                >
                    <option value="Low">Low</option>
                    <option value="Mid">Mid</option>
                    <option value="High">High</option>
                </select>
                <button className="add-button" type="submit">Add Record</button>
            </form>
        </div>
    );
};

export default App;
