import React from 'react'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import { GoHome } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";

const Contact = () => {
    return (
        <>
            <MetaData title={'Contact Us'} />
            <BreadCrumb title='Contact Us' />
            <div className="contact-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7973.642001334806!2d102.45011142105778!3d2.2210318914393725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1c2904d683dc3%3A0x216b1d164eba26a1!2sUniversiti%20Teknologi%20MARA%20(UiTM)%20Cawangan%20Melaka%20Kampus%20Jasin!5e0!3m2!1sen!2smy!4v1721217560118!5m2!1sen!2smy"
                                width="600"
                                height="450"
                                className='border-0 w-100'
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="contact-inner-wrapper d-flex justify-content-between">
                                <div>
                                    <img
                                        src="/images/contact.svg"
                                        alt=""
                                        style={{ width: '250px', height: '100%', marginLeft: '110px' }}
                                    />
                                </div>
                                <div>
                                    <h3 className="contact-title">Get in Touch with Us</h3>
                                    <ul className='p-0'>
                                        <li className='mb-3 d-flex align-items-center gap-15'>
                                            <GoPerson className='fs-5' />
                                            <p className='mb-0'>Muhammad Aiman Naim bin Mohd Faizul</p>
                                        </li>
                                        <li className='mb-3 d-flex align-items-center gap-15'>
                                            <IoCallOutline className='fs-5' />
                                            <a href="tel:011 54201362">011-5420 1362</a>
                                            <p className='mb-0'>|{'\u00A0\u00A0\u00A0\u00A0'}Monday to Friday</p>
                                        </li>
                                        <li className='mb-3 d-flex align-items-center gap-15'>
                                            <IoMailOutline className='fs-5' />
                                            <a href="mailto:aimxnaim@gmail.com">aimxnaim@gmail.com</a>                                        </li>
                                        <li className='mb-3 d-flex align-items-center gap-15'>
                                            <SlLocationPin className='fs-3' />
                                            <address className='mb-0'>
                                                Universiti Teknologi MARA (UiTM) Cawangan Melaka Kampus Jasin,
                                                Jalan Lembah Kesang 1/1-2, Kampung Seri Mendapat,
                                                77300 Merlimau, Melaka
                                            </address>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact