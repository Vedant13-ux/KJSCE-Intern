import React from 'react';

function ConversationList(props){
    let list = <div className="no-content-message">no conversations</div>;
    if (props.conversations.length!==0) {
        list = props.conversations.map(c => {
            return <div className='channel-item' onClick={() => {
                props.onSelectChannel(c._id);
            }}>
                <div>{c.name}</div>
                <span>{c.participants}</span>
            </div>
        });
    }
    return (
        <div className='channel-list'>
            {list}
        </div>);

}

export default ConversationList