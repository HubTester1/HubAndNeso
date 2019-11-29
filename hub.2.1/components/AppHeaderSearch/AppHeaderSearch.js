/* eslint-disable  react/react-in-jsx-scope */

import styled from 'styled-components';
// import Sticky from 'react-stickynode';
// import { StickyContainer, Sticky } from 'react-sticky';
import Sticky from 'react-sticky-el';
import StylePatterns from '../../services/StylePatterns';


export default class AppHeaderSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stuck: false,
		};
		this.handleFixedToggle = this.handleFixedToggle.bind(this);
	}
	handleFixedToggle(free) {
		this.setState(prevState => ({
			stuck: !free,
		}));
	}
	render() {

		const HeaderLarge = styled.header`
			grid-area: topRight;	
			height: 5rem;
			z-index: 999;
			background-color: ${props => props.stuck ?
				'#322' : '#411' };
		`;
		return (
			<div>
				{
					this.props.screenType === 'large' &&

					<Sticky onFixedToggle={this.handleFixedToggle}>
						<HeaderLarge
							stuck={this.state.stuck}
						>
							<input type="text" />

							{
								this.state.stuck &&

								<p>This is stuck.</p>
							}
							{
								!this.state.stuck &&

								<p>This is NOT stuck.</p>
							}
						</HeaderLarge>
					</Sticky>

				}
			</div>
		);
	}
}
