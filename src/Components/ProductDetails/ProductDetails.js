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
        })
        .catch()
    }

    render() {
        return (
            <div className=" productDetailContainer">
                <div className="productDetailSection productDetailSectionOne">
                    The first info will go in here
                </div>
                <div className="productDetailSection productDetailSectionTwo">
                    <div className="productDetailSectionTwoRow">
                        <div>
                            <h4>Maximum Price</h4>
                            <p>{this.state.ProductDetails.maxPrice}</p>
                        </div>
                        <div>
                            <h4>Minimum Price</h4>
                            <p>{this.state.ProductDetails.minPrice}</p>
                        </div>
                    </div>
                    <div className="productDetailSectionTwoRow">
                        <div>
                            <h4>Average Price</h4>
                            <p>{this.state.ProductDetails.maxPrice}</p>
                        </div>
                        <div>
                            <h4>Time On Clearance</h4>
                            <p>{this.state.ProductDetails.minPrice}</p>
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