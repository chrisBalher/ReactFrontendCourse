import React, {Component} from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
    }
    renderDish(dish){
        if (dish != null) {
            return(
                
                    <Card className=" col-12 col-md-5 m-1">
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                
                
            );
        }else{
            return(
                <div></div>
            );
        }
    }
    renderComments(dish){
        if (dish != null) {
            const commentsAll = dish.comments.map((comment)=>{
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
    render(){
        return (
            <div class="container">
                <div className="row">
                    {this.renderDish(this.props.dish )}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;