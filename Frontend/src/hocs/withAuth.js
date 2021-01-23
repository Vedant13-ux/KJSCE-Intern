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
        setKey() {
            if (this.props.match.params.id) {
                return { key: this.props.match.params.id }
            } else {
                return {}
            }
        }
        render() {
            return <ComponentToRender {...this.setKey()} currentUser={this.props.currentUser} {...this.props} ></ComponentToRender>
        }
    }
    function mapStateToProps(state) {
        return {
            currentUser: state.currentUser
        }
    }
    return connect(mapStateToProps)(Authnticate)

}

