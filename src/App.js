import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';
import AboutBtnLink from './components/AboutBtnLink';
import { FeedbackProvider } from './context/FeedbackContext';

const App = () => {
    // Create state

    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <>
                                    <FeedbackForm />
                                    <FeedbackStats />
                                    <FeedbackList />
                                    <AboutBtnLink />
                                </>
                            }
                        ></Route>
                        <Route path="/about" element={<AboutPage />}>
                            This is the About route.
                        </Route>
                    </Routes>
                </div>
            </Router>
        </FeedbackProvider>
    );
};

export default App;
