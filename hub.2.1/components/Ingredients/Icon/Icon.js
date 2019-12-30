/**
 * @name Icon
 * @component
 * @category Components - Ingredients
 * @description Icon component. Gets icon content from Icon Registry. Connected to Redux store.
 * @returns {Component} &lt;Icon />.
 */

import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReturnDarkMode } from '../../../services/State/Selectors';
import Style from '../../../services/Style';
import * as IconRegistry from './Registry';


const IconContainer = styled.span`
	display: inline-block;

	svg {
		height: ${({ contentHeightInRem }) => (`${contentHeightInRem}rem;`)};
		fill: ${({ contentColor, darkMode }) => (`${Style.Color(contentColor, darkMode)};`)};
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

Icon.propTypes = {
	/**
	 * Which SVG should be used. E.g., "Home".
	 */
	iconContent: PropTypes.string.isRequired,
	/**
	 * Fill color for SVG. Will be used to find color from Style service. E.g., "ux-pink".
	 */
	contentColor: PropTypes.string,
	/**
	 * Height of icon, measured in rem. E.g., "4".
	 */
	contentHeightInRem: PropTypes.string.isRequired,
	/**
	 * From state store. Whether user prefers dark mode. E.g., "true".
	 */
	darkMode: PropTypes.bool,
};

Icon.defaultProps = {
	contentColor: 'ux-base-text',
	darkMode: false,
};


const mapStateToProps = state => ({
	darkMode: ReturnDarkMode(state),
});

export default connect(mapStateToProps)(Icon);
