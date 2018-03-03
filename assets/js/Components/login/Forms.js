import React, { Component } from 'react';
import './App.css'
import ReactDOM from 'react-dom';
import {FormErrors} from './FormErrors';
import './Form.css';
import DjangoCSRFToken from 'django-react-csrftoken';
class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            password:'',
            sap_id: '',
            email: '',
            isRegister: false,
            firstName:'',
            lastName:'',
            mobile:'',
            formErrors: {email: '', password: '', mobile: '', sap_id: ''},
            emailValid: false,
            passwordValid: false,
            phoneNumberValid: false,
            formValid: false,
            sap_idValid: false,
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlefirstName = this.handlefirstName.bind(this);
        this.handlelastName = this.handlelastName.bind(this);
        this.handlemobile = this.handlemobile.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSAP= this.handleSAP.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.addRegister = this.addRegister.bind(this);
        this.hideFields = this.hideFields.bind(this);
    }

    handleSAP(event) {
        this.setState({sap_id: event.target.value});
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
    handlemobile(event) {
        this.setState({mobile: event.target.value});
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let phoneNumberValid = this.state.phoneNumberValid;
        let passwordValid = this.state.passwordValid;
        let sap_idValid = this.state.sap_idValid;

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
                phoneNumberValid = value.length >= 10;
                fieldValidationErrors.mobile = phoneNumberValid ? '': ' is too short';
                break;
            case 'sap_id':
                    sap_idValid = value.length >= 10;
                    fieldValidationErrors.sap_idValid = sap_idValid ? '' : 'is invalid';
            break;

            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            phoneNumberValid: phoneNumberValid,
            sap_idValid: sap_idValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.phoneNumberValid && this.state.sap_idValid});
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
        document.getElementById("login1").style.display = "none";
        ReactDOM.find(myDiv).className="hiddenbtn";

    }

    hideFields(){
      event.preventDefault();
      var myDiv1 = document.getElementById('back');
      this.setState({isRegister: false});
      document.getElementById("login1").style.display = "block";
      ReactDOM.find(myDiv1).className="hiddenbtn";
    }

    render(){
        const isRegister = this.state.isRegister;
        let button = null;
        if(this.state.isRegister){
            button = <div id="reg">
            <button id="back" className="btn btn-info btn-block login" style={{textAlign: 'center', width: '100%',margin:'0px 0px 10px 0px'}} onClick={this.hideFields}>
                &lt;&lt; Back to Login
                </button>
                <input type="text" name="first_name" placeholder="First Name" value={this.state.firstName} onChange={this.handlefirstName} required/>
                <input type="text" name="last_name" placeholder="Last Name" value={this.state.lastName} onChange={this.handlelastName} required/>
                <input type="number" className={`form-group ${this.errorClass(this.state.formErrors.sap_id)}`}   name="sap_id" placeholder="SAP ID" value={this.state.sap_id} onChange={this.handleUserInput} required/>
                <input type="number" className={`form-group ${this.errorClass(this.state.formErrors.mobile)}`}   name="mobile" placeholder="Mobile Number" value={this.state.mobile} onChange={this.handleUserInput} required/>
            </div>
        }
        return(
            <div>
                <form method='POST'>
                 <DjangoCSRFToken/>
                 <FormErrors formErrors={this.state.formErrors} />
                  <div className="panel panel-default">

                  </div>

                    {button}
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <input  name="email" value={this.state.email} type="email" placeholder="Email" onChange={this.handleUserInput} required />
                    </div>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <input name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleUserInput} required />
                    </div>
                    <div>

                    </div>

                    <center>
                    <div id="login1">
                        <button className="btn btn-info btn-block login" name="login" type="submit" disabled={!this.state.formValid && this.state.isRegister} >
                            Login
                        </button>
                        </div>
                    </center>
                    <center>
                        <button className="btn btn-info btn-block login" style={{width:'100%', backgroundColor: '#e7998f'}} name="register" type="submit" onClick={this.addRegister} disabled={!this.state.formValid && this.state.isRegister} >
                            Register
                        </button>
                    </center>
                </form>
            </div>
        );
    }
}
export default Form;
