import { Button, Label, Col, FormGroup } from 'reactstrap';
import { Formik, Field, Form } from 'formik';

/** 
 * Prop initialValues expects a JavaScript object and is used to set the initial form values. 
 * It is defined as an object literal by enclosing the key-value pairs in curly braces.
 * The outer set of curly braces is required for using JavaScript inside JSX. 
 * The inner set of curly braces is used to define a JavaScript object. 
 * @return {JSX.Element}
 */
const ContactForm = () => {
return (
    <Formik
      initialValues={{ 
        firstname: '', 
        lastName: '', 
        phoneNumber: '', 
        email: '', 
        agree: false, 
        contactType: 'By Phone', 
        feedback: '' 
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      { /* Form is imported from Formik and is used to create a form with validation and submission handling. */ }
      { /* FormGroup is from reactstrap and is used to group form controls and labels together in a structured way.
      Similar to bootstrap's form-group */ }
      <Form>
        <FormGroup row>
            <Label htmlFor='firstName' md='2'>
                First Name
            </Label>
            <Col md='10'>
                <Field name='firstName' placeholder='First Name' className='form-control' />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label htmlFor='lastName' md='2'>
                Last Name
            </Label>
            <Col md='10'>
                <Field name='lastName' placeholder='Last Name' className='form-control' />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label htmlFor='phoneNum' md='2'>
                Phone
            </Label>
            <Col md='10'>
                <Field name='phoneNum' placeholder='Phone' className='form-control' />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label htmlFor='email' md='2'>
                Email
            </Label>
            <Col md='10'>
                <Field name='email' placeholder='Email' className='form-control' />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label check md={{ size: 4, offset: 2 }}>
                <Field
                    name='agree'
                    type='checkbox'
                    className='form-check-input'
                />{' '}
                May we contact you?
            </Label>
            <Col md='4'>
            {/* A select menu for contact type instead of a form field*/}
                <Field name='contactType' as='select' className='form-control'>
                    <option>By Phone</option>
                    <option>By Email</option>
                </Field>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label htmlFor='feedback' md='2'>
                Your Feedback
            </Label>
            <Col md='10'>
                <Field name='feedback' as='textarea' rows='12' className='form-control' />
            </Col>
        </FormGroup>
        <FormGroup row>
        </FormGroup>
      </Form>
    </Formik>
  );
};

export default ContactForm;