import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const baseURL = 'https://localhost:44387/api';

const GetProductDetails = (productId) => new Promise( (resolve, reject) => {
    axios.get(`${baseURL}/values/${firebase.auth().currentUser.uid}/${productId}/details`)
    .then(resp => {
        resolve(resp.data)
    })
    .catch(err => reject(err))
})

export default {
    GetProductDetails
}