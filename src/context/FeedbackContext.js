import { m } from 'framer-motion';
import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    //Global state for feedback (in context)
    const [feedback, setFeedback] = useState([]);
    // Global state holds current item being edited (in context)
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });
    // Global state to show a spinner when loading review list
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const data = await response.json();
        // console.log(data);
        setFeedback(data);
        setIsLoading(false);
    };

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            await fetch(`feedback/${id}`, { method: 'DELETE' });
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        });

        const data = await response.json();

        setFeedback([data, ...feedback]);
    };

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    };

    const updateFeedback = async (id, updatedItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });

        const data = await response.json();

        setFeedback(
            feedback.map((item) => (item.id === id ? updatedItem : item))
        );
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
