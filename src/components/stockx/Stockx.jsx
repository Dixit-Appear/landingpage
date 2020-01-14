import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Loading from "../Loading.jsx"
import Loader from "../Loader.jsx"
import Navbar from "../navbar/Navbar.jsx"
import SearchBar from "../Search-bar.jsx";
import Slider from "../Slider.jsx"
import moment from 'moment';
import { Link } from 'react-router-dom'
import _ from "underscore"

const stockxAPI = require('stockx-api');
const stockX = new stockxAPI();
export default class Stockx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sneakers: []
        };
    }
    

    search = (query) => {
        stockX.searchProducts((query), {
            q: query,
            rating: 'g',
            limit: 12,
            currency: 'GBP'
        })
            .then((products) => {
                this.setState({
                    isLoaded: true,
                    sneakersSrc: products
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        const { sneaker } = this.props
        stockX.searchProducts('Dunk', { limit: 3 })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    sneakers: result
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { isLoaded, sneakers, sneakersSrc } = this.state;

        return (
            <Container >
                <Navbar />
                <Row className="mt-100">
                    <Col lg={12}>
                        <h3>Top Product of the month</h3>
                    </Col>
                    <Col>
                        <div className="top-product">
                            {
                                !isLoaded ? <Loader /> :
                                    sneakers.map(sneaker => (
                                        <Sneaker sneaker={sneaker} />
                                    ))
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="mt-100">
                    <h3>Search your favorite item on Stockx</h3>
                </Row>
                <Row>
                    <Col lg={12}>
                        <SearchBar searchFunction={this.search} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            sneakersSrc ? <Slider items={_.map(sneakersSrc, (sneakersSrc) => <SneakerSrc sneakersSrc={sneakersSrc} />)} /> : ""
                        }
                    </Col>
                </Row>




            </Container>
        )
    }
}

const SneakerSrc = ({ sneakersSrc }) => (
    <div className="product" style={{ margin: "50px" }}>
        <Link href={`/stockx/${sneakersSrc.uuid}`}>
            <p>{sneakersSrc.name}</p>
        </Link>
        <img src={sneakersSrc.image} alt="" style={{ width: "150px" }} />
        <p>Release: {moment(sneakersSrc.releaseDate).format("DD MMM, YYYY")}</p>
    </div>
)

const Sneaker = ({ sneaker }) => (
    <div className="product" style={{ margin: "50px" }}>
        {/* <a target="_blank" rel="noopener noreferrer" href={`https://stockx.com/${sneaker.urlKey}`}></a>*/}
        <Link to={`/stockx/${sneaker.uuid}`}>
            <p>{sneaker.name}</p>
        </Link>
        <img src={sneaker.image} alt="" style={{ width: "150px" }} />
        <p>Release: {moment(sneaker.releaseDate).format("DD MMM, YYYY")}</p>
    </div>
)