import React from 'react'
import './userInput.css'

const UserInput = ({ label, type, name, value, error, handleChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} value={value} onChange={handleChange} />
            <div className="error-message">{error}</div>
        </div>
    )
}

export default UserInput