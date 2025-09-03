import { Col } from 'reactstrap';
/**
 * Error component to display error messages
 * Destructure the props object to get the error message
 * param0 in JSDoc means the first parameter of the function;
 * tooltip for param0 shows "any" for both the error message and the component props
 * The outer parens are used to group the destructured props
 * The inner braces indicate the specific properties being extracted
 * Parens after return indicate that we are returning a JSX expression
 * @param {Object} param0 - Component props
 * @param {string} param0.errMsg - Error message to display
 * @returns {JSX.Element} - Rendered error message
 */
const Error = ({ errMsg }) => {
    return (
        <Col>
            <h4>{errMsg}</h4>
        </Col>
    );
};

export default Error;