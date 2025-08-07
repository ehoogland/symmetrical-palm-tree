import { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import CampsiteDetail from '../features/campsites/CampsiteDetail';
import CampsitesList from '../features/campsites/CampsitesList';
import { selectRandomCampsite } from 'features/campsites/campsitesSlice';

const CampsitesDirectoryPage = () => {
    // Use React state to manage the selected campsite
    const [selectedCampsite, setSelectedCampsite] = useState(selectRandomCampsite());

    const toggleCampsite = () => {
        const newCampsite = selectRandomCampsite();
        setSelectedCampsite(newCampsite);
        console.log(newCampsite);
    };
    return (
        <Container>{/* Container holds the Campsites Directory Page */}
        {/* The Campsites Directory Page will display a list of campsites and 
        details of a selected campsite. The page layout is based on Bootstrap's
        grid system, which will render a responsive layout. Recall that there are 
        12 units of width in a bootstrap row */}
            <Row className='mb-3'>
                <Col>
                    <h2>Campsites Directory</h2>
                    <Button onClick={toggleCampsite}>
                        Select Random Campsite
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col sm='5' md='7'> {/* two columns with props sm and md */}
                    {/* Display the full list of campsites; therefore no need to pass data */}
                    <CampsitesList /> 
                </Col>
                <Col sm='7' md='5'> 
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