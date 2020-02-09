import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const baseUrl = 'https://localhost:44387/api';

const getValues = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/values/${firebase.auth().currentUser.uid}/home`).then((result) => {
      resolve(result.data);
    })
      .catch((error) => {
        reject(error);
      });
  });

  export default {
      getValues
  }