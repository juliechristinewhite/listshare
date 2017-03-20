import React from 'react';

export default function ListItem(props) {
	return <li>{props.data.item} - {props.data.name} - {props.data.notes} 
		<button onClick={() => props.remove(props.data)}>Remove</button>
	</li>
}

