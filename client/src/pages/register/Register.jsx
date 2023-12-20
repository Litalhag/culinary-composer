import React from 'react'
import useUserForm from '../../hooks/useUserForm'
import UserForm from '../../components/userForm/UserForm'

const Register = () => {
  const { handleChange, handleSubmit, formDataReg } = useUserForm()

  return (
    <section className="form-container">
      <h2>Registration</h2>
      <UserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        btnText="Join"
        formData={formDataReg}
      />
    </section>
  )
}

export default Register
