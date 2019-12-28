/**
 * @name Icon
 * @component
 * @category Components - Ingredients
 * @description Icon component. Gets icon content from Icon Registry. Connected to Redux store.
 * @returns {Component} &lt;Icon />
 *
 * @todo params, types, required or optional
 */

import { connect } from 'react-redux';
import { ReturnDarkMode } from '../../../services/State/Selectors';
import styled from 'styled-components';
import Style from '../../../services/Style';
import * as IconRegistry from './Registry';


const IconContainer = styled.span`
	display: inline-block;

	svg {
		height: ${({ contentHeightInRem }) => (`${contentHeightInRem}rem;`)};
		fill: ${({ contentColor, darkMode }) => {
		if (contentColor) {
			return Style.Color(contentColor, darkMode);
		}
		return Style.Color('ux-base-text', darkMode);
	}};
	}
`;

const Icon = ({
	iconContent, contentColor, contentHeightInRem, darkMode, 
}) => {
	// all partial screens are imported as PartialScreenRegistry, above; create component equal
	// 		to the partial screen component specified in sData; render said component below
	const SelectedIcon =
		IconRegistry[iconContent];
	return (
		<IconContainer
			contentColor={contentColor}
			contentHeightInRem={contentHeightInRem}
			darkMode={darkMode}
		>
			<SelectedIcon />
		</IconContainer>
	); 
};


const mapStateToProps = state => ({
	darkMode: ReturnDarkMode(state)
});

export default connect(
	mapStateToProps,
)(Icon);
