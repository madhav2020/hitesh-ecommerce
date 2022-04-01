import React from 'react'
import "../styles.css"
import { API } from "../backend"
import Base from './Base';

const Home = () => {
    // console.log("API IS", API);
    return (
        <>
            <Base title='Home Page'>
                <div className="row">
                    <div className="col-4">
                        <button className="btn btn-danger">Colum 1 btn</button>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-danger">Colum 2 btn</button>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-danger">Colum 3 btn</button>
                    </div>
                </div>
            </Base>
        </>
    )
}

export default Home