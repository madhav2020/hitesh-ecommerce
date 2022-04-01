import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getAllCategory } from './helper/adminapicall';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategory().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data)
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])


  return (
    <>
      <Base title="Welcome admin" description="Manage category here">
        <h2 className="mb-4">All Categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total 5 Categories</h2>
            {categories ? (
              <div className="row">
                {categories.length > 0 && categories.map((category, index) => {
                  return (
                    <div key={index} className="row text-center mb-2 ">
                      <div className="col-4">
                        <h3 className="text-white text-left">{category.name}</h3>
                      </div>
                      <div className="col-4">
                        <Link
                          className="btn btn-success"
                          to={`/admin/product/update/productId`}
                        >
                          <span className="">Update</span>
                        </Link>
                      </div>
                      <div className="col-4">
                        <button onClick={() => { }} className="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : <>No categories data found</>
            }
          </div>
        </div>
      </Base>
    </>
  )
}

export default ManageCategories