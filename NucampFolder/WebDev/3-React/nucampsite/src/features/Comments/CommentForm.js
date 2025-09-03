import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    FormGroup, 
    Label 
} from "reactstrap";
import { validateCommentForm } from '../../utils/validateCommentForm';
import { addComment } from './commentsSlice';
// CommentForm component lets users add comments to a campsite.
// Formik form handling and validation
const CommentForm = ({ campsiteId }) => {
    /* The useState hook for modalOpen and setModalOpen is set up
        and initialized to false by passing false to useState */
    const [modalOpen, setModalOpen] = useState(false);
    /**
     * useDispatch hook to get the dispatch function
     * This function is used to dispatch actions to the Redux store.
     * @see https://react-redux.js.org/api/hooks#usedispatch
     * @returns {Function} - The dispatch function.
     * @example
     * const dispatch = useDispatch();
     * dispatch(addComment(comment));
     * @method {Function} dispatch is a method of the Redux store object.
     */
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const comment = {
            campsiteId: parseInt(campsiteId),
            rating: parseInt(values.rating),
            text: values.commentText,
            author: values.author,
            date: new Date(Date.now()).toISOString()
        };
        // The addComment action creator function is dispatched with the new comment.
        // It will run and return an action object with a type property of 'comments/addComment'
        // and a payload property of the new comment object. That action object will be
        // dispatched by the dispatch function which will cause the case reducer for addComment
        // to run, pushing this new comment object into the comments array that is part of the global
        // state in the Redux store. Then, since our Comments component is getting its data from that
        // same single source of truth, it will automatically update to show the new comment.
        dispatch(addComment(comment));
        // Log the returned values for debugging
        // console.log('addComment values:', values);
        // console.log('in JSON format:', JSON.stringify(values));

        // Reset the form after submission
        // The resetForm function is provided by Formik
        // Note that the order of operations matters:
        // we want to add the comment first, then
        // clear the form, and finally close the modal.
        // If we closed the modal first, the form would not 
        // reset properly because the component would
        // close (unmount) before resetForm() is called.
        resetForm();
    // console.log('comment:', comment);
        setModalOpen(false);
    };
    /* CommentForm renders a Button that opens a Modal. 
    The Modal displays a header with a close toggle and     
    shows the current campsiteId in the body.

    Fragment syntax ( <>...</> ) is used to group multiple
    elements without adding extra nodes to the DOM.
    */
    return (
        <>
            <Button outline onClick={() => setModalOpen(true)}>
                <i className='fa fa-pencil fa-lg' /> Add Comment
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Add Comment
                </ModalHeader>
                <ModalBody>
                    {/* The Formik component is used to create a form.*/}
                    {/* Formik's internal logic ensures that validation happens after built-in onBlur is triggered by an input field. */}
                    {/* Validation for all fields is triggered when the form is submitted. */}
                    <Formik
                        initialValues={{ 
                            
                            rating: '',
                            author: '',
                            commentText: ''
                        }}
                        onSubmit={handleSubmit}
                        validate={validateCommentForm} 
                    >
                            <Form>
                                <FormGroup>
                                    <Label htmlFor='rating'>Rating</Label>
                                    <Field
                                        name='rating'
                                        as='select'
                                        className='form-control'
                                    >
                                        <option value={''}>Select...</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Field>
                                    <ErrorMessage name='rating'>
                                        {(msg) => <p className='text-danger'>{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='author'>Your Name</Label>
                                    <Field
                                        name='author'
                                        placeholder='Your Name'
                                        className='form-control'
                                    />
                                    <ErrorMessage name='author'>
                                        {(msg) => <p className='text-danger'>{msg}</p>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='commentText'>Comment</Label>
                                    <Field
                                        name='commentText'
                                        as='textarea'
                                        rows='12'
                                        className='form-control'
                                    />
                                </FormGroup>
                                <Button type='submit' color='primary'>
                                    Submit
                                </Button>
                            </Form>
                        
                    </Formik>
                    {/* This test div displays the current campsiteId on the modal. */}
                    {/* <div>campsite: {campsiteId}</div> */}
                </ModalBody>
            </Modal>
        </>
    );
};

export default CommentForm;
