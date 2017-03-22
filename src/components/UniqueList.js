import React from 'react';
import ListItem from '../components/ListItem.js';
import Footer from '../components/Footer.js';

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
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	 componentDidMount() {
        const dbRef = firebase.database().ref();
       	firebase.database().ref(`${this.props.params.list_key}`)
       	.on('value', (res) => {
       		// console.log(res.val());
       		const dataFromFirebase = res.val();
       		const eventTitle = dataFromFirebase.listTitle;
       		const eventInstructions = dataFromFirebase.listInstructions;
       		const eventList = dataFromFirebase['items']
       		// console.log(eventList);
       		const itemArray = [];

       		for(let itemKey in eventList) {
       			const individualItemKey = eventList[itemKey];
       			// console.log(individualItemKey);
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

		this.setState({
			item: "",
			name: "",
			notes: ""
		})
	}
	removeItem(itemToRemove) {
		const dbRef = firebase.database().ref(`${this.props.params.list_key}/items/${itemToRemove.key}`);
		dbRef.remove();
	}
	render() {
		return (
			 <div className="fullbleed">
				<section className="uniqueList">
					<div className="contentWrapper">
		               	<h2 className="title uniqueList__title">{this.state.listTitle}</h2>
		               	<h3 className="subtitle uniqueList__instructions">{this.state.listInstructions}</h3>
		               	<h4 className="removeItemStatement">- Only remove your own items from the list, please. -</h4>
		               	<div className="form formContainer">
			                <form className="uniqueList__form" onSubmit={this.addItem}>

			                	<div className="uniqueList__formWrapper">

				                	<div className="formContainer--flex">

					                	<div className="uniqueList__form--item">

					                		<div className="uniqueList__labelContainer">
												<label className="label uniqueList__label--item" htmlFor="item">Item:</label>
											</div>
											<div className="uniqueList__inputContainer">
												<input className="input uniqueList__input--item" type="text" name="item" onChange={this.handleChange} value={this.state.item} required autoComplete="off" placeholder="eg. veggies and dip"/>
											</div>

										</div>

										<div className="uniqueList__form--name">

											<div className="uniqueList__labelContainer uniqueList__labelContainer--name">
												<label className="label uniqueList__label--name" htmlFor="name">Name:</label>
											</div>
											<div className="uniqueList__inputContainer">
												<input className="input uniqueList__input--name" type="text" name="name" onChange={this.handleChange} value={this.state.name} required autoComplete="off" placeholder="eg. julie white" />
											</div>

										</div>

									</div> 	

									<div className="formContainer--flex">

										<div className="uniqueList__form--notes">
											<div className="uniqueList__labelContainer--larger">
						                		<label className="label uniqueList__label--notes" htmlFor="notes">Notes:</label>
						                	</div>
						                	<div className="uniqueList__inputContainer--larger">
						                		<input className="input uniqueList__input--notes" type="text" name="notes" onChange={this.handleChange} value={this.state.notes} autoComplete="off" placeholder="eg. for a snack"/>
						                	</div>
					                	</div>

					                </div>
					                   
									<button className="button uniqueList__button">Add Item</button>
								</div>

								<div className="listWrapper">
									<ul className="uniqueList__ul">

										{this.state.items.map((item) => {
											return <ListItem data={item} remove={this.removeItem} key={item.key} />
										})}
										
									</ul>
								</div>
							</form>
						</div>	

					</div>

	            </section>

	            <Footer />
	        </div>    
		)
	}
}