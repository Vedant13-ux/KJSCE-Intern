import React from 'react';
import { Channel } from './Channel';

function ConversationList(props){
    let list = <div className="no-content-message">no conversatiobs</div>;
    if (props.channels && props.channels.map) {
        list = props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={()=>props.onSelectChannel(c.id)} />);
    }
    return (
        <div className='channel-list'>
            {list}
        </div>);

}

export default ConversationList