import RatingSelect from './RatingSelect';
import { useContext, useState, useEffect } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
    // Local states for Form element
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const { addFeedback, feedbackEdit, updateFeedback } =
        useContext(FeedbackContext);

    // Watch feedbackEdit to see if a new change has been submitted...
    useEffect(() => {
        //when feedbackEdit changes (currently editing)
        if (feedbackEdit.edit === true) {
            // Fill feedback entry form with info of review being edited
            console.log(feedbackEdit.item);
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);

    // Handle changes to the input to update applic. states
    const handleChange = (e) => {
        if (text === '') {
            setBtnDisabled(true);
            setMessage('');
        } else if (text.trim().length < 10) {
            setBtnDisabled(true);
            setMessage('Review must be at least 10 characters long!');
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(e.target.value);
    };

    // Handles submission of form - adding or modifying a review item
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            };

            if (!feedbackEdit.edit) {
                addFeedback(newFeedback);
            } else {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            }
            setText('');
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate the service you recieved?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className="input-group">
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Write your review here"
                        value={text}
                    />
                    <Button
                        children="Send"
                        type="submit"
                        isDisabled={btnDisabled}
                    ></Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
};

export default FeedbackForm;
