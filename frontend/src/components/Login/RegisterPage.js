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


class RegisterPage extends Component {


  handleRegister = (values) => {
    // alert(JSON.stringify(values))
    console.log(values)

    axios.post(`http://${window.location.hostname}:5555/signUp`,values)
      .then(response => {

          console.log("Response is - ")
          console.log(response)
          
              if(response.status!== 401 && response.status !== 400 ){
                alert('Registered!')
                this.props.history.replace('/login')
              }

      }).catch(function(err){      
          console.log("catch err is ");
          console.log(err)  
          alert("Please try Again!");
    
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
                                  <p> Already Registered? <Link to='/login'>Click here..</Link></p>
                                </Col>
                            </Row>
                        </LocalForm>
                     
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
            
          </Row>
        </Container>
      </div>
    );
  }
}

export default RegisterPage;