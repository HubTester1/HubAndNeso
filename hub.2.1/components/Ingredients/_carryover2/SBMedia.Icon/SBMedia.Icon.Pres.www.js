
// --- IMPORTS

import styled from 'styled-components';
import IconData from './SBMedia.Icon.Data';


// --- COMPONENT

export default styled.span`
	display: inline-block;
	font-size: inherit;
	font: normal normal normal ${props => props.iconSize}rem / 1 "LineAwesome";
	color: ${props => props.color ? props.color : 'default' };
	text-decoration: inherit;
	text-rendering: optimizeLegibility;
	text-transform: none;
	&:${props => props.iconPosition} {
		content: '${props => IconData.ReturnIconData(props.iconContent)}';
	}
	&:after {
		margin-left: ${props => (props.iconSize * .33)}rem;
	}
	&:before {
		margin-right: ${props => (props.iconSize * .33)}rem;
	}
`;
