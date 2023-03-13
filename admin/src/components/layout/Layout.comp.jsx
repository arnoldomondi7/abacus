import React from 'react'
import Header from '../header/Header.comp'

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default Layout
