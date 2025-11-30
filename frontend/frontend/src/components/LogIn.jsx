import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. Animation Components ---
const AnimationStyles = () => (
    <style>
        {`
      @keyframes fall {
        0% { transform: translateY(-10vh); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(110vh); opacity: 0; }
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
      
      .effects-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
      }
    `}
    </style>
);

const Snowflakes = () => {
    const snowflakeArray = Array(50).fill(); 

    return (
        <div className="effects-container">
            {snowflakeArray.map((_, index) => {
                const style = {
                    left: `${Math.random() * 100}vw`,
                    animationDuration: `${Math.random() * 5 + 8}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: `${Math.random() * 0.7 + 0.3}`
                };
                return <div key={index} className="snowflake" style={style} />;
            })}
        </div>
    );
};

// --- 2. Main Component ---
function LogIn({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const ADMIN_PASSWORD = '12345678';

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        if (password === ADMIN_PASSWORD) {
            onLogin();
            navigate("/admin");
        } else {
            setError('Invalid password. Please try again.');
            setPassword('');
        }
    };

    // Styling
    const formStyle = { 
        margin: 'auto', 
        padding: '2rem', 
        maxWidth: '400px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
        borderRadius: '8px', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        width: '100%',
        position: 'relative', 
        zIndex: 10 
    };

    const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
    const labelStyle = { fontWeight: '600', marginBottom: '0.5rem', color: '#325833' };
    const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
    const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#325833', color: 'white', fontSize: '1rem', cursor: 'pointer' };
    const backgroundImageUrl = '/background1.jpg';

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: 'relative', 
            overflow: 'hidden'    
        }}>
            <AnimationStyles />
            <Snowflakes />

            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{textAlign: 'center', color: '#1D351F'}}>Admin Login</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div style={divStyle}>
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={buttonStyle}>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default LogIn;