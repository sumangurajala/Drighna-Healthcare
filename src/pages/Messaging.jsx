import React, { useState } from 'react';
import './Messagings.css';

const Messaging = () => {
    const [notices, setNotices] = useState([
        'Free Blood Sugar Campaign',
        'Staff Notice',
        'new joinee'
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setEditText(notices[index]);
    };

    const handleEditChange = (e) => {
        setEditText(e.target.value);
    };

    const handleEditConfirm = () => {
        const updatedNotices = [...notices];
        updatedNotices[editIndex] = editText;
        setNotices(updatedNotices);
        setIsEditing(false);
        setEditIndex(null);
        setEditText('');
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this notice?');
        if (confirmDelete) {
            setNotices(notices.filter((_, i) => i !== index));
        }
    };

    const handlePostNewMessage = () => {
        alert('Post new message functionality is triggered');
    };

    const handleSendSMS = () => {
        alert('Send SMS functionality is triggered');
    };

    const handleSendEmail = () => {
        alert('Send Email functionality is triggered');
    };

    return (
        <div className="notice-board-container">
            <div className="notice-board-header">
                <h2>Notice Board</h2>
                <div className="notice-board-buttons">
                    <button className="button" onClick={handlePostNewMessage}>Post New Message</button>
                    <button className="button" onClick={handleSendSMS}>Send SMS</button>
                    <button className="button" onClick={handleSendEmail}>Send Email</button>
                </div>
            </div>
            <div className="notices-list">
                {notices.map((notice, index) => (
                    <div key={index} className="notice-item">
                        <span className="notice-text">{notice}</span>
                        <button className="icon-button" onClick={() => handleEdit(index)}>✏️</button>
                        <button className="icon-button" onClick={() => handleDelete(index)}>🗑️</button>
                    </div>
                ))}
            </div>

            {isEditing && (
                <div className="edit-modal">
                    <h3>Edit Notice</h3>
                    <input
                        type="text"
                        value={editText}
                        onChange={handleEditChange}
                        className="edit-input"
                    />
                    <button className="button" onClick={handleEditConfirm}>Confirm</button>
                    <button className="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Messaging;

