
// ----- IMPORTS

import * as React from 'react';
import Collapsible from '../Collapsible/Collapsible';

// ----- COMPONENT

export default props => (
	<div id="hc-background-info-container">
		<div id="hc-background-info">
			<Collapsible
				textCollapsed="About this background image"
				textExpanded="Hide info about this image"
				buttonClassName="hc-background-info__button"
				buttonPosition="afterContent"
			>
				<div id="hc-background-info__information">
					<h3>
						<a
							id="photo-source-link"
							href="https://unsplash.com/photos/z2G_mtPCylQ"
							target="_blank"
							rel="noopener noreferrer"
						>
							Photo
						</a>
						&nbsp;Big Green Bubble by&nbsp;
						<a
							id="photographer-link"
							href="https://unsplash.com/@frostroomhead"
							target="_blank"
							rel="noopener noreferrer"
						>
							Rodion Kutsaev
						</a>
					</h3>
					<p>
						Part of a collection of &quot;[m]acro photography of water 
						and sunflower oil in different variations.&quot;
					</p>
					<p>
						From Melitopol, Ukraine.
					</p>
				</div>
			</Collapsible>
		</div>
	</div>
);
