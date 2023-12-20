import React from 'react'
import UserInput from "../userInput/UserInput"
import './userForm.css'
const UserForm = ({ handleSubmit, handleChange, btnText, formData }) => {
    return (
        <form onSubmit={handleSubmit}>
            {formData.map(data => {
                return <UserInput key={data.id} {...data} handleChange={handleChange} />
            })}
            <button className="btn update-btn" type="submit">{btnText}</button>
        </form>
    )
}

export default UserForm