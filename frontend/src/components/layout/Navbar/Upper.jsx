import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '../../../actions/api/userApi'
import { useLazyLogoutQuery } from '../../../actions/api/authApi'
import { useSelector } from 'react-redux'
import Search from '../Search'

const Upper = () => {
    const navigate = useNavigate()
    const { isLoading } = useGetMeQuery()
    const [logout, { data }] = useLazyLogoutQuery()

    const { user } = useSelector(state => state.auth)
    const { cartItem } = useSelector(state => state.cart)


    const logoutHandler = () => {
        logout()
        navigate(0)
    }
    return (
        <>
            <header className='header-upper py-3'>
                <div className="container-xxl">
                    <nav className="row align-items-center">
                        <div className="col-2 d-flex align-items-center">
                            <img
                                src="/logogdget.svg"
                                alt=""
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    marginRight: '20px'
                                }}
                            />
                            <h3>
                                <Link to="/" className='text-white'>Gadget Universe</Link>
                            </h3>
                        </div>
                        <div className="col-5">
                            <Search />
                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center ">
                                <div className="row">
                                    <div className="col-3">
                                        <div className='mx-2'>
                                            <Link className='d-flex align-items-center gap-10 text-white' to='/compare'>
                                                <img src="/images/youtube/compare.svg" alt="compare" />
                                                <p className='mb-0'>
                                                    Compare <br /> Products
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <Link className='d-flex align-items-center gap-10 text-white'>
                                            <img src="/images/youtube/wishlist.svg" alt="wishlist" />
                                            <p className='mb-0'>
                                                Favourite <br /> Wishlist
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="col-3" >
                                        {user ? (
                                            <>

                                                <div className="dropdown">
                                                    <button
                                                        className="btn dropdown-toggle text-white no-focus-outline"
                                                        type="button"
                                                        id="dropdownAvatar"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        style={{ outline: 'none', boxShadow: 'none', border: 'none' }}

                                                    >
                                                        <figure className="avatar avatar-nav">
                                                            <img
                                                                src={
                                                                    user?.avatar
                                                                        ? user?.avatar?.url
                                                                        : '/images/default_avatar.jpg'
                                                                }
                                                                alt="User Avatar"
                                                                className="rounded-circle"
                                                            />
                                                        </figure>
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownAvatar">
                                                        <span className="dropdown-item disabled">{user?.name}</span>
                                                        <li><hr className="dropdown-divider m-0" /></li>

                                                        {user?.role === 'admin' && (
                                                            <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>
                                                        )}

                                                        <Link className="dropdown-item" to="/me/orders"> Orders </Link>

                                                        <Link className="dropdown-item" to="/me/profile"> Profile </Link>
                                                        <li><hr className="dropdown-divider m-0" /></li>

                                                        <Link id='avatarUsername' className="dropdown-item" to="/" onClick={logoutHandler}> Logout </Link>
                                                    </div>
                                                </div>
                                            </>

                                        ) :
                                            !isLoading && (
                                                <div style={{ width: '140px' }}>
                                                    <Link
                                                        to='/login'
                                                        className='d-flex align-items-center text-white'
                                                    >
                                                        <img src="/images/youtube/user.svg" alt="login" />
                                                        <p className='mb-0 mx-1'>
                                                            Log in <br /> My Account
                                                        </p>
                                                    </Link>
                                                </div>
                                            )}
                                    </div>
                                    <div className='col-3'>
                                        <Link
                                            className='d-flex align-items-center gap-10 text-white'
                                            to="/cart"
                                        >
                                            <img
                                                style={{ width: '43px', height: '43px' }}
                                                src="/images/youtube/cart.svg"
                                                alt="cart"
                                            />
                                            <div className="d-flex flex-column gap-10">
                                                <span className="badge bg-white text-dark m-0 " id="cart_count">{cartItem?.length}</span>
                                                <p className='mb-0 align-items-center' style={{ width: '100px' }}>RM {" "}{cartItem?.reduce((acc, item) => acc + item?.quantity * item?.price, 0).toFixed(2)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Upper