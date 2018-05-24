import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import FastTicket from './fast-ticket';
import All from './all'

class AllPage extends Component {
  render() {
    return (
        <div style={{position:'relative'}}>
            <Header />
            <FastTicket />
            <All />
            <Footer />
        </div>
    );
  }
}

export default AllPage;
