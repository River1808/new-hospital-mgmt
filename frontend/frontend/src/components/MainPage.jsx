import React from "react";
import { Link } from "react-router-dom";

const backgroundImageUrl = "/hospital-bg.jpg";

const SnowStyles = () => (
    <style>
        {`
      @keyframes fall {
        0% {
          transform: translateY(-10vh);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(110vh);
          opacity: 0;
        }
      }

      .snowflake {
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 5px white, 0 0 10px white;
        
        /* This is where the animation is applied */
        animation: fall linear infinite;
      }
      
      .snow-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden; /* Hide snowflakes that are off-screen */
        z-index: 1; /* Make sure snow is on top of background */
      }
    `}
    </style>
);

const Snowflakes = () => {
    const snowflakeArray = Array(100).fill();

    return (
        <div className="snow-container">
            {snowflakeArray.map((_, index) => {
                const style = {
                    left: `${Math.random() * 100}vw`, // Random horizontal position
                    animationDuration: `${Math.random() * 5 + 8}s`, // Random speed
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: `${Math.random() * 0.7 + 0.3}`
                };
                return <div key={index} className="snowflake" style={style} />;
            })}
        </div>
    );
};


export default function Dashboard() {
    const containerStyle = {
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box",
        position: "relative"
    };

    // Style for the content box (the text)
    const contentStyle = {
        textAlign: "center",
        padding: "2.5rem 3rem",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        position: "relative",
        zIndex: 2
    };


    const buttonStyle = {
        display: 'inline-block',
        padding: '12px 24px',
        margin: '10px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const buttonStyleTertiary = {
        ...buttonStyle,
        backgroundColor: '#28a745'
    };

    const buttonStyleWarning = {
        ...buttonStyle,
        backgroundColor: '#ffc107'
    };


    return (
        <div style={containerStyle}>
            <SnowStyles />
            <Snowflakes />

            <div style={contentStyle}>
                <h1 style={{ color: '#333', marginTop: 0 }}>Hospital Staff Portal</h1>
                <p style={{ color: '#555', fontSize: '1.1rem' }}>Choose an option:</p>

                <div>
                    <Link to="/shifts">
                        <button style={buttonStyleTertiary}>Leave Request Form</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}