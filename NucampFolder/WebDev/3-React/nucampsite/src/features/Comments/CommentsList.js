import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { selectCommentsByCampsiteId } from './commentsSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const CommentsList = ({ campsiteId }) => {
    // Get initial comments for this campsite
    const comments = useSelector(selectCommentsByCampsiteId(campsiteId));
   /**
     * @param {Object} state - The Redux state
     * @returns {Object} - The comments state, an object containing the isLoading, errMsg, and 
     * commentsArray properties.
     * @description This selector retrieves the comments state from the Redux store.
     * We need to get the isLoading, errMsg, and commentsArray properties from the comments state
     * and pass them to the component as props.
     *
     * Instead of defining a function name and passing the function name to useSelector
     * we can use the selector directly inside the useSelector call.
     * This selector could also be done by placing the useSelector in commentsSlice.js, which
     * would allow us to encapsulate the state selection logic.
     * It is kept here for simplicity and clarity. Additionally, it keeps the component more 
     * readable by reducing the number of hooks used.
     * This approach also makes it easier to manage and test a component's state.
     * Finally, it can improve performance by minimizing the number of re-renders.
     */
   const isLoading  = useSelector((state) => state.comments.isLoading);
   const errMsg = useSelector((state) => state.comments.errMsg);
   if (isLoading) {
       return (
           <Row>
               {/* Show a loading spinner (from Loading component) while data is being fetched */}
               <Loading />
           </Row>
       );
   }

    if (errMsg) {
        return (
            <Row>
                {/* Pass errMsg as a prop to the Error component so that it can display it */}
                <Error errMsg={errMsg} />
            </Row>
        );
    }
    if (comments && comments.length > 0) {
        /**
         * @component CommentsList
         * @description A component that displays a list of comments for a specific campsite.
         * It also includes a form to add new comments.
         * @render Render the list of comments and the CommentForm component
         * If there are comments, @map over the comments array and render each comment
         * using the Comment component. Also render the CommentForm component to allow
         * users to add new comments.
         *
         * @prop {campsiteId} - The ID of the campsite the comment is for.
         * The CommentForm component is passed the campsiteId as a prop so that it knows
         * which campsite the new comment is for.
         *
         * @prop {key} - Each Comment component is given a unique key prop using the comment's id
         * to help React identify which items have changed, are added, or are removed.
         * This improves performance when rendering lists of items.
         *
         * @bootstrap {grid} - Bootstrap's grid system is used for layout. The comments are wrapped in a Col
         * component from reactstrap to provide responsive layout and styling.
         * --IGNORE The md='5' prop specifies that the column should take up 5 out of 12 columns
         * I went responsive and made it 100% width on small screens (xs) and 5/12
         * on medium and larger screens, and the m-1 class adds margin around the column.
         * The h4 element is used to display a heading for the comments section.
         */
        return (
            <div className='comments-column m-1'>
                <h4>Comments</h4>
                <div className='comments-list'>
                    {comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment} />
                    })}
                </div>
                <CommentForm campsiteId={campsiteId} /> 
            </div>
        );
    }
    return (
        <div className='comments-column m-1'>
            <h4>Comments</h4>
            <div>
                <div>There are no comments for this campsite yet.</div>
            </div>
            <CommentForm campsiteId={campsiteId} />
        </div>
    );
};

export default CommentsList;
          