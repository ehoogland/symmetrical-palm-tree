import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import Partner from './Partner';
import { selectAllPartners } from './partnersSlice';
/**
 * PartnersList component
 * @returns {JSX.Element} - A list of partner components
 * 
 * Pass the function by its name, selectAllPartners, rather than call it
 * and pass its return value (selectAllPartners() ).
 */
const PartnersList = () => {
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
