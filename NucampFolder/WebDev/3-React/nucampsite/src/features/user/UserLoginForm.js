import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from './userSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
// Add ErrorMessage to the list of components imported from Formik
import { Formik, Field, Form, ErrorMessage } from 'formik';
import defaultAvatar from '../../app/assets/img/unicorn.png';
// Import the validateUserLoginForm function from the appropriate path for form validation
import { validateUserLoginForm } from '../../utils/validateUserLoginForm';

/**
 * UserLoginForm - modal login form using Formik and Redux.
 * Handles dispatching the logged-in user to the store.
 */
const UserLoginForm = () => {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch(); 

    /**
     * handleLogin - Formik onSubmit handler.
     * @param {Object} values - form values from Formik
     * @param {Object} helpers - Formik helpers object
     * @param {Function} helpers.resetForm - resets form to initialValues
     * Dispatches the constructed user to Redux, resets the form, and closes the modal.
     */
    const handleLogin = (values, { resetForm }) => {
        const currentUser = {
            id: Date.now(), // Unique ID based on timestamp
            avatar: defaultAvatar,
            username: values.username,
            password: values.password,
                ...values
            };
            // Dispatch the login action with the currentUser object just constructed
            dispatch(setCurrentUser(currentUser));
            // Clear the form values (Formik helper)
            if (typeof resetForm === 'function') resetForm();
            // Close the modal
            setLoginModalOpen(false);
        };
        // ref to the password input so we can move focus from username to password on Enter
        const passwordRef = useRef(null);
    // Render the login modal and Formik-managed form
    return (
          <>
            {currentUser ? (
                <span className='navbar-text ms-auto'>
                    <Button
                        outline
                        onClick={() => dispatch(setCurrentUser(null))}
                        style={{ padding: 0, border: 'none', background: 'transparent' }}
                        aria-label="Logout"
                    >
                        <div style={{ width: '4rem', height: '4rem' }}>
                            <img
                                src={currentUser.avatar}
                                alt="user"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </Button>
                </span>
            ) : (
                <span className='navbar-text ml-auto'>
                    <Button
                        outline
                        onClick={() => setLoginModalOpen(true)}
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        <i className='fa fa-sign-in fa-lg' /> Login
                    </Button>
                </span>

            )}

            <Modal isOpen={loginModalOpen}>
                <ModalHeader toggle={() => setLoginModalOpen(false)}>Login</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validateOnMount={true}
                        validate={validateUserLoginForm}
                        onSubmit={handleLogin}
                    >
                        {/* Formik render-prop: receives the formik bag (values, errors, touched, isValid, etc.) */}
                        {({ isValid, touched }) => (
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Field
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        className="form-control"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (passwordRef.current) passwordRef.current.focus();
                                            }
                                        }}
                                    />
                                    <ErrorMessage name='username'>
                                        {(msg) => <p className='text-danger'>{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Field id="password" name="password" type="password" placeholder="Password" className="form-control" innerRef={passwordRef} />
                                    <ErrorMessage name='password'>
                                        {(msg) => <p className='text-danger'>{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={!isValid || Object.keys(touched).length === 0}
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserLoginForm;