import { useState } from 'react';

function FeedbackItem() {
    const [rating, setRating] = useState(7);
    const [text, setText] = useState('This is feedback you should consider...');

    const handleClick = () => {
        setRating((prev) => prev + 1);
    };

    return (
        <div className="card">
            <div className="num-display">{rating}</div>
            <div className="text-display">{text}</div>
            <button onClick={handleClick}></button>
        </div>
    );
}

export default FeedbackItem;
