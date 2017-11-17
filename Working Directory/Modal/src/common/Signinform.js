import React, {Component} from 'react';
import '../cssfiles/signinform.css';

export default class SigninForm extends Component {
	constructor() {
		super();
	}

	render () {
		return (
			<div className="signinform">
				<div className=" form-modal">
					<form>
						<div className="form-group">
							<label className="signin-label">Create a KAYAK account</label>
							<input type="text" className="form-input" placeholder="Email Address"/>
							<input type="password" className="form-input" placeholder="Password"/>
							<input type="submit" value="Sign in" className="create-account-signin"/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}