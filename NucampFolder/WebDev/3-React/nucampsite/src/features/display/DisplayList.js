import { Col, Row } from 'reactstrap';
import DisplayCard from './DisplayCard';
import { selectFeaturedCampsite } from '../campsites/campsitesSlice';
import { selectFeaturedPartners } from '../partners/partnersSlice';
import { selectFeaturedPromotion } from './promotions/promotionsSlice';
// Now if the information in the selected item changes, we don't have to change
// the DisplayList component (this file), since it is retrieving that item at runtime.

const DisplayList = () => {
    // Use the selectors to get whatever item is returned from invoking them
    const items = [ selectFeaturedCampsite(), selectFeaturedPromotion(), selectFeaturedPartners() ]   ;
    
// Remember that React components must return a single element, 
// so we wrap the two Col components in a Row component. 
// React requires a key prop for each child in a list, so we also need to provide an idx.
    return (
        <Row>
            { items.map((item, idx) => (
                <Col md className='m-1' key={idx}>
                    <DisplayCard item={item} />
                </Col>
            ))}
        </Row>
    );
};

export default DisplayList;