// Create function component called Partner. The component receives a prop called partner
const Partner = ({ partner }) => {
    
    if (partner) {
        // Destructure partner object to extract image, name, and description properties
        const { image, name, description } = partner;
        // Return a fragment containing an image and a div with the partner's name and description
        return (
            <>
                <img src={image} alt={name} style={{ width: '150px'}} />
                <div className='m-4'>
                    <h5 className='fw-bold'>{name}</h5>
                    {description}
                </div>
            </>
        );
    }
    // if !partner
    return null;
};

export default Partner;
