import { Col, Row } from 'reactstrap';
import CampsiteCard from 'features/campsites/CampsiteCard';
import { selectAllCampsites } from './campsitesSlice';

const CampsitesList = () => {
    // Use the selector to get all campsites
    const campsites = selectAllCampsites();
    
    return (
        <Row className='ms-auto' tag="div">
            {campsites.map(campsite => (
                <Col md='5' className='m-4' key={campsite.id} tag="div">
                    <CampsiteCard campsite={campsite} />
                </Col>
            ))}
        </Row>
    );
}

export default CampsitesList;

