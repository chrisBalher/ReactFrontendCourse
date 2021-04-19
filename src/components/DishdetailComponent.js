import React, { Component } from 'react';
import {Label,  Col, Row, Input, FormGroup, Modal, ModalHeader, ModalBody, Button, Card, CardImg,  CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
    

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = {
                inModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
        }
        
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values){
            console.log("Current State is: "+JSON.stringify(values));
            alert("Current State is: "+JSON.stringify(values));
        }
        render(){
            return(
                <React.Fragment>
                    <Button outline className="d-block"   onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg">
                            Submit Comment
                        </span>
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                            <Col  className="form-group">
                                <Label htmlFor="rating" ><strong>Rating</strong> </Label>
                                <Control.select model=".rating" type="select" name="rating" className="form-control" placeholder= "1"> 
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                            
                            <Col className="form-group">
                                <Label htmlFor="yourname" ><strong>Your Name</strong></Label>
                                
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger" 
                                        model=".yourname" 
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    ></Errors>
                            </Col>
                            
                            <Col className="form-group">
                                <Label htmlFor="message" ><strong>Comments</strong></Label>
                                
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="12"
                                    className="form-control" >
                                </Control.textarea>
                                
                            </Col>
                            
                            <Col className="form-group" md={{size: 12}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                            
                        </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            )
        }
    }

    function RenderDish({dish}){
        if (dish != null) {
            return(
                <div className=" col-12 col-md-5 m-1">
                    <Card >
                        <CardImg width="100%" src={"."+dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({comments}){
        if (comments != null) {
            const commentsAll = comments.map((comment)=>{
                let dt = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))
                return (
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        {/* <li>-- {comment.author}, { dt.toLocaleString('en-us', { month: 'short' })+' '+dt.getDay()+','+dt.getFullYear()}</li> */}
                        <li>-- {comment.author}, {dt}</li>
                    </ul>
                );
            });
            return(
                <div className=" col-12 col-md-5 m-1 text-left ml-3">
                    <h4>Comments</h4>
                    {commentsAll}
                    <CommentForm />
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
    
    class DishDetail extends Component {
        constructor(props){
            super(props);
        }
        render(){
            if (this.props.dish != null) {
                return (
                    <div class="container">
                        <div className="row">
                        <Breadcrumb>
                            
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {this.props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr/>
                        </div>
                        </div>
    
                        <div className="row">
                            <RenderDish dish = {this.props.dish}/>
                            <RenderComments comments={this.props.comments}/>
                        </div>
                    </div>
                );
            }else{
                return(
                    <div></div>
                );
            }
        }
    }

export default DishDetail;