import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList'
import Footer from './Footer';
import logo from './logo.svg';
import './App.css';
import museums from './museums.json';
import escapeRegExp from 'escape-string-regexp';


class App extends Component {
  state = {
    museums: [],
    query: '',
    triggeredPlace: ''
    
  }
  

triggerAPlace = (value) => {
  this.setState({triggeredPlace : value})
}

filteringLocations = (query) => {
  this.setState({query: query})
  }

  render() {
    let filteredLocations
    if(this.state.query){
    const match = new RegExp(escapeRegExp(this.state.query),'i')
     filteredLocations = museums.filter((location)=> match.test(location.name))
  } else {
    filteredLocations = this.state.museums
  }
    return (
      <div className="app">

        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Wrocław Museums</h1>

            <nav id="hamburger">
              <input type="checkbox" />
              
              <span></span>
              <span></span>
              <span></span>
              
              <div id="menu">
                <LocationList
                  trigger={this.triggerAPlace}
                  museums={this.state.museums}
                  filteredLocations={filteredLocations}
              query={this.state.query}
              filteringLocations={this.filteringLocations}
                />
              </div>
            </nav>
        
        </header>

        <main id="maincontent">

          <section className="search-bar" aria-label="search for museums">
            <form>
              <div className="search-input">
                <input 

                  type='text' 
                  placeholder='Search for museum' 
                  value={this.props.query}
                   onChange={(event)=> this.filteringLocations(event.target.value)}
                      />
              </div>
            </form>
          </section>
          
          <Map
          locations={filteredLocations}
            triggeredPlace={this.state.triggeredPlace}
          />


        </main>

        <Footer/>
      </div>
    );
  }
}

export default App;
