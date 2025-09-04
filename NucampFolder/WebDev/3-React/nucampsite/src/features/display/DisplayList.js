/** By using the useSelector hook, we ensure that the component re-renders whenever the
 * selected item changes.
 */
import { useSelector } from 'react-redux'; 
import { Col, Row } from 'reactstrap';
// import DisplayCard from './DisplayCard'; commented this and added AnimatedDisplayCard import
import  AnimatedDisplayCard from './AnimatedDisplayCard';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
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
    // Keep the selector return value as-is (it may be a plain item or an object
    // containing { featuredItem, isLoading, errMsg }) so the rendering logic
    // can show loading/error UI when present.
    const items = useSelector((state) => [
        selectFeaturedCampsite(state),
        selectFeaturedPromotion(state),
        selectFeaturedPartner(state)
    ]);
    // Log to see what's in the items array for debugging
    // console.log('items:', items);
    /**
     * @description Render the list of featured items
     * If all items are null or undefined, display a warning message.
     * @method Array.prototype.every()
     * The every() method tests whether all elements in the array pass the test implemented 
     * by the provided function. It returns a Boolean value. 
     * In this case, it checks if every item in the items array is falsy (null or undefined).
     * If all items are falsy, it renders a warning message inside a div with Bootstrap alert classes.
     * Otherwise, map over the items array and render each item.
     * If an item is loading, display the Loading component.
     * If an item has an error message, display the Error component with the message.
     * If an item is valid, display it using the AnimatedDisplayCard component.
     * @map function used to iterate over the items array and render each item
     * @key prop used to uniquely identify each item in the list for React's reconciliation process
     * @conditional rendering used to display different components based on the item's state (loading, error, or valid)
     * @returns {JSX.Element} The rendered list of featured items or a warning message
     * 
     */
    return ( 
        <Row>
            {items.every(i => !i) ? (
                <div className="alert alert-warning">No featured items available — check your API or featured flags.</div>
            ) : (
                items.map((item, idx) => {
                    const { featuredItem, isLoading, errMsg } = item;
                    if (isLoading) {
                        return <Loading key={idx} />;
                    }
                    if (errMsg) {
                        return <Error errMsg={errMsg} key={idx} />;
                    }
                    return (
                        featuredItem && (
                            <Col md className='m-1' key={idx}>
                                <AnimatedDisplayCard item={featuredItem} />
                            </Col>
                        )
                    );
                })
            )}
        </Row>
    );
};

export default DisplayList;