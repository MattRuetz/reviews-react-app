import PropTypes from 'prop-types';

const FeedbackStats = ({ feedback }) => {
    // Calulate average of review scores
    let average =
        feedback.reduce((acc, cur) => {
            return acc + cur.rating;
        }, 0) / feedback.length;

    //limit to 1 decimal place
    average = average.toFixed(1);

    return (
        <div className="feedback-stats">
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    );
};

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired,
};

export default FeedbackStats;