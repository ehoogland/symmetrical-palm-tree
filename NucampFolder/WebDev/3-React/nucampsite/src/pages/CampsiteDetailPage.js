import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectCampsiteById } from '../features/campsites/campsitesSlice';
import CampsiteDetail from '../features/campsites/CampsiteDetail';
import CommentsList from '../features/Comments/CommentsList';
import SubHeader from '../components/SubHeader';
// CampsiteDetailPage component displays the details of a specific campsite
// It uses the campsiteId from the URL to fetch the campsite details and comments
const CampsiteDetailPage = () => {
   
    // Note that this is not tracked by useState(), 
    // but gets rendered when campsiteId changes
    /**
     * Get the campsiteId from the URL parameters
     * useParams() returns an object from the campsites array
     * that matches the campsiteId from the URL
     */
    const { campsiteId } = useParams(); 
/**
 * Get the campsite from the Redux store
 * useSelector() returns the campsite object that matches the campsiteId
 * from the URL.
 * 
 * Useful for getting the correct campsite object from the Redux store
 */
    
    const campsite = useSelector(selectCampsiteById(campsiteId));
console.log('campsite:', campsite);
    return (
        <Container>
            <SubHeader current={campsite ? campsite.name : ''} detail={true}/>
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
