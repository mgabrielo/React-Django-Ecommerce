import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { removeFromCart } from '../../redux/reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const CartScreen = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)
    const [cartState, setCartState] = useState(cartItems)

    const removeFromCartHandler = (itemId) => {
        setCartState(cartState.filter((item) => item.id !== itemId))
        dispatch(removeFromCart(itemId))
    }

    return (
        <>
            <Row className='justify-content-center align-items-center pt-3'>
                <Col md={8}>
                    <h3>Cart Items</h3>
                    {
                        cartState && cartState?.length > 0 && (
                            <ListGroup variant='flush' className='mt-4'>
                                {
                                    cartState.map((item) => (
                                        <ListGroup.Item key={item?.id}>
                                            <Row className='align-items-center' >
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                </Col>
                                                <Col>
                                                    {item.totalPrice}
                                                </Col>
                                                <Col>
                                                    {item.qty}
                                                </Col>
                                                <Col md={2}>
                                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.id)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                    }
                </Col>
            </Row>
        </>
    )
}

export default CartScreen