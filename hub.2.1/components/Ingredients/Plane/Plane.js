
import { connect } from 'react-redux';
import styled from 'styled-components';
import Style from '../../../services/Style';

const ReturnElevationValues = (elevationString) => {
	const elevationBase = parseInt(elevationString, 10);
	const elevationUp = (elevationBase + 2 > 16) ? 16 : (elevationBase + 2);
	const elevationDown = (elevationBase - 2 < 0) ? 0 : (elevationBase - 2);
	return {
		base: elevationBase,
		up: elevationUp,
		down: elevationDown,
	};
};
const Base = styled.div`
	${({ widthInRem }) => (widthInRem && `width: ${widthInRem}rem`)}
	${({ heightInRem }) => (heightInRem && `height: ${heightInRem}rem`)}
	border-width: .5rem;
	border-style: solid;
	border-color: ${({ elevationLevel, darkMode }) => (Style.Color(`ux-l-${elevationLevel}`, darkMode))};
	background-color: ${({ backgroundColor, darkMode }) => {
		if (backgroundColor) {
			return (Style.Color(backgroundColor, darkMode));
		}
		return (Style.Color('ux-base', darkMode));
	}};
	box-shadow: ${({ elevationLevel }) => (Style.Shadow(`ux-l-${elevationLevel}`))};
	transition: border-color ${Style.StandardTransitionTime()}, margin ${Style.StandardTransitionTime()}, box-shadow ${Style.StandardTransitionTime()};
	${({ interactive, contentColor, darkMode }) => {
		let returnValue = '';
		if (interactive) {
			returnValue = 
					`&:hover {
						margin: -.2rem;
						box-shadow: ${({ elevationLevel }) => (Style.Shadow(`ux-l-${ReturnElevationValues(elevationLevel).up}`))};
						background-color: ${({ elevationLevel }) => (Style.Color(`ux-l-${ReturnElevationValues(elevationLevel).up}`, darkMode))};
					}`;
			if (contentColor) {
				returnValue +=
					`&:focus,
					&:active {
						margin: .2rem;
						border-color: ${Style.Color(contentColor, darkMode)}
					}`;
			} else {
				returnValue +=
					`&:focus,
					&:active {
						margin: .2rem;
						border-color: ${Style.Color('ux-base-text', darkMode)}
					}`;
			}
		}
		return returnValue;
	}}
`;
const Light = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: ${({ elevationLevel, darkMode }) => (Style.Color(`ux-l-${elevationLevel}`, darkMode))};
	transition: background-color ${Style.StandardTransitionTime()};
	${({ interactive, elevationLevel, darkMode }) => (interactive && `
		&:hover {
			background-color: ${(Style.Color(`ux-l-${ReturnElevationValues(elevationLevel).up}`, darkMode))};
		}
		&:focus,
		&:active {
			background-color: ${(Style.Color(`ux-l-${ReturnElevationValues(elevationLevel).down}`, darkMode))};
		}`
	)}
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	${({ paddingInRem }) => (paddingInRem && `padding: ${paddingInRem}rem`)}
	color: ${({ contentColor, darkMode }) => {
		if (contentColor) {
			return (Style.Color(contentColor, darkMode));
		}
		return (Style.Color('ux-base-text', darkMode));
	}};
`;
const Plane = ({
	elevationLevel,
	uData,
	children,
	backgroundColor,
	contentColor,
	interactive,
	widthInRem,
	heightInRem,
	paddingInRem,
}) => (
	<Base
		elevationLevel={elevationLevel || 0}
		backgroundColor={backgroundColor}
		contentColor={contentColor}
		darkMode={uData.user.preferences.darkMode}
		className="base"
		interactive={interactive}
		widthInRem={widthInRem}
		heightInRem={heightInRem}
	>
		<Light
			elevationLevel={elevationLevel || 0}
			className="light"
			interactive={interactive}
			darkMode={uData.user.preferences.darkMode}
		>
			<Content
				contentColor={contentColor}
				className="content"
				paddingInRem={paddingInRem}
				darkMode={uData.user.preferences.darkMode}
			>
				{children}
			</Content>
		</Light>
	</Base>
);

export default connect(state => state)(Plane);
