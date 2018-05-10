
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import './HcBkgrdInfo.sass';
// import './HcBkgrdInfoSmall.sass';
// import './HcBkgrdInfoMediumLarge.sass';

// ----- COMPONENT

export default class HcBkgrdInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showBkgrdInfo: false,
		};
		this.handleAboutButtonClick = this.handleAboutButtonClick.bind(this);
	}
	handleAboutButtonClick() {
		this.setState(prevState => ({
			showBkgrdInfo: !prevState.showBkgrdInfo,
		}));
	}
	render() {
		return (
			<div id="hc-background-info-container">
				<div id="hc-background-info">
					{
						!this.state.showBkgrdInfo &&

						<DefaultButton
							iconProps={{ iconName: 'ChevronDown' }}
							text="About this image"
							className="hc-background-info__button"
							onClick={this.handleAboutButtonClick}
						/>
					}
					{
						this.state.showBkgrdInfo &&

						<DefaultButton
							iconProps={{ iconName: 'ChevronUp' }}
							text="About this image"
							className="hc-background-info__button"
							onClick={this.handleAboutButtonClick}
						/>
					}
					{
						this.state.showBkgrdInfo &&

						<div id="hc-background-info__information">
							<p>
								<a
									href="https://unsplash.com/photos/W8KTS-mhFUE"
									target="_blank"
									rel="noopener noreferrer"
								>
									Photo
								</a>
								&quot;Milky Way&quot; by 
								<a 
									href="https://unsplash.com/@billy_huy" 
									target="_blank" 
									rel="noopener noreferrer"
								>
									Billy Huynh
								</a>
							</p>
							<p>
								More than anything, this photograph was really the 
								result of a series of little accidents. After abandoning 
								a hike halfway through due to lack of sunlight, we 
								subsequently began to make our way back home. As we 
								drove through a long stretch of highway, I made the 
								decision to nap in the back, but before that, for 
								whatever reason, I peered out the window and into 
								the heavens first. At that point, I began screaming 
								like a madman telling everyone to look up. Amazed, 
								we pulled into the next rest stop.
							</p>
						</div>
					}
				</div>
			</div>
		);
	}
}
