
// ----- IMPORTS

import * as React from 'react';

import './Hamburger.sass';

// ----- COMPONENT

export default class Hamburger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hamburgerIsActive: false,
		};
		this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
	}
	handleHamburgerClick() {
		this.setState(prevState => ({
			hamburgerIsActive: !prevState.hamburgerIsActive,
		}));
	}
	render() {
		return (
			<div className="hamburger">
				<button
					className={`hamburger__button ${this.state.hamburgerIsActive ? ' is-active' : ''}`}
					type="button"
					onClick={this.handleHamburgerClick}
				>
					<span className="hamburger__lines">
						<span className="hamburger__lines__contents" />
					</span>
				</button>
			</div>
		);
	}
}
