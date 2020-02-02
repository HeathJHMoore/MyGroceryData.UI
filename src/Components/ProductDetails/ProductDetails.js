import React from 'react'
import './ProductDetails.scss';
import ProductData from '../../Data/ProductData';

class ProductDetails extends React.Component {

    state = {
        ProductDetails : {}
    }

    componentDidMount() {
        ProductData.GetProductDetails(this.props.match.params.productId)
        .then(resp => {
            this.setState({ProductDetails : resp})
            document.getElementById("productDetailImage").style.backgroundImage = `url(${resp.imageURL})`
        })
        .catch()
    }

    render() {
        return (
            <div className=" productDetailContainer">
                <div className="productDetailSection productDetailSectionOne">
                    <div className="productDetailSectionOneRow">
                        <div id="productDetailImage"></div>
                        {/* <img src={this.state.ProductDetails.imageURL} /> */}
                    </div>
                    <div className="productDetailSectionOneRow">
                        <h3>{this.state.ProductDetails.productName}</h3>
                        <div>
                            <h4>Today's Price</h4>
                            <p>${this.state.ProductDetails.priceToday}</p>
                        </div>
                    </div>
                </div>
                <div className="productDetailSection productDetailSectionTwo">
                    <div className="productDetailSectionTwoRow">
                        <div>
                            <h4>Maximum Price</h4>
                            <p>${this.state.ProductDetails.maxPrice}</p>
                        </div>
                        <div>
                            <h4>Minimum Price</h4>
                            <p>${this.state.ProductDetails.minPrice}</p>
                        </div>
                    </div>
                    <div className="productDetailSectionTwoRow">
                        <div>
                            <h4>Average Price</h4>
                            <p>${this.state.ProductDetails.maxPrice}</p>
                        </div>
                        <div>
                            <h4>Time On Clearance</h4>
                            <p>{this.state.ProductDetails.timeOnClearance}%</p>
                        </div>
                    </div>
                </div>
                <div className="productDetailSection productDetailSectionThree">
                    The third info will go in here
                </div>
            </div>
        )
    }
}

export default ProductDetails;