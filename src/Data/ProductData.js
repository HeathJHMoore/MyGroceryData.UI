import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import qs from 'querystring';

const localBaseURL = 'https://localhost:44387/api';
const krogerBaseURL = 'https://api.kroger.com/v1';
const krogerProductURL = 'https://api.kroger.com/v1/products/';


const GetProductImage = (productId, locationId) => new Promise ( (resolve, reject) => {

    // Data Object for axios POST that retrieves access token to make further KrogerAPI calls
    const postBody = {
        'grant_type' : 'client_credentials',
        'scope' : 'product.compact'
    }

    // Config Object for axios POST that retrieves access token to make further KrogerAPI calls
    const postConfigTokenRequest = {
        headers: {
            'Authorization' : 'Basic bXlncm9jZXJ5ZGF0YS1kMjk5MmI5Yzk1MmFkNDY3NDMyY2NhYmUzNmZiNWFiNDpUc1VJbWd3YkZTbzFuY1pEeEEzMVBiVFFrMTZXQldFOA==',
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    }

    // axios POST request passes URL, then Body aka postBody, then headers aka postConfig
    axios.post(`${krogerBaseURL}/connect/oauth2/token`, qs.stringify(postBody), postConfigTokenRequest)
    .then(resp => {
        const access_token = resp.data.access_token;
        const postConfigProductRequest = {
            headers : {
                'Authorization' : `Bearer ${access_token}`,
                'Content-Type' : 'application/json'
            }
        }
        // GET request to retrieve image URL for specific product
        axios.get(`${krogerProductURL}/${productId}?filter.locationId=${locationId}`, postConfigProductRequest)
        .then((productresponse) => {
            // Kroger API returns a random order of images from small to large in an array
            // so I had to create the below foreach loop to make sure I was always pulling back the large image in the array
            // If the item doesn't have a large image, then I pull back the medium image
            let ImageURL = {
                Large : undefined,
                Medium : undefined
            };
            productresponse.data.data.images[0].sizes.forEach((image) => {
                if (image.size === 'large') {
                    ImageURL.Large = image.url;
                }
                if (image.size === 'medium') {
                    ImageURL.Medium = image.url 
                }
            })
            if (ImageURL.Large === undefined) {
                resolve(ImageURL.Medium)
            }
            else {
                resolve(ImageURL.Large)
            }
        })
        .catch(err => reject(err))
    })
    .catch()
})

// This function prepends '0's to productIds. In migrating my postgreSQL database to SQL Server, I lost leading zeroes by
// having my productIds in the SQL Server be BigInt instead of Varchar.
const FixProductId = (productId) => {
    let productIdToFix = productId
    while (productIdToFix.length < 13) {
        productIdToFix = '0' + productIdToFix;
    }
    return productIdToFix
}

// This function returns product details from the local database and makes a GET request to Kroger's API
// to retrieve an image URL used in the front end
const GetProductDetails = (productId) => new Promise( (resolve, reject) => {
    axios.get(`${localBaseURL}/values/${firebase.auth().currentUser.uid}/${productId}/details`)
    .then(resp => {
        let productInfo = resp.data;
        productInfo.productId = FixProductId(productInfo.productId)
        GetProductImage(resp.data.productId, resp.data.locationId)
        .then((image) => {
            productInfo.imageURL = image
            resolve(productInfo)
        })
        .catch(err => reject(err))
    })
    .catch(err => reject(err))
})

// This function returns a seven day view of price action for a particular product
const GetSevenDayTrend = (startDate, productId) => new Promise((resolve, reject) => {
    axios.get(`${localBaseURL}/values/${firebase.auth().currentUser.uid}/${productId}/${startDate}/seven-day-trend`)
    .then((resp) => {
        resolve((resp.data))
    })
    .catch(err => reject('couldnt get seven day trend'))
})

const AddtoUserWatchlist = (productId) => new Promise((resolve, reject) => {
    axios.post(`${localBaseURL}/values/${firebase.auth().currentUser.uid}/${productId}/add-to-watchlist`)
    .then(resp => {
        resolve('you successfully inserted!')
    })
    .catch(reject('it messed up'))
})

export default {
    GetProductDetails,
    GetSevenDayTrend,
    AddtoUserWatchlist
}