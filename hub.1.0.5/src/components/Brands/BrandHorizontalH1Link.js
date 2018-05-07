
// ----- IMPORTS

import * as React from 'react';
import BrandHorizontal from './BrandHorizontal';

import './BrandHorizontalH1Link.sass';

// ----- COMPONENT

const BrandHorizontalH1Link = props => (
	<div className="brand">
		<a className="brand__link" href="/">
			<h1 className="brand__link__header">
				<span className="brand__link__header__text">The Hub</span>
				<span className="brand__link__header__logo">
					<BrandHorizontal
						textColor="#fff"
					/>
				</span>
			</h1>
		</a>
	</div>
);

export default BrandHorizontalH1Link;
