import React from 'react'
import MetaData from '../components/layout/MetaData'
import BreadCrumb from '../components/store/BreadCrumb'
import UnderDevelopment from '../components/common/UnderDevelopment'

const Wishlist = () => {
    return (
        <>
            <MetaData title={'Favourite Wishlist'} />
            <BreadCrumb title='Favourite Wishlist' />
            <UnderDevelopment featureName='Wishlist & Favourites' />
        </>
    )
}

export default Wishlist