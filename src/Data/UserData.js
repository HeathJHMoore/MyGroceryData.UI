import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const baseURL = 'https://localhost:44387/api';

const CheckUser = () => new Promise( (resolve, reject) =>  {
    axios.get(`${baseURL}/user/checkuser/${firebase.auth().currentUser.uid}`)
    .then((resp) => {
        console.log(resp.data)
        resolve(resp.data);
    })
    .catch(err => console.error(err, 'check user function failed'));
})

const CreateUser = () => {
    const userName = firebase.auth().currentUser.displayName.split(' ')
    const userInfo = {
        FirebaseId : firebase.auth().currentUser.uid,
        DefaultLocationId : null,
        FirstName : userName[0],
        LastName : userName[1]
    }
    axios.post(`${baseURL}/user/createuser`, userInfo)
}

export default {
    CheckUser,
    CreateUser
}