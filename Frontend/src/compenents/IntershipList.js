import React, { Component } from "react";
import Internship from "./Intership";
import {Button} from "react-bootstrap"

class InternshipList extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          title: "HR",
          provider: "abudhya",
          type: "Work from home",
          duration: "1 months",
          applyBy: "14th Nov",
          avatar:"https://i.pinimg.com/originals/2b/82/f9/2b82f961d9dde9c116c13e8aea8eb017.jpg",
          tags: ["leader", "conversation"],
        },
        {
          title: "Python",
          provider: "pandya",
          type: "Work from home",
          duration: "2 months",
          applyBy: "11th Nov",
          avatar:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/85c78c0c-ca3c-4f35-9d6a-b36b2fbb3639/ddq98bp-5d3fde4a-0ef2-4737-bbe7-eec00185ce93.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODVjNzhjMGMtY2EzYy00ZjM1LTlkNmEtYjM2YjJmYmIzNjM5XC9kZHE5OGJwLTVkM2ZkZTRhLTBlZjItNDczNy1iYmU3LWVlYzAwMTg1Y2U5My5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.p4aa0nw8agi2SFa5xUKMd-9hxubyKrUgljZSh-sgNmk",
          tags: ["python", "programming"],
        },
        {
          title: "Java",
          provider: "rohi",
          type: "Work from home",
          duration: "1 months",
          applyBy: "24th Nov",
          avatar:"https://steamuserimages-a.akamaihd.net/ugc/956345958152335542/3D99A55AB4313BF9B797A16DC4716273FE0FFD30/",
          tags: ["java", "cp"],
        },
        {
          title: "Python",
          provider: "pandya",
          type: "Work from home",
          duration: "2 months",
          applyBy: "11th Nov",
          avatar:"https://data.whicdn.com/images/331553607/original.jpg",
          tags: ["python", "programming"],
        },
        {
          title: "Python",
          provider: "pandya",
          type: "Work from home",
          duration: "2 months",
          applyBy: "11th Nov",
          avatar:"https://static.wikia.nocookie.net/2242b114-6341-4d85-ba0b-bc4bd06c978f",
          tags: ["python", "programming"],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div id="top-bar">
        <Button type="button" className="btn btn-default btn-circle btn-xl"><i class="fa fa-filter"></i>
        </Button>
        </div>
        <div className="container" id="Intershiplist">
          <div class="row">
            {this.state.data.map((internships, index) => {
              return (
                <div class="col-md-3">
                  <Internship key={index} data={internships}></Internship>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default InternshipList;
