import { Col, Row } from 'reactstrap';
import CampsiteCard from 'features/campsites/CampsiteCard';
import { selectAllCampsites } from './campsitesSlice';

const CampsitesList = ({ setCampsiteId }) => {
    // Use the selector to get all campsites
    const campsites = selectAllCampsites();
// Recall that a Col component is just a glorified div that has a width
// based on the Bootstrap grid system. divs can be clicked too, just like buttons.
    return (
        <Row className='ms-auto' tag="div">
            {campsites.map((campsite) => (
                <Col
                    md='5' 
                    className='m-4' 
                    key={campsite.id} 
                    onClick={() => setCampsiteId(campsite.id)}> {/* Set the campsiteId when clicked. Note the callback function does call or invoke a function*/}
                    <CampsiteCard campsite={campsite} /> 
                </Col>
            ))}
        </Row>
    );
}

export default CampsitesList;

