import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideMenu = ({ menuItems }) => {

    const location = useLocation()
    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname)

    const handleMenuItemClick = (menuItemUrl) => {
        setActiveMenuItem(menuItemUrl)
    }

    return (
        <div className="side-menu-container">
            <div className="side-menu-card">
                <div className="menu-header">
                    <i className="fas fa-list-ul"></i>
                    <span>Navigation</span>
                </div>
                <div className="menu-items">
                    {menuItems?.map((menuItem, index) => (
                        <Link
                            key={index}
                            to={menuItem.url}
                            className={`menu-item ${activeMenuItem.includes(menuItem.url) ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick(menuItem.url)}
                        >
                            <div className="menu-item-icon">
                                <i className={menuItem.icon}></i>
                            </div>
                            <div className="menu-item-content">
                                <span className="menu-item-name">{menuItem.name}</span>
                                {menuItem.description && (
                                    <small className="menu-item-desc">{menuItem.description}</small>
                                )}
                            </div>
                            <div className="menu-item-arrow">
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideMenu