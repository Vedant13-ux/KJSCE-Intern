import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(ComponentToRender) {
    class Authnticate extends Component {
        componentWillMount() {
            console.log(this.props.location);
            if (!this.props.currentUser.isAuthenticated) {
                this.props.history.push('/')
            }
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.currentUser.isAuthenticated) {
                this.props.history.push('/')
            }
        }
        render() {
            return <ComponentToRender key={this.props.match.params.id} {...this.props} currentUser={this.props.currentUser} ></ComponentToRender>
        }
    }
    function mapStateToProps(state) {
        return {
            currentUser: state.currentUser
        }
    }
    return connect(mapStateToProps)(Authnticate)

}

