import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Base from '../core/Base'


const Signin = () => {
    // set the value using useState
    const [values, setValues] = useState({
        email: "madhav1@email.com",
        password: "Madhav1",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    // handle onchange event for the signin form
    const handleOnchange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    // handle the on Submit when user hit the singin
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        });
                    });
                }
            })
            .catch(console.log("signin request failed"));
    };

    // perform redirect for user and admin afte they hit the submit button
    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    // custom suceesMessage
    const loadingMessageAlert = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    // custom error Message
    const errorMessageAlert = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alerr alert-danger p-2" style={{ display: error ? "" : "none" }}> {error}</div>
                </div>
            </div>
        );
    };



    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label htmlFor="" className="text-light">Email</label>
                            <input type="email" className="form-control" value={email} onChange={handleOnchange("email")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-light">Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleOnchange("password")} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success col-12 my-3">Signin</button>
                    </form>
                </div>
            </div>
        );
    };
    return (
        <>
            <Base title='Signin Page' description='A page for the user to signin'>
                <h2 className='text-center'>We are on the signin page!</h2>
                {loadingMessageAlert()}
                {errorMessageAlert()}
                {signInForm()}
                {performRedirect()}
                <p className='text-center text-white'>{JSON.stringify(values)}</p>
            </Base>
        </>
    );
};

export default Signin