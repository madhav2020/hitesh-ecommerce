import React from 'react'
import Navbar from './Navbar'

const Base = (
    {   title = "My Title",
        description = "My Description",
        className = "text-white p-4",
        children }
) => {

    return (
        <>
        <Navbar />
            <div className="container-fluid">
                <div className=" text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto-py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any question feel free to reach out to us</h4>
                    <button className="btn btn-warning btn-lg ">CONTACT US</button>
                </div>
                <div className="container text-center">
                    <span className="text-muted ">An amazing <span className="text-white">MERN</span> Bootcamp</span>
                </div>
            </footer>
        </>
    )
}

export default Base