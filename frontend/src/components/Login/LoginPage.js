import React, { Component } from "react";
import axios from 'axios'

import {Control, LocalForm, Errors } from 'react-redux-form';
//import { Link } from 'react-router-dom';
import {Button,  Card,  CardBody,  CardGroup,  Col,  Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
var regularExpression = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{9,}$/;
const passwordValidator = (val) => regularExpression.test(val)
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)


class LoginPage extends Component {


  handleRegister = (values) => {
    // alert(JSON.stringify(values))
    console.log(values)

    axios.post(`http://${window.location.hostname}:5555/signUp`,values)
      .then(response => {

          console.log("Response is - ")
          console.log(response)
          
              if(response.status!== 401 && response.status !== 400 ){
                //  this.handleLoginChange(); 
              }

      }).catch(function(err){      
          console.log("catch err is ");
          console.log(err)  
          alert("Please try Again!");
   
 });

}

  handleSubmit = (values) => {
      // alert(JSON.stringify(values))

      axios.post(`http://${window.location.hostname}:5555/signIn`,{
            email: values.loginemail,
            password: values.loginpassword
        })
        .then(response => {

            console.log("Response is - ")
            console.log(response)
            
                if(response.status!== 401 && response.status !== 400 ){
                   
                    if(response.data.user.email) { 
                        console.log(response.data);
                        // console.log("Token is " + response.data.token)
                        localStorage.setItem('tokn', response.data.token)
                        localStorage.setItem('usr',JSON.stringify(response.data.user))
                        if(response.data.user.role === 1){
                          window.location.href='/'
                        }else{
                          window.location.href='/'
                        }

                    }
                }

        }).catch(function(err){      
            console.log("catch err is ");
            console.log(err)  
            alert("Invalid Credentials.Please try Again!");
     
   });

  }


  render() {
    return (
      <div className="app login-page flex-row align-items-center" style={{paddingTop:"50px"}}>
        <Container>
          <Row className="justify-content-center">
              <Col md="6">
              <CardGroup>
                <Card className="p-3" style={{border:"2px solid #51cbce"}}>
                  <CardBody>
                      <h3>Adcuratio Login</h3><hr style={{border:"1px solid #51cbce"}}/>
                      <p className="">Please Sign In to your account:</p>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".loginemail"
                                        id="loginemail"
                                        name="loginemail"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger"
                                        show="touched"
                                        model=".loginemail"
                                        messages={{
                                            required: 'This is a Required Field! ',
                                            validEmail: 'Invalid Email'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.password model=".loginpassword"
                                        id="loginpassword"
                                        name="loginpassword"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                          passwordValidator
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger"
                                        show="touched"
                                        model=".loginpassword"
                                        messages={{
                                            passwordValidator: 'Password should be more than 8 characters and it should contain one upper case, onelower case, one number and 1 special character.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6}}>
                                    <Button type="submit" color="outline-primary">
                                        Submit
                                    </Button>
                                </Col>
                                <Col md={{size: 6}} className="pt-4">
                                  <p> Not Registered? <Link to='/register'>Click here..</Link></p>
                                </Col>
                                  
                            </Row>
                        </LocalForm>
                     
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
              {/* :

              <Col md="6">
              <CardGroup>
                <Card className="p-3" style={{border:"2px solid #51cbce"}}>
                  <CardBody>
                      <h3>Adcuratio Sign Up</h3><hr style={{border:"1px solid #51cbce"}}/>
                      <p className="">Please Register here:</p>
                        <LocalForm onSubmit={(values) => this.handleRegister(values)}>
                            
                            
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".name"
                                        id="name"
                                        name="name"
                                        placeholder="Name (Optional)"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger"
                                        show="touched"
                                        model=".email"
                                        messages={{
                                            required: 'This is a Required Field! ',
                                            validEmail: 'Invalid Email'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.password model=".password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            passwordValidator
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger"
                                        show="touched"
                                        model=".password"
                                        messages={{
                                            passwordValidator: 'Password should be more than 8 characters and it should contain one upper case, onelower case, one number and 1 special character.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6}}>
                                    <Button type="submit" color="outline-primary">
                                        Submit
                                    </Button>
                                </Col>
                                <Col md={{size: 6}} className="pt-4">
                                  <p> Already Registered? <p onClick={this.handleLoginChange} style={{cursor:"pointer", color:"blue"}}>Click here..</p></p>
                                </Col>
                            </Row>
                        </LocalForm>
                     
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
            } */}
            
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginPage;