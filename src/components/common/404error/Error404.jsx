import React from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';



const NotFoundPage = () => {
    const notFoundStyle = {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    };

    const headerStyle = {
        fontSize: "36px",
        color: "#b33131", // Красный цвет (можете изменить на свой выбор)
    };

    const iconStyle = {
        fontSize: "48px",
        color: "#d9534f",
    };

    return (
        <div style={notFoundStyle}>
            <SentimentVeryDissatisfiedIcon style={iconStyle} />
            <h1 style={headerStyle}>404 - Страница не найдена</h1>
            <p>Извините, запрашиваемая страница не существует.</p>
        </div>
    );
};

export default NotFoundPage;
