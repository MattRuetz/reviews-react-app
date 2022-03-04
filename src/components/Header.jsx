const Header = ({ text, bgColor, textColor }) => {
    const headerStyle = {
        backgroundColor: bgColor,
        color: textColor,
    };

    return (
        <header style={headerStyle}>
            <div className="container">
                <h1>{text}</h1>
            </div>
        </header>
    );
};

export default Header;
