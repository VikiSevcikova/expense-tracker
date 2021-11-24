import { Container, Spinner } from "react-bootstrap";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
    return (
        <Container fluid className="spinner d-flex h-100 align-items-center justify-content-center">
            <Spinner
                animation="border"
                variant="light" />
        </Container>
    );
};

export default LoadingSpinner;