
// --- IMPORTS

import styled from 'styled-components';

// --- COMPONENT

export default styled.div`
	position: fixed;
	width: 100%;
	padding: ${props => /* console.log('props'); console.log(props); */ props.padding};
	margin: ${props => props.margin};

	top: ${props => (props.top ? `${props.top}rem` : 'auto')};
	right: ${props => (props.right ? `${props.right}rem` : 'auto')};
	bottom: ${props => (props.bottom ? `${props.bottom}rem` : 'auto')};
	left: ${props => (props.left ? `${props.left}rem` : 'auto')};

	background-color: ${props => (props.backgroundColor ? `${props.backgroundColor}` : 'transparent')};
`;
