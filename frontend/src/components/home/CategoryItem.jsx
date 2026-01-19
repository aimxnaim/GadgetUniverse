import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ title, count, imgSrc, category }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link 
            to={`/store?category=${encodeURIComponent(category)}`} 
            style={{
                display: 'block',
                textDecoration: 'none',
                backgroundColor: '#f5f5f5',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                cursor: 'pointer',
                position: 'relative'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                position: 'relative',
                height: '200px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <img
                    src={imgSrc}
                    alt={title}
                    style={{ 
                        width: '120px', 
                        height: '120px',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    loading="lazy"
                />
            </div>
            <div style={{
                padding: '1.25rem',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e5e5e5'
            }}>
                <h6 style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#111',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                }}>{title}</h6>
                <p style={{
                    fontSize: '0.9rem',
                    color: '#757575',
                    marginBottom: '0',
                    fontWeight: '500'
                }}>{count} items</p>
            </div>
            {isHovered && (
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#111',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>Shop Now</div>
            )}
        </Link>
    )
}

export default CategoryItem