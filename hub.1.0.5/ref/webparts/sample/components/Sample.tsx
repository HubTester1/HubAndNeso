import * as React from 'react';
import styles from './Sample.module.scss';
import { ISampleProps } from './ISampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

// the Sample react component
export default class Sample extends React.Component<ISampleProps, {}> {
	public render(): React.ReactElement<ISampleProps> {
		return (
			<div className={styles.sample}>
				<div className={styles.container}>
					<div className={styles.row}>
						<div className={styles.column}>
							<span className={styles.title}>Welcome to SharePoint!</span>
							<p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
							<p className={styles.description}>{escape(this.props.description)}</p>
							<p className={styles.description}>Loading from {escape(this.props.context.pageContext.web.title)}</p>
							<a href="https://aka.ms/spfx" className={styles.button}>
								<span className={styles.label}>Learn more</span>
							</a>
						</div>
					</div>
					<div id="spListContainer" />
				</div>
			</div>
		);
	}
}
