import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';

const FeedbackForm = () => {
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

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

    return (
        <Card>
            <form>
                <h2>How would you rate the service you recieved?</h2>
                {/* {Rating select component goes here .... TODO} */}
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
