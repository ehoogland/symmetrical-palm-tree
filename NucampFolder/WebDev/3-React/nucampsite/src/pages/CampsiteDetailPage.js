import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectCampsiteById } from '../features/campsites/campsitesSlice';
import CampsiteDetail from '../features/campsites/CampsiteDetail';
import CommentsList from '../features/Comments/CommentsList';
import SubHeader from '../components/SubHeader';
import Error from '../components/Error';
import Loading from '../components/Loading';

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
    /** 
     * @description Get the isLoading and errMsg properties from the campsites state
     * @const isLoading bound to the isLoading property from the campsites state
     * @const errMsg bound to the errMsg property from the campsites state
     * obtained from useSelector()
     * @render conditionally render the Loading and Error components.
     * @let content initialized to null:
     */
    const isLoading  = useSelector((state) => state.campsites.isLoading);
    const errMsg = useSelector((state) => state.campsites.errMsg);
    let content = null;
    /**
     * Conditionally render the Loading and Error components.
     * It is possible to store JSX expressions inside a JavaScript variable.
     * We will take advantage of this to set the value of content conditionally to the JSX we wish to render.
     * If the isLoading variable is truthy, then we will set content to <Loading />.
     * Else, if the errMsg variable is truthy, then we will set content to <Error errMsg={errMsg} />.
     * Else, we will set content to the JSX for the CampsiteDetail and CommentsList components. 
     * @fragment Any JSX expression must contain a single parent element or component,
     * so we will wrap them in a React Fragment, as shown below:
     */
    if (isLoading) {
        content = <Loading />;
    } else if (errMsg) {
        content = <Error errMsg={errMsg} />;
    } else {
        content = (
            <>
                <CampsiteDetail campsite={campsite} />
                <CommentsList campsiteId={campsiteId} />
            </>
        );
    }

    return (
        <Container>
            {campsite && <SubHeader current={campsite.name} detail={true} />}
            <Row>{content}</Row>
        </Container>
    );
}
export default CampsiteDetailPage;
