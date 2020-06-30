import React from 'react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar'
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';
import ItemList from './ItemList';
import { fetchItems } from '../actions/fetchItems';
import { connect } from 'react-redux';

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            user: props.user,
            message: '',
            errors: '',
            result: ''
        }
    }

    componentDidMount() {
        this.props.fetchItems(this.props.user.id)
    };

    redirect = () => {
        this.props.history.push('/menu')
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            searchTerm: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const nameArray = this.props.items.map( item => {
            return item.name
        })
        let i = nameArray.indexOf(this.state.searchTerm)
        const locationArray = this.props.items.map( item => {
            return item.location
        })
            this.setState({
                ...this.state,
                result: locationArray[i]
            })
            if (nameArray[i] && locationArray[i]) {
                this.speak(nameArray[i], locationArray[i])
                this.setState({
                    ...this.state,
                    message: `user_item ${i+1}: name:"${nameArray[i]}" location:"${locationArray[i]}"`
                })
            }  else {
                this.setState({
                    ...this.state,
                    message: `no results found for item:"${this.state.searchTerm}"`
                })
            }
    };

    speak(name, location) {
        var msg = `the location you gave for item ${name} is ${location}`
        const speek = new SpeechSynthesisUtterance(msg);
        window.speechSynthesis.speak(speek);
    }

    handleMessage = () => {
        return (
            <div className='error-div'>
                <p className='error' >{this.state.message}{<br></br>}</p>
            </div>
            )
    };

    render() {
        return (
            <main>
                <Logo/>
                <Navbar/>
                <div className='message'>
                    {this.state.message? this.handleMessage() : null}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <input type='text' name='search' className='input' placeholder='enter your search here' value={this.state.searchTerm} onChange={this.handleChange}/>
                    </div>
                    <button className='error'>{'submit search >'}</button>
                </form>
                <div className='navbar'> 
                    <span className='error'>view  </span>   
                    <Router>
                        <Link to='/your_items'><span className='text'>:your items</span></Link>
                        <Route exact path="/your_items" render={ props => (<ItemList {...props} user={this.props.user} items={this.props.items} /> )} />
                    </Router>
                </div>
            </main>
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {fetchItems: (userId) => dispatch(fetchItems(userId))}
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);