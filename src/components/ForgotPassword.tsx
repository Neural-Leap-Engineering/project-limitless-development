
import React, { useState } from 'react';
import './ForgotPassword.scss';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate password reset logic (send email)
        setMessage('If this email is registered, you will receive a password reset link.');
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handlePasswordReset}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {message && <p className="message">{message}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
