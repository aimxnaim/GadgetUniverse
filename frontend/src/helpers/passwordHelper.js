export const getPasswordStrength = (password) => {
    if (!password) return { strength: '', color: '', width: '0%', level: 0 }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 2) return { strength: 'Weak', color: '#ff4444', width: '33%', level: 1 }
    if (strength <= 3) return { strength: 'Medium', color: '#ffaa00', width: '66%', level: 2 }
    return { strength: 'Strong', color: '#00cc66', width: '100%', level: 3 }
}
