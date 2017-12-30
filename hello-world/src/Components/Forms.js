import React, { Component } from 'react';
import '../App.css'
import ReactDOM from 'react-dom';
import {FormErrors} from './FormErrors';
import './Form.css';
class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            password:'',
            sapID: '',
            email: '',
            isRegister: false,
            firstName:'',
            lastName:'',
            mobileNumber:'',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            phoneNumberValid: false,
            formValid: false,
            sapIDValid: false,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlefirstName = this.handlefirstName.bind(this);
        this.handlelastName = this.handlelastName.bind(this);
        this.handlemobileNumber = this.handlemobileNumber.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSAP= this.handleSAP.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.addRegister = this.addRegister.bind(this);
    }

    handleSAP(event) {
        this.setState({sapID: event.target.value});
    }
    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    handlePassword(event) {
        this.setState({password: event.target.value});
    }
    handlefirstName(event) {
        this.setState({firstName: event.target.value});
    }
    handlelastName(event) {
        this.setState({lastName: event.target.value});
    }
    handlemobileNumber(event) {
        this.setState({mobileNumber: event.target.value});
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let phoneNumberValid = this.state.phoneNumberValid;
        let passwordValid = this.state.passwordValid;
        let sapIDValid = this.state.sapIDValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            case 'mobile':
                if(this.state.isRegister){
                    phoneNumberValid = value.length >= 10;
                    fieldValidationErrors.mobileNumber = phoneNumberValid ? '': ' is too short';
                }
                break;
            case  'sapID':
                if(this.state.isRegister){
                    sapIDValid = value.length >= 10;
                    fieldValidationErrors.sapIDValid = sapIDValid ? '' : 'is invalid';
                }
                break;

            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }




    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }
    addRegister(){
        event.preventDefault();
        var myDiv = document.getElementById('register');
        this.setState({isRegister: true});

        ReactDOM.find(myDiv).className="hiddenbtn";

    }
    render(){
        const isRegister = this.state.isRegister;
        let button = null;
        if(this.state.isRegister){
            button = <div id="reg">
                <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handlefirstName} required/>
                <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handlelastName} required/>
                <input type="text" placeholder="SAP ID" value={this.state.sapID} onChange={this.handleSAP} required/>
                <input type="text" placeholder="Mobile Number" value={this.state.mobileNumber} onChange={this.handlemobileNumber} required/>

            </div>
        }
        return(
            <div>
                <form>
                  <div className="panel panel-default">
                      <FormErrors formErrors={this.state.formErrors} />
                  </div>
                    {button}
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <input  name="email" value={this.state.email} type="email" placeholder="Email" onChange={this.handleUserInput} required />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <input name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleUserInput} required />
                    </div>
                    <center>
                        <button className="btn btn-info btn-block login" style={{textAlign: 'center', width: '100%'}} type="submit" disabled={!this.state.formValid} >
                            Login
                        </button>
                        </center>
                </form>
                <center>
                    <button id="register" className="btn btn-info btn-block login" style={{width:'100%', backgroundColor: '#e7998f'}} onClick={this.addRegister} disabled={this.state.isRegister}>
                        Register
                        </button>
                </center>
            </div>
        );
    }
}
export default Form;