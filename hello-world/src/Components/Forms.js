import React, { Component } from 'react';
import '../App.css'
class Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            username:'',
            password:'',
            sapID: '',
            emailID: '',
            isRegister: false,
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSAP= this.handleSAP.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.updateMyScreen = this.updateMyScreen.bind(this);
        this.addRegister = this.addRegister.bind(this);
    }
    handleUsername(event) {
        this.setState({username: event.target.value});
    }
    handleSAP(event) {
        this.setState({sapID: event.target.value});
    }handleEmail(event) {
        this.setState({Email: event.target.value});
    }
    handlePassword(event) {
        this.setState({password: event.target.value});
    }


    updateMyScreen(){
        event.preventDefault();

        var cnt = this.state.count;
        cnt++;
        if(this.state.username==='' || this.state.password===''){
            this.setState({count: this.state.count+1})
        }
        else{
        }
        this.setState({count: cnt})

    }

    addRegister(){
        event.preventDefault();
        this.setState({isRegister: true});

    }
    render(){
        const isRegister = this.state.isRegister;
        let button = null;
        if(this.state.isRegister){
            button = <div id="reg">
                <input type="text" placeholder="SAP ID" value={this.state.sapID} onChange={this.handleSAP}/>
                <input type="text" placeholder="Email Address" value={this.state.Email} onChange={this.handleEmail}/>
            </div>
        }
        return(
            <div>
                <form>
                    {button}
                    <input value={this.state.username} type="text" placeholder="username" onChange={this.handleUsername}  />
                    <input type="password" value={this.state.password} placeholder="password" onChange={this.handlePassword} />
                    <center>
                        <button className="btn btn-info btn-block login" type="submit" onClick={this.updateMyScreen}>
                            Login
                        </button>
                        {this.state.count}
                        <button id="register" className="btn btn-info btn-block login"  onClick={this.addRegister}>
                            Register
                        </button>
                    </center>

                </form>
            </div>
        );
    }
}
export default Form;