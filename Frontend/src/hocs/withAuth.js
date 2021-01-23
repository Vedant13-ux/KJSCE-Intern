import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(ComponentToRender) {
    class Authnticate extends Component {
        componentWillUnmount() {
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
            return <ComponentToRender {...this.props} currentUser={this.props.currentUser} ></ComponentToRender>
        }
    }
    function mapStateToProps(state) {
        return {
            currentUser: state.currentUser
        }
    }
    return connect(mapStateToProps)(Authnticate)

}

