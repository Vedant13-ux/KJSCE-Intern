import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function withAuth(ComponentToRender) {
    class Authnticate extends Component {
        componentWillMount() {
            console.log('Hocs ke andar');
            if (!this.props.currentUser.isAuthenticated) {
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
            console.log('Hocs ke andar ka render');
            return <ComponentToRender {...this.setKey()} {...this.props} ></ComponentToRender>
        }
    }
    function mapStateToProps(state) {
        return {
            currentUser: state.currentUser
        }
    }
    return connect(mapStateToProps)(Authnticate)

}

