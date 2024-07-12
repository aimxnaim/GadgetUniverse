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
                        <div className="col-2">
                            <h3>
                                <Link to="/" className='text-white'>Gadget Universe</Link>
                            </h3>
                        </div>
                        <div className="col-5">
                            <Search />
                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div className='mx-2'>
                                    <Link className='d-flex align-items-center gap-10 text-white'>
                                        <img src="images/youtube/compare.svg" alt="wishlist" />
                                        <p className='mb-0'>
                                            Compare <br /> Products
                                        </p>
                                    </Link>
                                </div>

                                {user ? (
                                    <>
                                        <div className='mx-2'>
                                            <Link className='d-flex align-items-center gap-10 text-white'>
                                                <img src="images/youtube/wishlist.svg" alt="wishlist" />
                                                <p className='mb-0'>
                                                    Favourite <br /> Wishlist
                                                </p>
                                            </Link>
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn dropdown-toggle text-white"
                                                type="button"
                                                id="dropDownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
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
                                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                                <span className="dropdown-item">{user?.name}</span>
                                                <li><hr className="dropdown-divider" /></li>

                                                {user?.role === 'admin' && (
                                                    <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>
                                                )}

                                                <Link className="dropdown-item" to="/me/orders"> Orders </Link>

                                                <Link className="dropdown-item" to="/me/profile"> Profile </Link>
                                                <li><hr className="dropdown-divider" /></li>

                                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}> Logout </Link>
                                            </div>
                                        </div>
                                    </>

                                ) :
                                    !isLoading && (
                                        <div>
                                            <Link
                                                to='/login'
                                                className='d-flex align-items-center gap-10 text-white'
                                            >
                                                <img src="images/youtube/user.svg" alt="wishlist" />
                                                <p className='mb-0'>
                                                    Log in <br /> My Account
                                                </p>
                                            </Link>
                                        </div>
                                    )}

                                <div>
                                    <Link
                                        className='d-flex align-items-center gap-10 text-white'
                                        to="/cart"
                                    >
                                        <img
                                            style={{ width: '50px', height: '50px' }}
                                            src="images/youtube/cart.svg"
                                            alt=""
                                        />
                                        <div className="d-flex flex-column gap-10">
                                            <span className="badge bg-white text-dark" id="cart_count">{cartItem?.length}</span>
                                            <p className='mb-0'>RM {" "}{cartItem?.reduce((acc, item) => acc + item?.quantity * item?.price, 0).toFixed(2)}</p>
                                        </div>
                                    </Link>
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