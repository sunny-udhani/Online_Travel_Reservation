import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class Welcome extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired
    };

    state = {
        username : ''
    };

    componentWillMount(){
        this.setState({
            username : this.props.username
        });
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
        document.title = `Welcome, ${this.state.username} !!`;
    }

    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <div className="alert alert-warning" role="alert">
                        {this.state.username}, welcome to my App..!!
                    </div>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);