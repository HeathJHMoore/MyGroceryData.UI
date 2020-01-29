import React from 'react'
import './ProductDetails.scss';

class ProductDetails extends React.Component {

    state = {

    }

    render() {
        return (
            <div className=" productDetailContainer">
                <div className="productDetailSection productDetailSectionOne">
                    The first info will go in here
                </div>
                <div className="productDetailSection productDetailSectionTwo">
                    The second info will go in here
                </div>
                <div className="productDetailSection productDetailSectionThree">
                    The third info will go in here
                </div>
            </div>
        )
    }
}

export default ProductDetails;