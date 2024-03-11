import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import Rating from '../Rating'
import { useDispatch, useSelector } from 'react-redux'
import { productDetailFailure, productDetailStart, productDetailSuccess } from '../../redux/reducers/productReducer'
import Loader from '../Loader'

const ProductScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { product, loading } = useSelector((state) => state.product)

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(productDetailStart())
                await axios.get(`/api/product/${id}`).then((res) => {
                    if (res.status === 200 && res.data) {
                        dispatch(productDetailSuccess(res.data))
                    }
                }).catch((err) => {
                    dispatch(productDetailFailure(err?.message))
                })
            } catch (error) {
                dispatch(productDetailFailure(error?.message))
                // console.log(error)
            }
        }
        fetchData()
    }, [id])

    return (
        <Container>
            <div>
                <Link to={'/'} className='btn btn-dark my-3'>Go Back</Link>

                {
                    !loading && product ? (
                        <>
                            <Row>
                                <Col sm={6}>
                                    <Image src={product?.image} alt={product?.name} />
                                </Col>
                            </Row>
                            <Col sm={12}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product?.productname}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product?.rating} color={'#f8e825'} text={`${' '}${product?.numReviews} Reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h6>Product Brand : {product?.productbrand}</h6>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <p>Description: {product?.productinfo}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={12}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>Price : {product?.price}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product?.stockcount > 0 ? "In Stock" : "Out Of Stock"}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button disabled={product?.stockcount === 0}>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </>
                    ) : (
                        <Container className='d-flex container-fluid min-vh-100 justify-content-center align-items-center'>
                            <Loader />
                        </Container>
                    )
                }
            </div>
        </Container >
    )
}

export default ProductScreen