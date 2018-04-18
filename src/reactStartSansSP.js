
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './styles/styles.sass';

class StartPage extends React.Component {

	// state can be set sans constructor
	state = {
		buttonText: "This is button text"
	};

	// other properties can also be set directly on the class
	paragraphText = "This is some sweet para text, yo.";
	name = "Slim Shady";

	// arrow functions can be class properties; arrow functions 
	// 		don't have their own this binding, so they needn't 
	// 		be manually bound
	getIntroduction = () => {
		return `Hi, my name is ${this.name}`;
	}

	render() {
		const intro = this.getIntroduction();
		return(
			<Fabric>
				<p>{intro}</p>
				<p>{this.paragraphText}</p>
				<DefaultButton>
					{this.state.buttonText}
				</DefaultButton>
			</Fabric>
		);
	}
}

ReactDOM.render(<StartPage />, document.getElementById('DeltaPlaceHolderMain'));