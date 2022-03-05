import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <Card>
            <div className="about">
                <h1>About This Project:</h1>
                <p>This is a React App that can be used to collate reviews.</p>
                <p>Version 1.0.0</p>
                <Link to="/">Home</Link>
            </div>
        </Card>
    );
};

export default AboutPage;
