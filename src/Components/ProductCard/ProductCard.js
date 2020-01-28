import React from 'react';
import './ProductCard.scss';
import { Redirect } from 'react-router-dom';

class ProductCard extends React.Component {

    AddToUserWatchlist = () => {
        // create function in userData.js that adds a specific product to user watchlist using productId and firebaseId
        console.error("you tried to add a product to the watchlist")
    }

    GoToProductPage = () => {
        const productInfoPath = `/ProductDetails/${this.props.product.productId}`
        this.props.history.push(productInfoPath)
        return <Redirect to={productInfoPath}/>
    }

    render() {

        const productInfoPath = `/ProductDetails/${this.props.product.productId}`

        return (
            <div key={this.props.product.Id} className="productCard">
                <h2>{this.props.product.productName}</h2>
                <h2>Regular Price: ${this.props.product.productRegularPrice}</h2>
                {this.props.product.productPromoPrice === 0 ? <h2>Not on Clearance</h2>: <h2>Clearance Price: ${this.props.product.productPromoPrice}</h2>}
                <div className="productCardButtonContainer">
                  {/* <Link className="productCardButton" to={productInfoPath}>View Product Statistics</Link> */}
                  <button className="productCardButton" onClick={this.GoToProductPage}>View Product Statistics</button>
                  <button onClick={this.AddToUserWatchlist} className="productCardButton">Add to Watchlist</button>
                </div>
             </div>
        )
    }
}

export default ProductCard;