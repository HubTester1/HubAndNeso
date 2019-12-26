/**
 * @name Document
 * @component
 * @category Next.js Overrides
 * @description Collect and handle styles from styled-components. Render &lt;html>.
 * 
 * Used by Next.js in transpilation; overrides default Next.js _document.
 */

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class DocumentWithStyledComponents extends Document {
	static getInitialProps({ renderPage }) {
		// create an instance of ServerStyleSheet
		const sheet = new ServerStyleSheet();
		// retrieve styles from components in the page
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />));
		// extract the styles as <style> tags
		const styleTags = sheet.getStyleElement();
		// pass styleTags as a prop
		return { ...page, styleTags };
	}

	render() {
		return (
			<html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
