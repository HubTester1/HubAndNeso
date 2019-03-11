
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
							href="https://unsplash.com/photos/E4944K_4SvI"
							target="_blank"
							rel="noopener noreferrer"
						>
							Photo
						</a>
						&nbsp;by&nbsp;
						<a
							id="photographer-link"
							href="https://unsplash.com/@ldandersen"
							target="_blank"
							rel="noopener noreferrer"
						>
							Buzz Andersen
						</a>
					</h3>
					<p>
						&quot;I was visiting the Big Island of Hawaii with some friends and family, 
						and my brother convinced the group to take a lava tour by boat. I always kind of 
						balk a little bit at overtly touristy stuff like that, but I think everyone was 
						pretty shocked when we got our first look at the Kalapana Lava Flow after about 
						a half hour boat trip down the coast. It&apos;s such an awesome, 
						phantasmagorical sight and, since they actually get surprisingly close 
						to the spots where the rivers of lava meet the ocean and throw up 
						sulfurous steam clouds, also a pretty visceral sensory experience.&quot;
					</p>
				</div>
			</Collapsible>
		</div>
	</div>
);
