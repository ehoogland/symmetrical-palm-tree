import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Partner from './Partner';
import { selectAllPartners } from './partnersSlice';
/**
 * PartnersList component
 * @returns {JSX.Element} - A list of partner components 
 */
const PartnersList = () => {
    // partnersSlice.js has a selectAllPartners selector function that returns the (entire) PARTNERS
    // array of partner objects.
    // Declare a const named partners and give it the return value from invoking selectAllPartners().
    // This will cause the partners variable to contain the entire PARTNERS array.
    // We want to pass the function by its name, rather than invoke it and pass its return value
    const partners = useSelector(selectAllPartners);

    return (
        <Col className='mt-4'>
            {partners.map((partner) => (
                <Col 
                    className='d-flex mb-5'
                    key={partner.id} 
                >
                    <Partner partner={partner} />
                </Col>
            ))}
        </Col>
    );
};

export default PartnersList;
