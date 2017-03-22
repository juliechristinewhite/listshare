import React from 'react';

export default function ListItem(props) {
	return (
		
			<div className="uniqueList__itemContainer">
				<li className="uniqueList__listItem">
					<div className="listItem__item">
						<div className="posterItem">{props.data.item} </div>
						<div className="posterName">{props.data.name}</div>
						<div className="posterNotes">{props.data.notes}</div>
					</div>
					<div><button className="listItem__remove" onClick={() => props.remove(props.data)}>Remove</button></div>
				</li>
			</div>
		
	)
}

