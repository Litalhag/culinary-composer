import React from 'react'
import useUserForm from '../../hooks/useUserForm'
import UserForm from '../../components/userForm/UserForm'

import './login.css'

const Login = () => {
  const { handleChange, handleSubmit, formDataLog } = useUserForm('login')

  return (
    <section className="form-container">
      <h2>Log In</h2>
      <UserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        btnText="Log In"
        formData={formDataLog}
      />
    </section>
  )
}

export default Login
