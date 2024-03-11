import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loader