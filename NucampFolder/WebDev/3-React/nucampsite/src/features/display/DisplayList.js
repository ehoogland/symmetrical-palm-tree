/** By using the useSelector hook, we ensure that the component re-renders whenever the
 * selected item changes.
 */
import { useSelector } from 'react-redux'; 
import { Col, Row } from 'reactstrap';
// import DisplayCard from './DisplayCard'; commented this and added AnimatedDisplayCard import
import  AnimatedDisplayCard from './AnimatedDisplayCard';
import { selectFeaturedCampsite } from '../campsites/campsitesSlice';
import { selectFeaturedPartner } from '../partners/partnersSlice';
import { selectFeaturedPromotion } from './promotions/promotionsSlice';

 /**
 * Display a list of featured items
 * @returns {JSX.Element}
 * @module DisplayList
 * @description A component that displays a list of featured items.
 * @exports {JSX.Element} DisplayList
 */
const DisplayList = () => {
    // Use the selectors to get whatever item is returned from invoking them
    const items = useSelector((state) => [
    selectFeaturedCampsite(state),
    selectFeaturedPromotion(state),
    selectFeaturedPartner(state)
    ]);
    // Log to see what's in the items array for debugging
    // console.log('items:', items);
    /**
     * The two Col components are wrapped in a Row component to return a single element, 
     * as required by React.
     * Idx provided because React requires a key prop for each child in a list.
     * Used conditional rendering to only render the component in Col if the item exists: 
     * 'item && <Col>...</Col>'.
     * Tested the conditional rendering logic for when an item doesn't exist by changing
     * "featured" to "false" inCAMPSITES.js file.
     */
    return (
        <>
            {items.every(i => !i) ? (
                <div className="alert alert-warning">No featured items available — check your API or featured flags.</div>
            ) : (
                <Row>
                    {items.map((item, idx) => {
                        return (
                            item && (
                                <Col md className='m-1' key={idx}>
                                    <AnimatedDisplayCard item={item} />
                                </Col>
                            )
                        );
                    })}
                </Row>
            )}
        </>
    );
};

export default DisplayList;