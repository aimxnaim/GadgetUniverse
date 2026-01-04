import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/features/cartSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'


const Shipping = () => {
    const countriesList = Object.values(countries)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')

    const { shippingInfo } = useSelector(state => state.cart)

    useEffect(() => {
        if (shippingInfo) {
            setAddress(shippingInfo?.address)
            setCity(shippingInfo?.city)
            setPhoneNo(shippingInfo?.phoneNo)
            setZipCode(shippingInfo?.zipCode)
            setCountry(shippingInfo?.country)
        }
    }, [shippingInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({
            address,
            city,
            phoneNo,
            zipCode,
            country
        }))
        toast.success('Shipping Info Saved')
        navigate('/confirm_order')
    }

    return (
        <>
            <MetaData title={'Shipping'} />

            <CheckoutSteps shipping />
            
            <div className="checkout-page-container">
                <div className="checkout-header">
                    <h1 className="checkout-main-title">Shipping Information</h1>
                    <p className="checkout-subtitle">Please provide your delivery details</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="modern-checkout-card">
                            <form onSubmit={submitHandler}>
                                <div className="form-group-modern">
                                    <label htmlFor="address_field" className="modern-label">
                                        <i className="fas fa-map-marker-alt"></i> Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address_field"
                                        className="modern-input"
                                        name="address"
                                        placeholder="Enter your street address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group-modern">
                                            <label htmlFor="city_field" className="modern-label">
                                                <i className="fas fa-city"></i> City
                                            </label>
                                            <input
                                                type="text"
                                                id="city_field"
                                                className="modern-input"
                                                name="city"
                                                placeholder="Enter your city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="form-group-modern">
                                            <label htmlFor="zip_code_field" className="modern-label">
                                                <i className="fas fa-mail-bulk"></i> Zip Code
                                            </label>
                                            <input
                                                type="number"
                                                id="zip_code_field"
                                                className="modern-input"
                                                name="zipCode"
                                                placeholder="Enter zip code"
                                                value={zipCode}
                                                onChange={(e) => setZipCode(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-modern">
                                    <label htmlFor="phone_field" className="modern-label">
                                        <i className="fas fa-phone"></i> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone_field"
                                        className="modern-input"
                                        name="phoneNo"
                                        placeholder="Enter your phone number"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group-modern">
                                    <label htmlFor="country_field" className="modern-label">
                                        <i className="fas fa-globe"></i> Country
                                    </label>
                                    <select
                                        id="country_field"
                                        className="modern-select"
                                        name="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countriesList?.map((country, index) => (
                                            <option key={index} value={country?.name}>
                                                {country?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="modern-checkout-btn">
                                    <span>Continue to Order Confirmation</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shipping