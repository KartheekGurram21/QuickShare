import { Container } from 'react-bootstrap';
import NavBar from '../Components/NavBar';
import FileUpload from '../Components/FileUpload';

function Upload() {
    return (
        <>
            <NavBar />
            <Container className="mt-5">
                <h2>Upload Your File</h2>
                <FileUpload />
            </Container>
        </>
    );
}

export default Upload;
