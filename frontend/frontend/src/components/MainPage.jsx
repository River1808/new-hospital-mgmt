import React from "react";
import { Link } from "react-router-dom";

const backgroundImageUrl = "/hospital-bg.jpg";
const presentImageUrl = "/red_present.png"; 

const AnimationStyles = () => (
    <style>
        {`
      @keyframes fall {
        0% {
          transform: translateY(-10vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(110vh) rotate(360deg);
          opacity: 0;
        }
      }

      .snowflake {
        position: absolute;
        top: -10px;
        left: 0;
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 5px white, 0 0 10px white;
        animation: fall linear infinite;
      }

      .present {
        position: absolute;
        top: -50px; /* Start higher because presents are bigger */
        background-image: url('${presentImageUrl}');
        background-size: contain;
        background-repeat: no-repeat;
        /* Using the same fall animation, but the rotate in keyframes helps them tumble */
        animation: fall linear infinite;
      }
      
      .effects-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        pointer-events: none; /* Ensures clicks pass through to buttons */
      }
    `}
    </style>
);

const Snowflakes = () => {
    const snowflakeArray = Array(100).fill();

    return (
        <div className="effects-container">
            {snowflakeArray.map((_, index) => {
                const style = {
                    left: `${Math.random() * 100}vw`,
                    animationDuration: `${Math.random() * 5 + 8}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: `${Math.random() * 0.7 + 0.3}`
                };
                return <div key={`snow-${index}`} className="snowflake" style={style} />;
            })}
        </div>
    );
};

const Presents = () => {
    const presentArray = Array(10).fill();

    return (
        <div className="effects-container">
            {presentArray.map((_, index) => {
                const size = Math.random() * 20 + 30; 
                const style = {
                    left: `${Math.random() * 95}vw`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDuration: `${Math.random() * 4 + 6}s`, 
                    animationDelay: `${Math.random() * 10}s`, 
                    opacity: 0.9
                };
                return <div key={`present-${index}`} className="present" style={style} />;
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
        position: "relative",
        overflow: "hidden" 
    };

    const contentStyle = {
        textAlign: "center",
        padding: "2.5rem 3rem",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        position: "relative",
        zIndex: 10 
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
        backgroundColor: '#1D351F'
    };

    const buttonStyleWarning = {
        ...buttonStyle,
        backgroundColor: '#325833'
    };

    return (
        <div style={containerStyle}>
            <AnimationStyles />
            
            {/* Render both effects */}
            <Snowflakes />
            <Presents />

            <div style={contentStyle}>
                <h1 style={{ color: '#333', marginTop: 0 }}>Hospital Staff Portal</h1>
                <p style={{ color: '#555', fontSize: '1.1rem' }}>Choose an option:</p>

                <div>
                    <Link to="/leaverequestform">
                        <button style={buttonStyleTertiary}>Leave Request Form</button>
                    </Link>

                    <Link to="/login">
                        <button style={buttonStyleWarning}>Admin Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}