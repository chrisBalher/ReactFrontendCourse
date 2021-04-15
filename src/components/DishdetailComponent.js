import React from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';

    function RenderDish({dish}){
        if (dish != null) {
            return(
                <div className=" col-12 col-md-5 m-1">
                    <Card >
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
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
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.dish != null) {
            return (
                <div class="container">
                    <div className="row">
                    <Breadcrumb>
                        
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                    </div>

                    <div className="row">
                        <RenderDish dish= {props.dish}/>
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
        
    }

export default DishDetail;