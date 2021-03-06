import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper/index';
import Base from '../core/Base'

const Signup = () => {

    // useStates function
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault(); // prevent the default form even
        setValues({ ...values, error: false }); //set the intial form value as norm form data (... means load the form data)
        signup({ name, email, password }) //run the signup function which takes user value and pass the user value
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    // after the form is sumbited again set the form data to the normal state or empty
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(console.log("Error in Signup"));
    };

    // form input function which return the simple form 
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")} type="text" value={name} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success col-12 my-3">Sumbit</button>
                    </form>
                </div>
            </div>
        );
    };

    // custom suceesMessage
    const successMessageAlert = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alerr alert-success p-2" style={{display: success ? "" : "none"}}>
                        You are successfull signup please <Link to="/signin">Login</Link> here
                    </div>
                </div>
            </div>
        );
    };

    // custom error Message
    const errorMessageAlert = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alerr alert-danger p-2" style={{display: error ? "" : "none"}}> {error}</div>
                </div>
            </div>
        );
    };


    return (
        <>
            <Base title='Signup Page' description='A page for the user to signup' >
                <h2 className='text-center'>We are in the signup page now!</h2>
                {successMessageAlert()}
                {errorMessageAlert()}
                {signUpForm()}
                <p className='text-center text-white'>{JSON.stringify(values)}</p>
            </Base>
        </>
    );
};

export default Signup