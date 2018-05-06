
// ----- IMPORTS

import * as React from 'react';

import BrandHorizontal from '../Brands/BrandHorizontal';
import HcTopCommandBar from '../HcTopCommandBar/HcTopCommandBar';

// ----- COMPONENT

const HcHeader = props => (
	<header id="hc-header" className="mos-react-component-root">
		<div id="brand-container">
			<a id="brand-link" href="/">
				<h1 id="brand-header">
					<span className="brand-text">The Hub</span>
					<BrandHorizontal
						textColor="#333"
					/>
				</h1>
			</a>
		</div>
		<HcTopCommandBar />
	</header>
);

export default HcHeader;
