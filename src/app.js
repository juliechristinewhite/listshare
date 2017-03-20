import React from 'react';
import ReactDOM from 'react-dom';
import NewListInformation from './components/NewListInformation';
import UniqueList from './components/UniqueList';
// import ListItem from './components/ListItem';
import Footer from './components/Footer';
import { Router, Route, browserHistory } from 'react-router';

let config = {
    apiKey: "AIzaSyBF3ftlSxCKxCTfDSc0izLm2X3lBr-t3Rk",
    authDomain: "listshare-10261.firebaseapp.com",
    databaseURL: "https://listshare-10261.firebaseio.com",
    storageBucket: "listshare-10261.appspot.com",
    messagingSenderId: "488015495405"
  	};
   	firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
        this.state = {
            listTitle: "",
            listInstructions: "",
            listKey: ""
        }

        this.addList = this.addList.bind(this);
        this.handleChange = this.handleChange.bind(this);

	}
    componentDidMount() {
        const dbRef = firebase.database().ref();
    }
    handleChange(e) {
        // console.log(this);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addList(e) {
        e.preventDefault();
        console.log("list added");
        const newList = {
            listTitle: this.state.listTitle,
            listInstructions: this.state.listInstructions,
            listKey: this.state.listKey
        };
        console.log(newList);

        // storing this new object in firebase
        const dbRef = firebase.database().ref();
        let reference = dbRef.push(newList);
        const listKey = reference.getKey();
        this.setState({
            listKey: listKey
        })
        console.log(listKey);
    }
    render() {
        return (
            <div className="fullbleed">
            	<header>
                    <div className="contentWrapper">
    	                <h1>list share</h1>
    	                <h2 className="listInstructions">Some explanation of what the app does.</h2>
                        <form className="createList" onSubmit={this.addList}>
                            <div className="createList__section createList__section--name">
                                <label className="createList__label" htmlFor="listName">Your List Name:</label>
                                <input className="createList__input" type="text" name="listTitle" onChange={this.handleChange}/>
                            </div>
                            <div className="createList__section createList__section--instructions"> 
                                <label className="createList__label" htmlFor="listInstructions">List instructions:</label>
                                <input className="createList__input" type="text" name="listInstructions" onChange={this.handleChange}/>
                            </div>
                            <button className="createList__button">Create List!</button>
                        </form>    
                        
                        <NewListInformation data={this.state} />
                    </div>
                
                </header>

                <Footer />

            </div>
        )
    }
}

// ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render(
<Router history={browserHistory}>
    <Route path="/" component={App} />
	<Route path="/list/:list_key" component={UniqueList} />
</Router>, document.getElementById('app'));



