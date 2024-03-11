import axios from 'axios'
import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from '../Product'
import { useDispatch, useSelector } from 'react-redux'
import { productListFailure, productListStart, productListSuccess } from '../../redux/reducers/productReducer'
import Loader from '../Loader'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { products, loading } = useSelector((state) => state.product)

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(productListStart())
                await axios.get(`/api/products/`).then((res) => {
                    if (res.status === 200 && res.data) {
                        dispatch(productListSuccess(res.data))
                    }
                }).catch((err) => {
                    dispatch(productListFailure(err?.message))
                })
            } catch (error) {
                dispatch(productListFailure(error?.message))
            }
        }
        fetchData()
    }, [dispatch])

    return (
        <Container>
            <h3>Products</h3>
            <Row>
                {!loading && products && products.length > 0 ? (
                    <>
                        {
                            products.map((product) => (
                                <Col key={product?._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                    </>
                ) : (
                    <Container className='d-flex container-fluid min-vh-100 justify-content-center align-items-center'>
                        <Loader />
                    </Container>
                )}
            </Row>
        </Container>
    )
}

export default HomeScreen