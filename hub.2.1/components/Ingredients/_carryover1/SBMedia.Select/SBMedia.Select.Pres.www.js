
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';
import SelectOption from '../SBMedia.SelectOption/SBMedia.SelectOption.Pres.www';

// --- COMPONENT

const PostContainer = styled.div`
	padding: 1rem;
	background-color: ${StylePatterns.Color('blue1')};
`;

export default class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showOptions: false,
		};
		this.handleShowSelectOptionsButtonClick = this.handleShowSelectOptionsButtonClick.bind(this);
		this.handleSelectOptionClick = this.handleSelectOptionClick.bind(this);
	}
	handleShowSelectOptionsButtonClick() {
		this.setState(prevState => ({
			showOptions: !prevState.showOptions,
		}));
	}
	handleSelectOptionClick(option, e) {
		this.setState(prevState => ({
			showOptions: !prevState.showOptions,
		}));
		this.props.selectHandler(option);
	}
	render() {
		return (
			<div>
				<Button
					buttonHeight="3"
					iconPosition="after"
					iconContent="angle-down"
					contentHeight="1.4"
					text={this.props.value.display}
					textAlignment="left"
					fullWidth
					defaultBackgroundColor={StylePatterns.Color('blue1')}
					defaultContentColor={StylePatterns.Color('yellow')}
					activeBackgroundColor={StylePatterns.Color('blue2')}
					activeContentColor={StylePatterns.Color('yellow')}
					clickHandler={this.handleShowSelectOptionsButtonClick}
				/>
				{
					this.state.showOptions && this.props.options[0] &&

					<PostContainer>
						{
							this.props.options.map(option => (
								<SelectOption
									key={option.key}
									option={option}
									selectHandler={this.handleSelectOptionClick}
								/>
							))
						}
					</PostContainer>
				}
			</div>
		);
	}
}
