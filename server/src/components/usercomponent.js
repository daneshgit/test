import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql,compose } from 'react-apollo';


const userquery=gql`
{
    Users{
  name
}
}
`

const userMutation = gql`
mutation($Name: String, $Age: Int) {
  User(name: $Name, age: $Age) {
    ok   
  }
}
`;

class User extends Component {
constructor(props){
    super(props)
    this.user=this.user.bind(this);
}

user=async()=>{
const response=await this.props.mutate({variables:{Name:"bb",Age:3}})

}

  render() {
      console.log(this.props);
    return (
      <div >
       <h1>hi</h1>
       <button onClick={this.user}>click</button>
       
      </div>
    );
  }
}

export default compose(graphql(userMutation),graphql(userquery)) (User);