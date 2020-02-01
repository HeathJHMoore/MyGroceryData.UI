import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const localBaseURL = 'https://localhost:44387/api';
const krogerBaseURL = 'https://api.kroger.com/v1';

// const GetProductDetails = (productId) => new Promise( (resolve, reject) => {
//     axios.get(`${localBaseURL}/values/${firebase.auth().currentUser.uid}/${productId}/details`)
//     .then(resp => {
//         resolve(resp.data)
//     })
//     .catch(err => reject(err))
// })

const GetProductImage = (productId, locationId) => new Promise ( (resolve, reject) => {
    axios.post(`${krogerBaseURL}/connect/oauth2/token`, )
})

const GetProductDetails = (productId) => new Promise( (resolve, reject) => {
    axios.get(`${localBaseURL}/values/${firebase.auth().currentUser.uid}/${productId}/details`)
    .then(resp => {
        let productInfo = resp.data;
        
    })
    .catch(err => reject(err))
})

export default {
    GetProductDetails
}