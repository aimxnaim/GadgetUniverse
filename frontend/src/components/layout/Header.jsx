import React from 'react'
import Upper from './Navbar/Upper'
import Top from './Navbar/Top'
import Bottom from './Navbar/Bottom'

const Header = () => {

    const hideHeader = /^\/(me|admin)\//.test(location.pathname);

    return (
        <>
            <Top />
            < Upper />
            {!hideHeader && <Bottom />}

        </>
    )
}

export default Header