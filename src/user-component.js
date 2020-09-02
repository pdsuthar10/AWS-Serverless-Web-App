import React, { Component } from 'react';

export default class UserComponent extends Component {

    render() {

        return (
            <div className={"user-div"}>
                <table className={"table-content"}>
                    <tbody>
                        <tr><td><b>ID</b></td><td>{this.props.id}</td></tr>
                        <tr><td><b>First Name</b></td><td>{this.props.firstname}</td></tr>
                        <tr><td><b>Last Name</b></td><td>{this.props.lastname}</td></tr>
                        <tr><td><b>Location</b></td><td>{this.props.location}</td></tr>
                        <tr><td><b>Department</b></td><td>{this.props.department}</td></tr>
                    </tbody>
                </table>
            </div>

        )
    }
}