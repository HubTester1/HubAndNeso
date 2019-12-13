
// --- IMPORTS

import { injectGlobal } from 'styled-components';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SBMediaNav from '../SBMedia.Nav/SBMedia.Nav.Pres.www';
import Dash from '../SBMedia.Dash/SBMedia.Dash.Cont.www';

import LineAwesomeEOT from '../../fonts/line-awesome.eot';
import LineAwesomeTTF from '../../fonts/line-awesome.ttf';
import LineAwesomeWOFF from '../../fonts/line-awesome.woff';
import LineAwesomeWOFF2 from '../../fonts/line-awesome.woff2';
import LineAwesomeSVG from '../../fonts/line-awesome.svg';

const SBMediaData = require('./SBMedia.Data');

injectGlobal`
	* { box-sizing: border-box; }
	html { font-size: 10px; }
	body { font-size: 1.6rem; font-family: 'Roboto', sans-serif; margin: 0; background-color: #222; color: #ddd} 
	@font-face {
		font-family: 'LineAwesome';
		src: url(${LineAwesomeEOT});
		src: url(${LineAwesomeEOT}) format("embedded-opentype"),
			url(${LineAwesomeWOFF2}) format("woff2"),
			url(${LineAwesomeWOFF}) format("woff"),
			url(${LineAwesomeTTF}) format("truetype"),
			url(${LineAwesomeSVG}) format("svg");
		font-weight: normal;
		font-style: normal;
	}
	@media screen and (-webkit-min-device-pixel-ratio:0) {
		@font-face {
			font-family: "LineAwesome";
			src: url("../../fonts/line-awesome.svg?v=1.1.#fa") format("svg");
		}
	}
`;

// --- COMPONENT


export default class SBDashApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showScreenDash: true,
			showScreenBlogs: false,
			showScreenSB: false,
			showScreenAdmin: false,
			allSeasons: [],
			currentSeason: {},
		};
		this.handleButtonDashClick = this.handleButtonDashClick.bind(this);
		this.handleButtonBlogsClick = this.handleButtonBlogsClick.bind(this);
		this.handleButtonSBClick = this.handleButtonSBClick.bind(this);
		this.handleButtonAdminClick = this.handleButtonAdminClick.bind(this);
	}
	componentDidMount() {
		// get a promise to return a batch of dashboard posts
		SBMediaData.ReturnSeasonsData()
			.then((returnedSeasons) => {
				this.setState({
					allSeasons: returnedSeasons.allSeasons,
					currentSeason: returnedSeasons.currentSeason,
				});
			});
	}
	handleButtonDashClick() {
		this.setState({
			showScreenDash: true,
			showScreenBlogs: false,
			showScreenSB: false,
			showScreenAdmin: false,
		});
	}
	handleButtonBlogsClick() {
		this.setState({
			showScreenDash: false,
			showScreenBlogs: true,
			showScreenSB: false,
			showScreenAdmin: false,
		});
	}
	handleButtonSBClick() {
		this.setState({
			showScreenDash: false,
			showScreenBlogs: false,
			showScreenSB: true,
			showScreenAdmin: false,
		});
	}
	handleButtonAdminClick() {
		this.setState({
			showScreenDash: false,
			showScreenBlogs: false,
			showScreenSB: false,
			showScreenAdmin: true,
		});
	}
	render() {
		return (
			<div id="SBMedia-app-container">
				{
					this.state.showScreenDash &&

					<Dash
						allSeasons={this.state.allSeasons}
						currentSeason={this.state.currentSeason}
					/>
				}
				{
					this.state.showScreenBlogs &&

					<p>Blogs</p>
				}
				{
					this.state.showScreenSB &&

					<p>SB</p>
				}
				{
					this.state.showScreenAdmin &&

					<p>Admin</p>
				}
				<SBMediaNav
					handleButtonDashClick={this.handleButtonDashClick}
					handleButtonBlogsClick={this.handleButtonBlogsClick}
					handleButtonSBClick={this.handleButtonSBClick}
					handleButtonAdminClick={this.handleButtonAdminClick}
				/>
			</div>
		);
	}
}


ReactDOM.render(<SBDashApp />, document.getElementById('react-root'));
