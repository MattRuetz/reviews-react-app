import FeedbackItem from './FeedbackItem';
import PropTypes from 'prop-types';

// Component for entire list of feedback cards
// props: feedback - Array of all feedback items as React State
const FeedbackList = ({ feedback, handleDelete }) => {
    if (!feedback || feedback.length === 0) {
        return <p>No Feedback... yet!</p>;
    }

    console.log(feedback);

    return (
        <div className="feedback-list">
            {feedback.map((item) => (
                <FeedbackItem
                    key={item.id}
                    item={item}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
        })
    ),
};

export default FeedbackList;
