import { Container, Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
    return(
        <Container fluid className="d-flex h-100 align-items-center justify-content-center">
            <Spinner animation="border" variant="light"/>
        </Container>
    )
}

export default LoadingSpinner;