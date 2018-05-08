
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';

import EnvironmentDetector from '../../services/EnvironmentDetector';
import MOSUtilities from '../../services/MOSUtilities';
import ScreenSizes from '../../services/ScreenSizes';

import HcContainerData from './HcContainerData';
import HcHeaderSmall from '../../components/HcHeaderSmall/HcHeaderSmall';
import HcHeaderLarge from '../../components/HcHeaderLarge/HcHeaderLarge';
import HcStaffLookup from '../../components/HcStaffLookup/HcStaffLookup';
import HcGetItDone from '../../components/HcGetItDone/HcGetItDone';
import HcPushedItems from '../../components/HcPushedItems/HcPushedItems';
import HcMessages from '../../components/HcMessages/HcMessages';
import HcOrganization from '../../components/HcOrganization/HcOrganization';

// eslint-disable-next-line
import { initializeIcons } from '@uifabric/icons';

import '../../sass/temp.sass';
import './HcContainer.sass';

initializeIcons();

// ----- COMPONENT

class HcContainer extends React.Component {
	state = {
		uData: {},
	};
	componentDidMount() {
		if (EnvironmentDetector.ReturnIsHCScreen()) {
			HcContainerData.ReturnUData()
				.then((response) => {
					const accountBrief = 
						MOSUtilities.ReplaceAll('i:0#.f\\|membership\\|', '', MOSUtilities.ReplaceAll('@mos.org', '', response.LoginName.toLowerCase()));
					this.setState(() => ({
						uData: {
							email: response.Email,
							account: accountBrief,
							displayName: response.Title,
						},
					}));
				})
				.catch((error) => {
					// 
				});
		}
	}
	render() {
		if (EnvironmentDetector.ReturnIsHCScreen()) {
			return (
				<div id="hc-container" className="hc-container mos-react-component-root">
					<div id="hc-header-and-hero-container" className="hc-header-and-hero-container">
						<MediaQuery maxDeviceWidth={ScreenSizes.ReturnSmallMax()}>
							<HcHeaderSmall />
							<div id="hero-container">
								<HcStaffLookup />
							</div>
						</MediaQuery>
						<MediaQuery minDeviceWidth={ScreenSizes.ReturnMediumMin()}>
							<HcHeaderLarge />
							<div id="hero-container">
								<HcStaffLookup />
								<HcMessages
									uData={this.state.uData}
									allOrTop="top"
								/>
							</div>
						</MediaQuery>
					</div>
					<HcGetItDone />
					<HcMessages
						uData={this.state.uData}
						allOrTop="all"
					/>
					<HcPushedItems />
					<HcOrganization />
					{/* <p>HcCalendarsSchedules here</p> */}
				</div>
			);
		}
		return null;
	}
}


ReactDOM.render(<HcContainer />, document.getElementById('s4-bodyContainer'));
