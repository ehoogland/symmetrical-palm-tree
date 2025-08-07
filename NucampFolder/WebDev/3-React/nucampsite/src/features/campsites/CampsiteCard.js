import  { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
const CampsiteCard = ( {campsite} ) => {
    const { image, name } = campsite;
    return (
        <Card tag="div">
            <CardImg width='100%' src= {image} alt= {name} tag="img" />
            <CardImgOverlay tag="div">
                <CardTitle tag='h4'>{name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
};

export default CampsiteCard;