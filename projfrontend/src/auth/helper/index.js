import { API } from "../../backend"

// setup signup
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

// setup signin
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

// setup the JWT token in the browser
export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("JWT", JSON.stringify(data));
        next();
    }
}

// setup signout
export const signout = next => {
    if (typeof window !== undefined) {
        localStorage.removeItem("JWT")
        next();
        // once the jwt token is removed let's return the api and hit the fetch api of signout
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
};

// validate if the user is authenticated: with this we will get the user data in the brower itself
export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    if (localStorage.getItem("JWT")) {
        return JSON.parse(localStorage.getItem("JWT"))
    }else{
        return false
    }
};



