import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const BreadCrumb = (props) => {
    const { title, makan } = props;
    return (
        <div className="breadcrumb py-4 mb-0">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <nav aria-label="breadcrumb ">
                            <ol className="breadcrumb mb-0 ">
                                <li key='1' className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li key='2' className="breadcrumb-item active" aria-current="page">{title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumb