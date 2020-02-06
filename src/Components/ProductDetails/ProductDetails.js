import React from 'react'
import './ProductDetails.scss';
import ProductData from '../../Data/ProductData';
import BarChart from '../BarChart/BarChart';
import moment from 'moment';

class ProductDetails extends React.Component {

    state = {
        ProductDetails : {},
        SevenDayTrendedData : []
    }

    componentDidMount() {
        ProductData.GetProductDetails(this.props.match.params.productId)
        .then(resp => {
            this.setState({ProductDetails : resp})
            document.getElementById("productDetailImage").style.backgroundImage = `url(${resp.imageURL})`
            ProductData.GetSevenDayTrend('2019-12-18', this.props.match.params.productId)
            .then((trendedData) => {
                console.log(trendedData)
                this.setState({SevenDayTrendedData : trendedData})

            })
            .catch(err => console.error('error in getting seven day trended data'))
        })
        .catch()
    }

    render() {

        const sevenDayTrendDataPoints = this.state.SevenDayTrendedData.map((datapoint) => {
            return datapoint.Price
        })
        const sevenDayTrendDataLabels = this.state.SevenDayTrendedData.map((datapoint) => {
            return moment(datapoint.CaptureDate).format('MM-DD-YYYY');
        })
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
                    <div className="productDetailSectionThreeRow"><BarChart dataLabels={sevenDayTrendDataLabels} dataPoints={sevenDayTrendDataPoints}/></div>
                    <div className="productDetailSectionThreeRow"><BarChart dataLabels={sevenDayTrendDataLabels} dataPoints={sevenDayTrendDataPoints}/></div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;