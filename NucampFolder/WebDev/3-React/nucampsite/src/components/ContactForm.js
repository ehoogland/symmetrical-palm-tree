import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, Label, Col, FormGroup } from 'reactstrap';
import { validateContactForm } from '../utils/validateContactForm';

/**
 * JavaScript object that looks a lot like the initial values object, with the same properties, but
 * the properties will be whatever the user has typed into the form fields and submitted.
 * 
 * The handleSubmit function is passed to Formik as a prop and is called when the form is submitted.
 *
 *  Logs the form values to the console. Normally we would be sending the value
 *  to a backend database for processing and storage.
 *
 *  Logs the form values in JSON format, because if you want to send the content of JavaScript objects
 *  to another computer, they can't be sent as-is, but can be easily converted to a
 *  JSON text string using the JSON.stringify() method. 
 * 
 *  resetForm() resets the form to its initial state after form contents have been submitted
 */

const ContactForm = () => {
    const handleSubmit = (values, { resetForm }) => {
    // console.log('form values:', values);
    // console.log('in JSON format:', JSON.stringify(values));
        resetForm();
    };
    
    /** 
     * Prop initialValues expects a JavaScript object and is used to set the initial form values. 
     * It is defined as a JavaScript object literal because it encloses the key-value pairs in the inner
     * set of curly braces. Recall that an object literal is a concise way to create an object directly 
     * in your code.
     * 
     * The outer set of curly braces is required for using JavaScript inside JSX.
     * @return {JSX.Element}
     */
    return (
        <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            phoneNum: '', 
            email: '', 
            agree: false, 
            contactType: 'By Phone', 
            feedback: ''
        }}
            validate={validateContactForm}
            onSubmit={handleSubmit}
        >
            <Form>
                <FormGroup row>
                    <Label htmlFor='firstName' md='2'>
                        First Name
                    </Label>
                    <Col md='10'>
                        <Field name='firstName'
                            placeholder='First Name'
                            className='form-control'
                        />
                        <ErrorMessage name='firstName'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='lastName' md='2'>
                        Last Name
                    </Label>
                    <Col md='10'>
                        <Field name='lastName'
                            placeholder='Last Name'
                            className='form-control'
                        />
                        <ErrorMessage name='lastName'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='phoneNum' md='2'>
                        Phone
                    </Label>
                    <Col md='10'>
                        <Field name='phoneNum'
                            placeholder='Phone'
                            className='form-control'
                        />
                        <ErrorMessage name='phoneNum'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor='email' md='2'>
                        Email
                    </Label>
                    <Col md='10'>
                        <Field name='email'
                            placeholder='Email'
                            className='form-control'
                        />
                        <ErrorMessage name='email'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
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
                    <Col md={{ size: 10, offset: 2 }}>
                        <Button type='submit' color='primary'>
                            Send Feedback
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </Formik>
    );
};

export default ContactForm;