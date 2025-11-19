import React from 'react'
import MetaData from '../layout/MetaData'
import BreadCrumb from '../store/BreadCrumb'
import UnderDevelopment from '../common/UnderDevelopment'

const Compare = () => {
    return (
        <>
            <MetaData title={'Compare'} />
            <BreadCrumb title='Compare Product' />
            <UnderDevelopment featureName='Product Comparison' />
        </>
    )
}

export default Compare