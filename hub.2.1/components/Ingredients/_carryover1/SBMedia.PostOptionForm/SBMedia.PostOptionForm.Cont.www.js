
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Select from '../SBMedia.Select/SBMedia.Select.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';

// --- COMPONENT


const PostOptionsBodyContainer = styled.div`
	padding: 1rem;
	background-color: ${StylePatterns.Color('blue3')};
`;
const PostTags = styled.input`
	width: 100%;
	padding: .4rem 1.1rem;
	height: 3.2rem;
	font-size: 1.4rem;
	line-height: 1.5;
	color: ${StylePatterns.Color('yellow')};
	background-color: ${StylePatterns.Color('blue1')};
	border: none;
	border-radius: .2rem;
`;

const PostComments = styled.textarea`
	width: 100%;
	padding: .4rem 1.1rem;
	height: 4.7rem;
	font-family: 'Roboto',sans-serif;
	font-size: 1.4rem;
	line-height: 1.5;
	color: ${StylePatterns.Color('yellow')};
	background-color: ${StylePatterns.Color('blue1')};
	border: none;
	border-radius: .2rem;
`;

export default class PostOptionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			season: this.props.currentSeason,
			tags: '',
			caption: '',
		};
		this.handleSeasonSelection = this.handleSeasonSelection.bind(this);
	}
	handleSeasonSelection(option) {
		this.setState(() => ({
			season: option,
		}));
	}

	render() {
		return (
			<PostOptionsBodyContainer>
				<Select
					value={this.state.season}
					options={this.props.allSeasons}
					selectHandler={this.handleSeasonSelection}
				/>
				<PostTags type="text" />
				<PostComments />
			</PostOptionsBodyContainer>
		);
	}
}
