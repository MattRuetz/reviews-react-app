import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';

const FeedbackForm = () => {
    const [text, setText] = useState('');

    const handleChange = (e) => {
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
                    <Button children="Send" type="submit"></Button>
                </div>
            </form>
        </Card>
    );
};

export default FeedbackForm;
