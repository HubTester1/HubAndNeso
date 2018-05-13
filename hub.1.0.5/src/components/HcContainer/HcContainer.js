
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import { Accordion } from 'react-accessible-accordion';

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
		this.handleHamburgerOrNavItemClick = this.handleHamburgerOrNavItemClick.bind(this);
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
	handleHamburgerOrNavItemClick() {
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
								screenType="small"
								handleHamburgerOrNavItemClick={this.handleHamburgerOrNavItemClick}
							/>
							<HcHero
								heroType="small"
							/>
						</MediaQuery>
						<MediaQuery
							minWidth={ScreenSizes.ReturnMediumMin()}
							maxWidth={ScreenSizes.ReturnMediumMax()}	
						>
							<HcHeader
								screenType="medium"
							/>
							<HcHero
								heroType="large"
								uData={this.state.uData}
							/>
						</MediaQuery>
						<MediaQuery minWidth={ScreenSizes.ReturnLargeMin()}>
							<HcHeader
								screenType="large"
							/>
							<HcHero
								heroType="large"
								uData={this.state.uData}
							/>
						</MediaQuery>
					</div>
					<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
						<Accordion
							className="hc-sections-container accordion"
							accordion={false}
						>
							<HcPushedItems
								screenType="small"
							/>
							<HcGetItDone
								screenType="small"
							/>
							<HcMessages
								uData={this.state.uData}
								allOrTop="all"
								screenType="small"
							/>
							<HcOrganization
								screenType="small"
							/>
							<HcCalendarsSchedules
								screenType="small"
							/>
						</Accordion>
					</MediaQuery>
					<MediaQuery minWidth={ScreenSizes.ReturnMediumMin()}>
						<HcPushedItems
							screenType="medium"
						/>
						<HcGetItDone
							screenType="medium"
						/>
						<HcMessages
							uData={this.state.uData}
							allOrTop="all"
							screenType="medium"
						/>
						<HcOrganization
							screenType="medium"
						/>
						<HcCalendarsSchedules
							screenType="medium"
						/>
					</MediaQuery>
				</div>
			);
		}
		return null;
	}
}

ReactDOM.render(<HcContainer />, document.getElementById('react-mount-point'));
