import React, { Component } from "react";
import { Button,Badge } from "react-bootstrap";

class InternshipList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
        <div className="card">
          <div className="template">
            <div className="top">
              <img src={this.props.data.avatar} alt="pfp" className="avatar-pro"></img>
              <a className="author" href="./home">{this.props.data.provider}</a>
            </div>
            <br></br><hr></hr>
            <div className="container">
              <h4 className="title">{this.props.data.title}</h4>
              <h6>
              <i class="fa fa-home"></i>  {this.props.data.type}<br/>
              <i class="fa fa-clock"></i>  {this.props.data.duration}<br/>
              <i class="fa fa-hourglass"></i>  {this.props.data.applyBy}
              </h6>
            </div>
            <div className="bottom">
              <Button
                type="button"
                className="btn btn-default btn-circle btn-md"
              >
                <i class="fa fa-bookmark"></i>
              </Button>
            </div><hr></hr>
            <div id="tags-skill" >
            {this.props.data.tags.map((ele)=>{
              return <span><Badge variant="primary">{ele}</Badge>   </span>;
            })}
              
            </div>
          </div>
        </div>
    );
  }
}

export default InternshipList;
