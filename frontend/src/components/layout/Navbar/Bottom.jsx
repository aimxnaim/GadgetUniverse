import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PRODUCT_CATEGORIES } from '../../../constants/constants'

const Bottom = () => {
    return (
        <div className="header-bottom py-3">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="menu-bottom d-flex align-items-center gap-30 ">
                            <div>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center me-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="/images/youtube/menu.svg" alt="menu" />
                                        <span className='me-5 d-inline-block'>
                                            Shop Categories
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        {PRODUCT_CATEGORIES.map((category, index) => (
                                            <>
                                                <li><Link className="dropdown-item text-white" to="#">{category}</Link></li>
                                            </>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='menu-links'>
                                <div className="d-flex align-items-center gap-15">
                                    <NavLink to='/'>Home</NavLink>
                                    <NavLink to='/'>Blogs</NavLink>
                                    <NavLink to='/'>Contact</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bottom