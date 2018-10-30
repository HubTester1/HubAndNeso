
// ----- IMPORTS

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import { Accordion } from 'react-accessible-accordion';

import EnvironmentDetector from '../../services/EnvironmentDetector';
import MOSUtilities from '../../services/MOSUtilities';
import ScreenSizes from '../../services/ScreenSizes';
import HCContext from '../../services/HcContext';

import HcHeader from '../../components/HcHeader/HcHeader';
import HcHero from '../../components/HcHero/HcHero';
import HcGetItDone from '../../components/HcGetItDone/HcGetItDone';
import HcPushedItems from '../../components/HcPushedItems/HcPushedItems';
import HcMessages from '../../components/HcMessages/HcMessages';
import HcOrganization from '../../components/HcOrganization/HcOrganization';

// eslint-disable-next-line
import { initializeIcons } from '@uifabric/icons';

import './HcContainer.sass';

initializeIcons();

class HcContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSmallNav: false,
			nesoIsAvailable: undefined,
			maintenanceModeThisUser: undefined,
			uData: {},
			contextReady: false,
		};
		this.handleHamburgerOrNavItemClick = this.handleHamburgerOrNavItemClick.bind(this);
	}
	componentDidMount() {
		HCContext.ReturnHCContext()
			.then((response) => {
				if (
					response &&
					response.nesoIsAvailable &&
					response.uData
				) {
					this.setState(() => ({
						uData: response.uData,
						nesoIsAvailable: response.nesoIsAvailable,
						maintenanceModeThisUser: response.maintenanceModeThisUser,
						contextReady: true,
					}));
					window.uData = response.uData;
					window.nesoIsAvailable = response.nesoIsAvailable;
					window.maintenanceModeThisUser = response.maintenanceModeThisUser;
					window.contextReady = true;
				}
			})
			.catch((error) => {
				console.log('hcContext error');
				console.log(error);
			});
	}
	handleHamburgerOrNavItemClick() {
		document.body.classList.toggle('showing-small-nav', !this.state.showSmallNav);
		this.setState(prevState => ({
			showSmallNav: !prevState.showSmallNav,
		}));
	}
	render() {
		console.log('render triggered');
		console.log(this.state);
		if (
			this.state.contextReady && 
			this.state.nesoIsAvailable && 
			!this.state.maintenanceModeThisUser
		) {
			document.body.classList.add('contains-hub-central');
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
								screenType="small"
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
								screenType="medium"
								uData={this.state.uData}
							/>
						</MediaQuery>
						<MediaQuery minWidth={ScreenSizes.ReturnLargeMin()}>
							<HcHeader
								screenType="large"
							/>
							<HcHero
								screenType="large"
								uData={this.state.uData}
							/>
						</MediaQuery>
					</div>


					<MediaQuery maxWidth={ScreenSizes.ReturnSmallMax()}>
						<Accordion
							className="hc-sections-container accordion"
							accordion={false}
							role="tablist"
						>
							<HcPushedItems
								screenType="small"
							/>
							<HcGetItDone
								screenType="small"
								uData={this.state.uData}
							/>
							<HcOrganization
								screenType="small"
							/>
							<HcMessages
								uData={this.state.uData}
								allOrTop="all"
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
							uData={this.state.uData}
						/>
						<HcOrganization
							screenType="medium"
						/>
						<HcMessages
							uData={this.state.uData}
							allOrTop="all"
							screenType="medium"
						/>
					</MediaQuery>
					<footer>
					&copy; {MOSUtilities.ReturnFormattedDateTime({ incomingDateTimeString: 'nowLocal', incomingReturnFormat: 'YYYY' })} Museum of Science
					</footer>
				</div>
			);
		}
		return (<div />);
	}
}

// eslint-disable-next-line no-console
console.log('hc m4');
if (EnvironmentDetector.ReturnIsHCScreen()) {
	ReactDOM.render(<HcContainer />, document.getElementById('hub-central-mount-point'));
} else {
	/* 
		// set a container for all data retrieval / setting promises
		var allDataRetrievalAndSettingPromises = [];

		// push to container all data retrieval / setting promises; there's only one now,
		//		but we're set up to add more without re-writing in the future
		allDataRetrievalAndSettingPromises.push($().GetAndSetMaintenanceModeData(), $().SetCurrentUserData());

		// wait for all data retrieval / setting promises to complete (pass or fail)
		$.when.apply($, allDataRetrievalAndSettingPromises).always(function () {
			// if Hub Central is in maintenance mode
			// if (uData.userName == 'jbaker@mos.org') {
			if (mData.hubCentralInMaintenanceMode || mData.allComponentsInMaintenanceMode) {
				$('body').addClass('is-in-maintenance-mode');
				$('div#overlays-screen-container').fadeIn(500).removeClass("hidden");
				$('div#maintenance-mode').fadeIn(500).removeClass("hidden");
				$("div#loading-screen").fadeOut(500).addClass("hidden");
			} else {
				$("img.ms-siteicon-img").attr("src", "/sites/hubprod/Asset%20Library/BrandHorizontalOpt.svg");
				$("div.ms-breadcrumb-top").remove();
				if (uData.userName == 'jbaker@mos.org') {
					$("div#s4-ribbonrow").css("display", "block");
					$("div#s4-bodyContainer ").css("padding-top", "1rem");
				}
				$("div#loading-screen").fadeOut(500).addClass("hidden");
				$("div#s4-bodyContainer").fadeTo(500, 1);
			}
		});
	*/
}
function ConfigAndShowNesoUnavailableScreen() {
	document.getElementById('overlays-screen-container').style.display = 'block';
	document.getElementById('neso-is-unavailable').style.display = 'block';
	document.getElementsByTagName('body')[0].classList.add('neso-is-unavailable');
}
function ShowMaintenanceModeScreen() {
	document.getElementById('overlays-screen-container').style.display = 'block';
	document.getElementById('maintenance-mode').style.display = 'block';
	document.getElementsByTagName('body')[0].classList.add('is-in-maintenance-mode');
}

function ShowScreen() {
	// if the context data has loaded
	if (window.contextReady) {
		// if neso is not available
		if (!window.nesoIsAvailable) {
			ConfigAndShowNesoUnavailableScreen();
		}
		if (window.maintenanceModeThisUser) {
			ShowMaintenanceModeScreen();
		}
		document.getElementById('s4-bodyContainer').style.opacity = '1';
		document.getElementById('loading-screen').style.opacity = '0';
		document.getElementById('loading-screen').style.display = 'none';
		document.getElementById('loading-screen').classList.add('hidden');
		clearInterval(screenShower);
	}
}

const screenShower = setInterval(ShowScreen, 500);
