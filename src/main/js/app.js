'use strict';
import {Button} from 'primereact/components/button/Button';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: ""};
		this.items = 
["Item1", 'Item 2', 'Item 3']
		;
		this.handleClick1 = this.handleClick1.bind(this);
	}

	componentDidMount() {
		client({method: 'GET', path: '/sample'}).done(response => {
			this.setState({employees: response.entity.firstName + " "+response.entity.lastName});
		});
	};

	handleClick1(){
		client({method: 'GET', path: '/sample'}).done(response => {
			console.log(response.entity);
			this.setState({msg: response.entity.description});
		});
	};
	render() {
		return (
			<div>
			<EmployeeList employees={this.state.employees} msg={this.state.msg}/>
			<Button label="Call REST" onClick = {this.handleClick1} className="ui-button-success"/>
			<SplitButton label="Another Button" icon="fa-check" onClick={this.handleClick1} model={this.items}></SplitButton>
			</div>
		)
	}
}

class EmployeeList extends React.Component{
	render() {
		
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
						<th>{this.props.msg}</th>
						<th>{this.props.employees}</th>
					</tr>
					
				</tbody>
			</table>
		)
	}
}

class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)


