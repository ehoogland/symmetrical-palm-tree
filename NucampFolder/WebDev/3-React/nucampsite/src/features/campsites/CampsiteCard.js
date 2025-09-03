import  { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const CampsiteCard = ( {campsite} ) => {
    const { id,image, name } = campsite;
    // Passes the id as a string parameter to the URL (uses React Router)
    // Use an absolute path so the link works even if this component
    // is rendered outside of the /directory route.
    return (
        <Link to={`/directory/${id}`}>
            <Card>
                <CardImg width='100%' src={image} alt={name} />
                <CardImgOverlay>
                    <CardTitle>{name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
    );
};

export default CampsiteCard;