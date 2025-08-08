import { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CampsiteDetail from '../features/campsites/CampsiteDetail';
import CampsitesList from '../features/campsites/CampsitesList';
import { selectCampsitesById } from 'features/campsites/campsitesSlice';

// Use React state to manage the selected campsite
const CampsitesDirectoryPage = () => {
    const [campsiteId, setCampsiteId] = useState(0);
    // not tracked by useState(), but gets rendered when campsiteId changes
    const selectedCampsite = selectCampsitesById(campsiteId);

    return (
        <Container tag="div">{/* Container holds the Campsites Directory Page */}
        {/* The Campsites Directory Page will display a list of campsites and 
        details of a selected campsite. The page layout is based on Bootstrap's
        grid system, which will render a responsive layout. Recall that there are 
        12 units of width in a bootstrap row */}
            <Row className='mb-3' tag="div">
                <Col tag="div">
                    <h2>Campsites Directory</h2>
                    <p>Select a campsite to see its details</p>
                </Col>
            </Row>
            <Row tag="div">
                <Col sm='5' md='7' tag="div"> {/* two columns with props sm and md */}
                    <CampsitesList setCampsiteId={setCampsiteId} /> 
                </Col>
                <Col sm='7' md='5' tag="div"> 
                {/* Pass in a prop to tell it which campsite's details to render */}
                {/* Recall that JSX syntax requires curly braces around JavaScript 
                expressions like variables and props. selectedCampsite is a variable and a prop. */}
                <CampsiteDetail campsite={selectedCampsite} /> 
                </Col>          
            </Row>
            
        </Container>
    );
};
export default CampsitesDirectoryPage;