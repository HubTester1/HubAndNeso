
/* eslint-disable react/prefer-stateless-function */

// ----- IMPORTS

import * as React from 'react';
import Sticky from 'react-stickynode';
import Hamburger from '../Hamburger/Hamburger';
import BrandLogoOnlyH1Link from '../Brands/BrandLogoOnlyH1Link';
import BrandHorizontalH1ScrollToTop from '../Brands/BrandHorizontalH1ScrollToTop';
import HcNav from '../HcNav/HcNav';

import './HcHeader.sass';
import './HcHeaderSmall.sass';
import './HcHeaderMediumLarge.sass';

// ----- COMPONENT

export default class HcHeader extends React.Component {
	render() {
		return (
			<Sticky
				activeClass="header-is-stuck"
				releasedClass="header-is-unstuck"
			>
				<header 
					id="hc-header" 
					className="mos-react-component-root"
				>
					{
						this.props.headerType === 'small' &&

						<div id="hamburger-and-brand-container">
							<Hamburger
								showSmallNav={this.props.handleHamburgerClick}
							/>
							<BrandLogoOnlyH1Link />
							<HcNav />
						</div>
					}
					{
						this.props.headerType === 'large' &&

						<div>
							<BrandHorizontalH1ScrollToTop />
							<HcNav />
						</div>
					}
				</header>
			</Sticky>
		);
	}
}
