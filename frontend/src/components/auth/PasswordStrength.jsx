import React from 'react'
import { getPasswordStrength } from '../../helpers/passwordHelper'

const PasswordStrength = ({ password }) => {
    const passwordStrength = getPasswordStrength(password)

    if (!password) return null

    return (
        <div className="password-strength">
            <div className="strength-bar">
                <div 
                    className="strength-fill" 
                    style={{ 
                        width: passwordStrength.width,
                        backgroundColor: passwordStrength.color 
                    }}
                ></div>
            </div>
            <span className="strength-text" style={{ color: passwordStrength.color }}>
                {passwordStrength.strength}
            </span>
        </div>
    )
}

export default PasswordStrength
