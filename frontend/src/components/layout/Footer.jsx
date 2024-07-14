import React from 'react'
import { Link } from 'react-router-dom'

const footer = () => {
    return (
        <>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row align-items-center mt-4 ">
                        <div className="col-5">
                            <div className="footer-top-data d-flex gap-30 align-items-center ">
                                <img
                                    src="/images/youtube/email.svg"
                                    alt="newsletter"
                                    style={{ width: '70px', height: '70px' }}
                                />
                                <div className="footer-top-content">
                                    <h3 className="text-white">Sign up for newsletter</h3>
                                    <p className="text-white">Get updates on sales and events in the community</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-7">
                            <div className='input-group'>
                                <div className="form-floating ">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Your Email Address"
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <button className="btn btn-outline-secondary" type="button">Subscribe</button>

                            </div>
                        </div>
                    </div>
                </div>

            </footer>
            <footer className="py-3">


            </footer>
            <footer className="py-4">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center text-white">
                                &copy; GadgetUniverse - {new Date().getFullYear()}
                            </p>
                            <p className="text-center text-white mb-3 ">
                                Developed and built by <Link className='link-footer' to='https://www.aimanaim.works'>Aiman Naim</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default footer