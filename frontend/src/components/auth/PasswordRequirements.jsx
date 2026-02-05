import React from 'react'

const PasswordRequirements = ({ password }) => {
    const requirements = [
        {
            text: 'At least 8 characters',
            test: (pwd) => pwd.length >= 8
        },
        {
            text: 'Upper and lowercase letters',
            test: (pwd) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd)
        },
        {
            text: 'At least one number',
            test: (pwd) => /\d/.test(pwd)
        }
    ]

    return (
        <div className="password-requirements">
            <div className="requirements-header">
                <i className="fas fa-info-circle"></i>
                <span>Password Requirements:</span>
            </div>
            <ul className="requirements-list">
                {requirements.map((req, index) => (
                    <li 
                        key={index} 
                        className={password && req.test(password) ? 'requirement-met' : 'requirement-unmet'}
                    >
                        <i className={`fas ${password && req.test(password) ? 'fa-check-circle' : 'fa-circle'}`}></i>
                        <span>{req.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PasswordRequirements
