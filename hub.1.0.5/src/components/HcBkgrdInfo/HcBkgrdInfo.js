
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
							href="https://unsplash.com/photos/W8KTS-mhFUE"
							target="_blank"
							rel="noopener noreferrer"
						>
							Photo
						</a>
						&nbsp;&quot;Milky Way&quot; by&nbsp;
						<a
							id="photographer-link"
							href="https://unsplash.com/@billy_huy"
							target="_blank"
							rel="noopener noreferrer"
						>
							Billy Huynh
						</a>
					</h3>
					<p>
						&quot;More than anything, this photograph was really the
						result of a series of little accidents. After abandoning
						a hike halfway through due to lack of sunlight, we
						subsequently began to make our way back home. As we
						drove through a long stretch of highway, I made the
						decision to nap in the back, but before that, for
						whatever reason, I peered out the window and into
						the heavens first. At that point, I began screaming
						like a madman telling everyone to look up. Amazed,
						we pulled into the next rest stop.&quot;
					</p>
				</div>
			</Collapsible>
		</div>
	</div>
);
