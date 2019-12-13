
// --- IMPORTS

import styled from 'styled-components';

// --- COMPONENT

export default styled.div`
	display: flex;
	${props => props.justifyContent && `
		justify-content: ${props.justifyContent};
	`}
`;
