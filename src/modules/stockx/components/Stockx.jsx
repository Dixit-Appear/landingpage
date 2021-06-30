import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { stockX } from "redux/actions/app"
import Loading from "lib/components/Loading.jsx"
import SearchBar from "lib/components/Search-bar.jsx"
import TopSneaker from "lib/components/sneaker-card/SneakerCard"
import SneakerResults from "lib/components/sneaker-card/SneakerSrcCard"
import _ from "underscore"
import './Stockx.scss'

export default ({ topSneakers, isLoadedSneakers }) => {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [sneakersSrc, setSneakersSrc] = useState([])
    const [limitList, setLimitList] = useState(9)

    useEffect(() => {
        getSearchSneakers()
    }, []);

    const getSearchSneakers = (query) => {
        stockX.searchProducts((query), {
            q: query,
        })
            .then(
                (products) => { setIsLoaded(true); setSneakersSrc(products) },
                (error) => { setIsLoaded(true); setError(error) }
            )
    }

    return (
        <Container >
            <Row className="mt-100">
                <Col lg={12}>
                    <h1>Top products of the month</h1>
                    <p>Click a sneaker to check the market info</p>
                </Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Row className="top-product">
                        {
                            !isLoadedSneakers ? <Loading /> :
                                topSneakers.map(sneaker => (
                                    <Col lg={4} md={6} sm={12} xs={12}><TopSneaker sneaker={sneaker} key={sneaker.uuid} id={sneaker.urlKey} /></Col>
                                ))
                        }
                    </Row>
                </Col>
            </Row>
            <Row className="mt-100"><Col lg={12}><h3>Search your favorite item</h3></Col></Row>
            <Row className="pt-16">
                <Col lg={12}>
                    <SearchBar searchFunction={getSearchSneakers} />
                </Col>
            </Row>
            <Row>
                {
                    !isLoaded ? <Loading /> :
                        sneakersSrc.slice(0, limitList).map(sneakersSrc => (
                            <Col lg={4} md={6} sm={12} xs={12}><SneakerResults sneakersSrc={sneakersSrc} key={sneakersSrc.uuid} id={sneakersSrc.urlKey} /></Col>
                        ))
                }
            </Row>
            <Row>
                <Col className="button-loadmore">
                    {sneakersSrc.length === 0 ? "" : <Button className="btn-stockx" onClick={() => { setLimitList(limitList + 9) }}>Load More</Button>}
                </Col>
            </Row>
        </Container>
    )
}
