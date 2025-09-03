// The selectAllCampsites function of campsitesSlice.js is used by the CampsitesList component, so
// we need to update it to be used with the UseSelector hook
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import CampsiteCard from './CampsiteCard';
import { selectAllCampsites } from './campsitesSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
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
    console.log('campsites:', campsites);

    /**
     * @param {Object} state - The Redux state
     * @returns {Object} - The campsites state, an object containing the isLoading, errMsg, and campsitesArray properties.
     * @description This selector retrieves the campsites state from the Redux store.
     * We need to get the isLoading, errMsg, and campsitesArray properties from the campsites state
     * and pass them to the component as props.
     *
     * Instead of defining a function name and passing the function name to useSelector
     * we can use the selector directly inside the useSelector call.
     * This selector could also be done by placing the useSelector in campsitesSlice.js, which
     * would allow us to encapsulate the state selection logic.
     * However, for simplicity and clarity, we'll keep it here for now.
     * Additionally, it keeps the component more readable by reducing the number of hooks used.
     * This approach also makes it easier to manage and test a component's state.
     * Finally, it can improve performance by minimizing the number of re-renders.
     */
   const isLoading  = useSelector((state) => state.campsites.isLoading);
   const errMsg = useSelector((state) => state.campsites.errMsg);
   if (isLoading) {
       return (
           <Row>
               {/* Show a loading spinner (from Loading component) while data is being fetched */}
               <Loading />
           </Row>
       );
   }

    if (errMsg) {
        return (
            <Row>
                {/* pass errMsg as a prop to the Error component so that it can display it */}
                <Error errMsg={errMsg} />
            </Row>
        );
    }
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

