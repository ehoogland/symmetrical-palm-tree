import RenderCampsite from "../features/campsites/RenderCampsite";
/**
 * CampsiteInfoScreen component
 * Destructure the route prop in the parameter list of the CampsiteInfoScreen function, 
 * replacing the previous value of props.
 * Destructure campsite from route.params to access the campsite data passed via navigation.
 * Pass the campsite data as a prop to the RenderCampsite component for rendering.
 *
 * @returns JSX element representing the campsite information screen
 */
const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    return <RenderCampsite campsite={campsite} />;
};

export default CampsiteInfoScreen;