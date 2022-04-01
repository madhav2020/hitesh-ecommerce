import { API } from "../../backend";


// Category API calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error))
};

// get all category
export const getAllCategory = () => {
    return fetch(`${API}/categories/all`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}


// Product API calls
// create the product API call
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product // here since the product controller in the backend is of form type so we don't need to pass "Content-Type": "application/json"
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}

// get all product API call
export const getAllProduct = () => {
    return fetch(`${API}/products/all`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}


// get a single product API call 
export const getSingleProduct = (productId) => {
return fetch(`${API}/product/${productId}`, {
    method: "GET"
})
.then(response => {
    return response.json()
})
.catch(error => console.log(error))
}

// update the product API call
export const updateProduct = (userId, token, productId, product) => {
    return fetch(`${API}/product/update/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product // here since the product controller in the backend is of form type so we don't need to pass "Content-Type": "application/json"
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}

// delte the product API call
export const deleteProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}
