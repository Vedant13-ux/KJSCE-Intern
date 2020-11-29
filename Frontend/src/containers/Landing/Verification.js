import React from 'react'
import { Link } from 'react-router-dom'
const verification = (props) => {
    return (
        <div className="verification">
            <h1>Email verification Link has been sent to your Somaiya Email. <Link to='https://gmail.com'>Click Here to Check Mail</Link></h1>
        </div>
    )
}
export default verification;