
import { connect } from 'react-redux';
import styled from 'styled-components';
import Style from '../../../services/Style';
/* 
	&:hover {
		${props => (props.interactive ? 'padding: 0;' : '')}
	}
	&:focus {
		${props => (props.interactive ? 'padding: 0;' : '')}
	}
	&:active {
		${props => (props.interactive ? 'padding: .4rem;' : '')}
	}


*/
const Container = styled.div`
	margin: 3rem;
	background-color: #333;
	padding: .2rem;
	display: flex;
	flex-direction: column;
	transition: padding ${Style.StandardTransitionTime()};
`;
const Base = styled.div`
	display: flex;
	flex-direction: column;
	border-width: 2rem
	border-style: solid;
	border-color: ${props => (Style.Color(`ux-l-${props.elevation}`, props.darkMode))};
	background-color: ${(props) => {
		if (props.backgroundColor) {
			return (Style.Color(props.backgroundColor, props.darkMode));
		} 
		return (Style.Color('ux-base', props.darkMode));
	}};
	&:hover {
		${props => (props.interactive ? `border-color: ${props.contentColor};` : '')}
	}
	&:focus {
		${props => (props.interactive ? `border-color: ${props.contentColor};` : '')}
	}
	&:active {
		${props => (props.interactive ? `border-color: ${props.contentColor};` : '')}
	}
`;
const State = styled.div`
	background-color: ${props => (Style.Color(`ux-l-${props.elevation}`, props.darkMode))};
`;

const Content = styled.div`
	color: ${(props) => {
		if (props.contentColor) {
			return (Style.Color(props.contentColor, props.darkMode));
		}
		return (Style.Color('ux-base-text', props.darkMode));
	}};





`;

const Plane = ({
	elevation,
	uData,
	children,
	backgroundColor,
	contentColor,
	interactive,
}) => (
	<Container
		className="container"
		interactive={interactive}
	>
		<Base
			elevation={elevation}
			backgroundColor={backgroundColor}
			contentColor={contentColor}
			darkMode={uData.user.preferences.darkMode}
			className="base"
		>
			<State
				elevation={elevation}
				className="state"
			>
				<Content
					contentColor={contentColor}
				>
					{children}
				</Content>
			</State>
		</Base>
	</Container>
);

export default connect(state => state)(Plane);
