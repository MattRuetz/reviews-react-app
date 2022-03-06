import { createContext, useState, useEffect } from 'react';

// Context for all list data, and to offer global getters/setters
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

    // Fetch and load data saved in DB
    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false); // finished loading
    };

    // DELETE request to server - remove a review from DB
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            await fetch(`feedback/${id}`, { method: 'DELETE' });
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    // POST request to server - add new review to DB
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

    // Saves the item on which the edit button was clicked to state
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    };

    // PUT request to server - update an item and overwrite in DB
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
            feedback.map((item) =>
                item.id === id ? { ...item, ...data } : item
            )
        );
    };

    // Context Provider element, with all states and setters
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
