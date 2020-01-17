import React, {Component} from 'react';
import Routes from '../src/components/Routes';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';

class App extends Component {
  // constructor (props) {
  //   super (props);
  //   this.state = {
  //     _isChoseCategory: false,
  //   };
  // }

  // getDataFromFirstPage = () => {
  //   this.setState ({
  //     _isChoseCategory: this._isChoseCategory (),
  //   });
  // };
  render () {
    return (
      <div className="flexible-content">
        <SideNavigation activeClassName="activeClass" />
        <main id="content" className="p-5">
          <Routes />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
