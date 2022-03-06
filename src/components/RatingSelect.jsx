import { useState, useContext, useEffect } from 'react';
import FeedbackContext from '../context/FeedbackContext';

// Select element to let user choose score from 1-10
function RatingSelect({ select }) {
    // 10 selected by default
    const [selected, setSelected] = useState(10);

    // bring in app data context
    const { feedbackEdit } = useContext(FeedbackContext);

    // selected existing review for editing
    // so change selected score to reflect existing
    useEffect(() => {
        setSelected(feedbackEdit.item.rating);
    }, [feedbackEdit]);

    // User change of select
    const handleChange = (e) => {
        setSelected(+e.currentTarget.value);
    };

    // FeedbackForm handles this state -> call setter from here
    select(selected);

    return (
        <ul className="rating">
            {Array.from({ length: 10 }, (_, i) => (
                <li key={`rating-${i + 1}`}>
                    <input
                        type="radio"
                        id={`num${i + 1}`}
                        name="rating"
                        value={i + 1}
                        onChange={handleChange}
                        checked={selected === i + 1}
                    />
                    <label htmlFor={`num${i + 1}`}>{i + 1}</label>
                </li>
            ))}
        </ul>
    );
}

export default RatingSelect;
