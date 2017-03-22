import React from 'react';
import { Link } from 'react-router';

export default function NewListInformation(props) {

	if (props.data.listKey !== "" ) {
		return (
			<div className="listInformation">
				<p>You've created a new list called: <span className="listInformation__bold">{props.data.listTitle}</span></p>	            
				<p>Share this link with your friends to collaborate:</p>
        		<Link className="listLink" to={`/list/${props.data.listKey}`}>http://localhost:3000/{props.data.listKey}</Link>
    		</div>  
    	)
    } 

	else {
		return <div></div>	
	}
}	

// if props.data.listKey is not equal to an empty string
		// show the Link <-- return (<div></div>)
		// else
		// return <div></div>
		// don't show the link