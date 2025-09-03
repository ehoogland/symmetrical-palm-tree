// The selectAllCampsites function of campsitesSlice.js is used by the CampsitesList component, so
// we need to update it to be used with the UseSelector hook
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import CampsiteCard from './CampsiteCard';
import { selectAllCampsites } from './campsitesSlice';
/**
 * CampsitesList component
 * @returns {JSX.Element}
 * @module CampsitesList
 * @description A component that displays a list of campsites.
 * @exports {JSX.Element} CampsitesList
 */
const CampsitesList = () => {
    // Use the selector to get all campsites
    // Don't forget to add the useSelector hook, and import it from react-redux
    // Also, don't pass selectAllCampsites(), just the selectAllCampsites function itself,
    // without invoking it. We don't want to use its return value by calling the function immediately on render
    const campsites = useSelector(selectAllCampsites);
    // Log to see what's going on, i.e., being returned by the selector; this shows whether
    // there are any issues with the selector or the state
    // console.log('campsites:', campsites);
    // Recall that a Col component is just a glorified div that has a width
    // based on the Bootstrap grid system. divs can be clicked too, just like buttons.
    return (
        <Row className='ms-auto'>
            {campsites.map((campsite) => (
                <Col
                    md='5'
                    className='m-4' 
                    key={campsite.id}
                >
                    <CampsiteCard campsite={campsite} /> 
                </Col>
            ))}
        </Row>
    );
}

export default CampsitesList;

