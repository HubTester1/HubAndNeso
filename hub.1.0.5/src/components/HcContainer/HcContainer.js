
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';

import EnvironmentDetector from '../../services/EnvironmentDetector';
import MOSUtilities from '../../services/MOSUtilities';
import ScreenSizes from '../../services/ScreenSizes';

import HcContainerData from './HcContainerData';
import HcHeader from '../../components/HcHeader/HcHeader';
import HcHero from '../../components/HcHero/HcHero';
import HcGetItDone from '../../components/HcGetItDone/HcGetItDone';
import HcPushedItems from '../../components/HcPushedItems/HcPushedItems';
import HcMessages from '../../components/HcMessages/HcMessages';
import HcOrganization from '../../components/HcOrganization/HcOrganization';
import HcCalendarsSchedules from '../../components/HcCalendarsSchedules/HcCalendarsSchedules';

// eslint-disable-next-line
import { initializeIcons } from '@uifabric/icons';

import '../../sass/temp.sass';
import './HcContainer.sass';

initializeIcons();

// ----- COMPONENT

class HcContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSmallNav: false,
			uData: {},
		};
		this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
	}
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
	handleHamburgerClick() {
		this.setState(prevState => ({
			showSmallNav: !prevState.showSmallNav,
		}));
	}
	render() {
		if (EnvironmentDetector.ReturnIsHCScreen()) {
			return (
				<div
					id="hc-container"
					className={`mos-react-component-root${this.state.showSmallNav ? ' showing-small-nav' : ''}`}
				>
					<div
						id="hc-header-and-hero-container" 
						className="hc-header-and-hero-container"
					>
						<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
							<HcHeader
								headerType="small"
								handleHamburgerClick={this.handleHamburgerClick}
							/>
							<HcHero
								heroType="small"
							/>
						</MediaQuery>
						<MediaQuery minWidth={ScreenSizes.ReturnMediumMin()}>
							<HcHeader
								headerType="large"
							/>
							<HcHero
								heroType="large"
								uData={this.state.uData}
							/>
						</MediaQuery>
					</div>
					<HcGetItDone />
					<HcMessages
						uData={this.state.uData}
						allOrTop="all"
					/>
					<HcPushedItems />
					<HcOrganization />
					<HcCalendarsSchedules />
				</div>
			);
		}
		return null;
	}
}

ReactDOM.render(<HcContainer />, document.getElementById('s4-bodyContainer'));
