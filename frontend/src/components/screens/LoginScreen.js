import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import axios from 'axios'
import { signInFailure, signInStart, signInSuccess } from '../../redux/reducers/userReducer'

const LoginScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, currentUser } = useSelector((state) => state.user)
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    })

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate("/");
    //     }
    // }, [currentUser]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            await axios.post(`api/users/login/`, formState).then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    dispatch(signInSuccess(res.data))
                    navigate('/')
                }
            }).catch((err) => {
                dispatch(signInFailure(err?.response?.data?.detail))
            })
        } catch (error) {
            dispatch(signInFailure("Could Not Complete Sign In"));
        }
    }

    console.log('redux error', error)
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Card>
                        <Card.Header as={'h3'} className='text-center bg-black text-light'>
                            Sign Up
                        </Card.Header>
                        <Card.Body>
                            {
                                error && !loading && (
                                    <Row className='mb-3 mx-auto'>{error}</Row>
                                )
                            }
                            <Form onSubmit={submitHandler}>
                                <Form.Group className='mb-3' controlId='username'>
                                    <Form.Label><span><i className="fa-solid fa-user"></i>Username</span></Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='User Name'
                                        value={formState.username}
                                        onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='password1'>
                                    <Form.Label><span><i className="fa-solid fa-lock"></i> Password</span></Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='enter password'
                                        value={formState.password}
                                        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <br />
                                <div className='d-grid gap-1'>
                                    <Button className='btn btn-md btn-success' type='submit'>
                                        <span>{loading ? <Loader /> : 'Sign In'}</span>
                                    </Button>
                                </div>
                            </Form>
                            <Row className='py-2'>
                                Not a User?...
                                <Col as={Link} to={'/signup'}>
                                    Sign Up
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    )
}

export default LoginScreen