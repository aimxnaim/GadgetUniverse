import React from 'react'
import MetaData from './MetaData'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <MetaData title={'Page Not Found'} />
            <div className="not-found-container">
                <div className="not-found-content">
                    <div className="not-found-animation">
                        <div className="error-code">
                            <span className="four">4</span>
                            <span className="zero-wrapper">
                                <span className="zero">0</span>
                                <div className="spinning-gadget">
                                    <i className="fas fa-cog"></i>
                                </div>
                            </span>
                            <span className="four">4</span>
                        </div>
                        <div className="floating-icons">
                            <i className="fas fa-shopping-cart floating-icon icon-1"></i>
                            <i className="fas fa-laptop floating-icon icon-2"></i>
                            <i className="fas fa-mobile-alt floating-icon icon-3"></i>
                            <i className="fas fa-headphones floating-icon icon-4"></i>
                        </div>
                    </div>
                    
                    <div className="not-found-text">
                        <h2 className="not-found-title">Oops! Page Not Found</h2>
                        <p className="not-found-description">
                            The page you're looking for seems to have wandered off into the digital void. 
                            Don't worry, we have plenty of amazing gadgets waiting for you!
                        </p>
                        
                        <div className="not-found-actions">
                            <Link to="/" className="btn-home">
                                <i className="fas fa-home"></i>
                                Back to Homepage
                            </Link>
                            <Link to="/store" className="btn-products">
                                <i className="fas fa-shopping-bag"></i>
                                Browse Products
                            </Link>
                        </div>
                        
                        <div className="helpful-links">
                            <p className="helpful-text">You might be interested in:</p>
                            <div className="quick-links">
                                <Link to="/store?category=Laptops" className="quick-link">
                                    <i className="fas fa-laptop"></i> Laptops
                                </Link>
                                <Link to="/store?category=Headphones" className="quick-link">
                                    <i className="fas fa-headphones"></i> Headphones
                                </Link>
                                <Link to="/store?category=Accessories" className="quick-link">
                                    <i className="fas fa-plug"></i> Accessories
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound