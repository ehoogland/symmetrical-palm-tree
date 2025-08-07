import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';
const CampsiteDetail = ({ campsite }) => {
    /* Deconstruct the campsite object's properties into their own variable names
     to make it easier to reference them/use them in the JSX rendering below */
    const { image, name, description } = campsite;
    return (
        <Col md='12' className='m-4'>
            {/* having destructured the campsite object, we can now use the variables directly
                instead of referencing the object using dot notation (campsite.image, etc.) */}
            <Card>
                <CardImg top src={image} alt={name} />
                <CardBody>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </Col>
    );
};

export default CampsiteDetail; 