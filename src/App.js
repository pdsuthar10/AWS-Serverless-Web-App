import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Alert } from 'reactstrap'
import UserComponent from './user-component.js'
import queryString from 'query-string'


class App extends Component {

  constructor(props) {
    super(props)



    this.state = {
      items: [],
      userItems: [],
      error: false,
      errorMsg: []
    }

    this.getUsers = this.getUsers.bind(this)
    this.authAndAuth = this.authAndAuth.bind(this)

    this.errorcount = 0
    this.error = false
    this.errorMsg = []
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.authAndAuth()
    this.getUsers()
  }

  authAndAuth() {
    const params = window.location.hash.substr(1);


    const parsedParams = queryString.parse(params)
    console.log(parsedParams)
    axios.get('https://<your-app-id>.execute-api.<your-region>.amazonaws.com/prod/api/auth', {
      headers: {
        Authorization: parsedParams.id_token,
        'Access-Control-Allow-Origin': "*"
      }
    }).then(res => {
      const userItems = []
      userItems.push(<div><b>Logged-in User:</b> {res.data.body.username} ({res.data.body.email})</div>)

      this.setState({ userItems })
    }).catch(err => {
      console.log(err)
      this.setState({
        error: true,
        errorMsg: err.message
      })
    })


  }

  getUsers() {
    const params = window.location.hash.substr(1);


    const parsedParams = queryString.parse(params)

    axios.get("https://<your-app-id>.execute-api.<your-region>.amazonaws.com/prod/api/users",{
      headers: {
        Authorization: parsedParams.id_token,
        'Access-Control-Allow-Origin': "*"
      }
    })
      .then(res => {
        console.log(res.data)
        const items = []
        res.data.forEach(item => {
          items.push(
            <UserComponent id={item.userid} firstname={item.FirstName} lastname={item.LastName} department={item.Department} location={item.Location} />
          )
        })
        this.error = false
        this.setState({
          ...this.state,
          items
        })
      }).catch(err => {

        this.error = true
        this.errorcount++
        const errorMsg = [...this.state.errorMsg]
        errorMsg.push(<Alert color="danger">{new Date().toLocaleString() + " - " + err}</Alert>)

        this.setState({
          error: true,
          errorMsg
        })

      })
  }
  render() {

    const params = window.location.hash.substr(1);
    console.log(params)
    if (params === "" || params === undefined) {
      window.location = "https://<your-domain-prefix>.auth.<your-region>.amazoncognito.com/login?response_type=token&client_id=<your-client-id>&redirect_uri=<your-web-app-https-url>"
      return
    }
    return (
      <div>
        <div id="banner" className="banner">
          <img src="/logo-white-text.png" alt="" className="whiz-logo" />
        </div>


        <div className="content-div">
          <div className="login-user-div">
            {this.state.userItems}
          </div>
          <div className="title" id="user-title">
            <h3>User Details</h3>
          </div>
          <div className="content">
            <div> {this.state.errorMsg}</div>
            <div>{this.state.items}</div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
