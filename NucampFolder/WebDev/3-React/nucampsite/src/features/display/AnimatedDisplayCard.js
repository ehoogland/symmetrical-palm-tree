// Presentation component for displaying a card with image, title, and description
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { useState, useEffect } from 'react';
import placeholderImg from '../../app/assets/img/unicorn.png';
import { useSpring, animated} from 'react-spring';

const AnimatedDisplayCard = ({ item }) => {
    // Destructure the item object to extract image, name, and description
    const { image, name, description } = item;
    // If the image filename looks like a logo, we want to avoid cropping it.
    // Logos often contain the word "logo" in their filename; detect that and
    // toggle a CSS class so they use object-fit: contain instead of cover.
    const isLogo = typeof image === 'string' && /logo/i.test(image);
    // Destructure the useState hook to get toggle and setToggle
    // useState is a React hook that allows you to add state to functional components
    // Since useState returns an array, use array destructuring, i.e., brackets.
    // Recall that toggle is a boolean that indicates whether the card is visible or not.
    const [ toggle, setToggle ] = useState(false);  // useState hook to manage toggle state. 

    const animatedStyle = useSpring({
        opacity: toggle ? 1 : 0,
        transform: toggle ? 'scale(1,1)' : 'scale(1,0)',
        config: { duration: 500 }
    });

    useEffect(() => {
        setToggle(true);
    }, []);

    return (
        <animated.div style= { animatedStyle } >
            <Card>
                <CardImg
                    className={isLogo ? 'display-card-img logo' : 'display-card-img'}
                    src={image}
                    alt={name}
                    onError={(e) => {
                        // log and show placeholder when remote image fails
                        console.warn('Image failed to load, using placeholder for', name, e?.target?.src);
                        e.currentTarget.src = placeholderImg;
                    }}
                />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </animated.div>
    );
};

export default AnimatedDisplayCard;