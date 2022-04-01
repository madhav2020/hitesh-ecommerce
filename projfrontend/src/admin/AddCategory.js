import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState(""); //here the name means the name of category as we set in our backend model
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticated();

  // function to handle the onchange in the input field
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  // function to handle the ONsubmit when form is submitted
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // backend request fired
    createCategory(user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(true)
        } else {
          setError("")
          setSuccess(true)
          setName("")
        }
      })
  }
  // Add category form
  const addCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input type="text" onChange={handleChange} value={name} className='form-control my-3' autoFocus required placeholder='Form Ex. Summer' />
          <button onClick={onSubmit} className="btn btn-outline-info mb-3">Create Category</button>
        </div>
      </form>
    )
  }

  // set success message
  const successMessage = () =>{
    if (success) {
      return <h4 className="text-success text-center mt-2">Category Created Successfully!</h4>
    }
  }
  // set warning message
  const warningMessage = () =>{
    if (error) {
      return <h4 className="text-warning text-center mt-2">Failed to Create Category!</h4>
    }
  }

  // back button funciton
  const goBack = () => {
    return (
      <div className="mt-2">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard"> Admin Home </Link>
      </div>
    )
  }

  return (
    <>
      <Base title='Add Category' description=' In this page you can Add the category' className='container bg-info p-4' >
        <div className="row bg-white rouded">
          {successMessage()}
          {warningMessage()}
          <div className="col-md-8 offset-md-2">
            {addCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Base>
    </>
  )
}

export default AddCategory