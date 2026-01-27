import React, { useState } from 'react'

const ProductSidebar = ({ sections, activeSection, onSectionChange }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="product-sidebar-container">
            {/* Toggle Button for Mobile */}
            <button 
                className="sidebar-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Toggle sidebar"
            >
                <i className={`fas fa-${isExpanded ? 'chevron-left' : 'chevron-right'}`}></i>
            </button>

            {/* Sidebar */}
            <div className={`product-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-icon">
                        <i className="fas fa-th"></i>
                    </div>
                    <h4 className="sidebar-title">Collections</h4>
                </div>

                <nav className="sidebar-nav">
                    {sections?.map((section, index) => (
                        <button
                            key={index}
                            className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => onSectionChange(section.id)}
                            title={section.title}
                        >
                            <span className="item-icon">
                                <i className={section.icon}></i>
                            </span>
                            <span className="item-label">{section.title}</span>
                            {activeSection === section.id && (
                                <span className="item-indicator">
                                    <i className="fas fa-check"></i>
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Decorative Footer */}
                <div className="sidebar-footer">
                    <p className="footer-text">Browse our amazing collections</p>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isExpanded && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setIsExpanded(false)}
                ></div>
            )}
        </div>
    )
}

export default ProductSidebar
