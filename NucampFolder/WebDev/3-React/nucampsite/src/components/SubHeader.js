import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'; // Importing Link for making items clickable to return to a previous page

const Subheader = ({ current, detail }) => {
    return (
        <Row className='ms-auto'>
            <Col md='12'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/'>Home</Link>
                    </BreadcrumbItem>
                    {detail && (
                        <BreadcrumbItem>
                            <Link to='/directory'>Directory</Link>
                        </BreadcrumbItem>
                    )}
                        <BreadcrumbItem active>{current}</BreadcrumbItem>
                </Breadcrumb>
                <h2>{current}</h2>
                <hr />
            </Col>
        </Row>
    );
}

export default Subheader;
// This component can be used to display a breadcrumb navigation
// It takes two props: current and detail, which are used to show the current page and
// any additional detail about the page, respectively.
// The Link component from react-router-dom is used to make the Home link functional,
// allowing users to navigate back to the home page easily.
// The Breadcrumb component from reactstrap is used to create a breadcrumb navigation,
// which is a common UI pattern for showing the user's current location within the app's hierarchy.
// The Col and Row components from reactstrap are used to structure the layout of the breadcrumb.
// This component can be imported and used in other components or pages where breadcrumb navigation is needed.
// It can be placed at the top of a page to provide context and navigation options for the user.
// The current and detail props can be dynamically set based on the page being viewed,
// allowing for flexible usage across different pages in the application.