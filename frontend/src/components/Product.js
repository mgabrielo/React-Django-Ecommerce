import React from 'react'
import Card from 'react-bootstrap/Card'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded text-decoration-none' as={Link} to={`/product/${product?._id}`} >
            <Card.Img src={product?.image} />
            <Card.Body>
                <Card.Title as={'h5'}>
                    <strong>{product?.productname}</strong>
                </Card.Title>
                <Card.Text as={'h6'}>
                    ${product?.price}
                </Card.Text>
                <Card.Text as={'div'} className='d-flex flex-row gap-2'>
                    {product?.rating}
                    <Rating value={product?.rating} color={'#f8e825'} text={`${' '}${product?.numReviews} Reviews`} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product