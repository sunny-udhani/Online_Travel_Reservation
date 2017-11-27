import React, {Component} from 'react';
import '../cssfiles/signupform.css';

export default class SignupForm extends Component {
	constructor() {
		super();
	}

	render () {
		return (
			<div className="signupform">
				<div className=" form-modal">
					<form>
						<div className="form-group">
							<label className="create-acc-label">Create a KAYAK account</label>
							<input type="text" className="form-input" placeholder="Email Address"/>
							<input type="password" className="form-input" placeholder="Password" />
							<input type="submit" value="Create Account" className="create-account-submit"/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}