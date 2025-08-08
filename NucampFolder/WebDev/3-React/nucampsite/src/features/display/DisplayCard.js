// Presentation component for displaying a card with image, title, and description
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const DisplayCard = ({ item }) => {
    // Destructure the item object to extract image, name, and description
    const { image, name, description } = item;

    return (
        <Card>
            <CardImg src={image} alt={name} />
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    );
};
export default DisplayCard;