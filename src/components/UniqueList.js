import React from 'react';
import ListItem from '../components/ListItem.js';

export default class UniqueList extends React.Component {
	constructor() {
		super();
		this.state = {
			items: [],
			item: "",
			name: "",
			notes: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	handleChange(e) {
		// console.log(this);
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	 componentDidMount() {
        const dbRef = firebase.database().ref();
       	firebase.database().ref(`${this.props.params.list_key}`)
       	.on('value', (res) => {
       		console.log(res.val());
       		const dataFromFirebase = res.val();
       		const eventTitle = dataFromFirebase.listTitle;
       		const eventInstructions = dataFromFirebase.listInstructions;
       		const eventList = dataFromFirebase['items']
       		console.log(eventList);
       		const itemArray = [];

       		for(let itemKey in eventList) {
       			const individualItemKey = eventList[itemKey];
       			console.log(individualItemKey);
       			individualItemKey.key = itemKey;
       			itemArray.push(individualItemKey);
			}       		

       		this.setState({
       			listTitle: eventTitle,
       			listInstructions: eventInstructions,
       			items: itemArray
       		})
       	})
    }

	addItem(e) {
		e.preventDefault();
        const listItem = {
			item: this.state.item,
			name: this.state.name,
			notes: this.state.notes
		};

		 const dbRef = firebase.database().ref();
		 firebase.database().ref(`${this.props.params.list_key}/items`).push(listItem);

	}
	removeItem(itemToRemove) {
		console.log(itemToRemove);
		console.log("removed");

		const dbRef = firebase.database().ref(`${this.props.params.list_key}/items/${itemToRemove.key}`);
		dbRef.remove();
	}
	render() {
		return (
			<section className="uniqueList">
               	<h2>{this.state.listTitle}</h2>
               	<h3>{this.state.listInstructions}</h3>
               	<h4>PS be a doll and only delete your own items from the list</h4>
                <form onSubmit={this.addItem} className="addForm">
					<label htmlFor="item">Item: </label>
					<input type="text" name="item" onChange={this.handleChange} />
					<label htmlFor="name">Name: </label>
					<input type="text" name="name" onChange={this.handleChange} />
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" name="notes" onChange={this.handleChange}/>
					<button>Add Item</button>
					
				</form>

				<ul className="itemsOnList">

					{this.state.items.map((item) => {
						return <ListItem data={item} remove={this.removeItem} key={item.key} />
					})}
					
				</ul>

									
				
            </section>
		)
	}
}