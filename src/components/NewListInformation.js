import React from 'react';
import { Link } from 'react-router';

export default function NewListInformation(props) {

	if (props.data.listKey !== "" ) {
		return (
			<div>
				<p>You've created a new list called: {props.data.listTitle}</p>	            
				<p>Share this link with your friends to collaborate:</p>
        		<Link to={`/list/${props.data.listKey}`}>http://localhost:3000/{props.data.listKey}</Link>
    		</div>  
    	)
    } 

    else if (props.data.listTitle === "" && props.data.listInstructions !== "") {
    	return (
    		<div>
    			<p>Please make sure your list has a title!</p>
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