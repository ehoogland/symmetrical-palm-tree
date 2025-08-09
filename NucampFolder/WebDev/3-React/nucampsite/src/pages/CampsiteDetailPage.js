import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectCampsitesById } from '../features/campsites/campsitesSlice';
import CampsiteDetail from '../features/campsites/CampsiteDetail';
import CommentsList from '../features/Comments/CommentsList';
const CampsiteDetailPage = () => {
    // Get the campsiteId from the URL parameters
    const { campsiteId } = useParams(); 
    // useParams() returns an object from the campsites array
    // that matches the campsiteId from the URL
    // Note that this is not tracked by useState(), 
    // but gets rendered when campsiteId changes
    const campsite = selectCampsitesById(campsiteId); 

    return (
        <Container tag="div">
            <Row tag="div">
                <Col md='6' tag="div">
                    <CampsiteDetail campsite={campsite} />
                </Col>
                <Col md='6' tag="div">
                    <h2>Comments</h2>
                    <CommentsList campsiteId={campsiteId} />
                </Col>
            </Row>
        </Container>
    );
}
export default CampsiteDetailPage;