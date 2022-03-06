import RatingSelect from './RatingSelect';

import { useContext, useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const { addFeedback } = useContext(FeedbackContext);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            };

            addFeedback(newFeedback);
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
