
// ----- IMPORTS

import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import './HcNav.sass';
import './HcNavSmall.sass';
import './HcNavMediumLarge.sass';

// ----- COMPONENT


export default class HcNav extends React.Component {
	constructor(props) {
		super(props);
		this.scrollToHome = this.scrollToHome.bind(this);
		this.scrollToGetItDone = this.scrollToGetItDone.bind(this);
	}
	scrollToHome() {
		scroll.scrollToTop();
	}
	scrollToGetItDone() {
		scroller.scrollTo('hc-get-it-done', {
			duration: 500,
			delay: 0,
			smooth: 'easeInOutQuart',
		});
	}
	render() {
		console.log('m1');
		return (
			<nav id="hc-navigation" className="mos-react-component-root">
				<ul id="hc-navigation__items">
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'Home' }}
							text="Home"
							className="hc-navigation__items__item__button"
							onClick={this.scrollToTop}
						/>
					</li>
					<li className="hc-navigation__items__item">
						{/* <Link
							activeClass="active"
							className="test2"
							to="hc-get-it-done"
							spy
							smooth
							duration={500}
						> */}
						<DefaultButton
							iconProps={{ iconName: 'FormLibrary' }}
							text="Get it Done"
							className="hc-navigation__items__item__button"
							onClick={this.scrollToGetItDone}
						/>
						{/* </Link> */}
					</li>
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'Message' }}
							text="Messages"
							className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
						/>
					</li>
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'People' }}
							text="Organization, Teams, & Staff"
							className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
						/>
					</li>
					<li className="hc-navigation__items__item">
						<DefaultButton
							iconProps={{ iconName: 'Calendar' }}
							text="Calendars & Schedules"
							className="hc-navigation__items__item__button"
						// onClick={this.doSomething}
						/>
					</li>
				</ul>
			</nav>
		);
	}
}
