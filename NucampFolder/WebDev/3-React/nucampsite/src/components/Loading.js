import { Col } from 'reactstrap';
/**
 * Loading component to display a loading spinner
 * @returns {JSX.Element} - Rendered loading spinner
 * @module Loading
 * @fontAwesome classes
 *   - fa-spinner: Spinner icon
 *   - fa-pulse: Pulse animation
 *   - fa-3x: 3x size
 *   - fa-fw: Fixed width
 *   - text-primary: Primary text color, with a blue hue
 */
const Loading = () => {
    return (
        <Col>
            <i className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary' />
            <p>Loading...</p>
        </Col>
    );
};

export default Loading;