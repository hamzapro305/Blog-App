const BackDrop = ({ children }) => {
    return (
        <div
            className="BackDrop"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "#000000AA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                zIndex: 100,
                height: "100vh",
            }}
        >
            {children}
        </div>
    );
};

export default BackDrop;
