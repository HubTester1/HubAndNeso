
import { connect } from 'react-redux';
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
	iconContent, contentColor, contentHeightInRem, uData, 
}) => {
	// all partial screens are imported as PartialScreenRegistry, above; create component equal
	// 		to the partial screen component specified in sData; render said component below
	const SelectedIcon =
		IconRegistry[iconContent];
	return (
		<IconContainer
			contentColor={contentColor}
			contentHeightInRem={contentHeightInRem}
			darkMode={uData.user.preferences.darkMode}
		>
			<SelectedIcon />
		</IconContainer>
	); 
};

export default connect(state => state)(Icon);
