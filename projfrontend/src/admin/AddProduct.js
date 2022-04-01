import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getAllCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: "",
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: "",
    formData: "",
    success: false
  });

  // destructure the values data
  const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, getRedirect, formData, success } = values;

  // set the preloaded data(mainly category)
  const preload = () => {
    getAllCategory()
      .then(data => {
        // console.log("CATEGORY DATA:", data)
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({ ...values, categories: data.category, formData: new FormData() })
        }
      })
  }

  useEffect(() => {
    preload();
  }, [])


  // function to handle the submit button 
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true })
    createProduct(user._id, token, formData)
      .then(data => {
        console.log(data)
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
            success: true
          })
        }
      })
  };
  
  // success message function
  const successMessage = () => (
    <div className="alert alert-success mt-3" style={{ display: success ? "" : "none" }}>
      <h4>{createdProduct} Created Successfully!</h4>
    </div>
  );    

  // function to handle the form data
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.set(name, value);
    setValues({ ...values, [name]: value })
  };

  // function to create the product form
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group mb-2" >
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control mb-2"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control mb-2"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control mb-2"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((category, index) => {
              return <option key={index} value={category._id}>{category.name}</option>
            })
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control  "
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-2"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4 mb-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
