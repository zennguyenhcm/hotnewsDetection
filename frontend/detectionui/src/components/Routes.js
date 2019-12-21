import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CrawlerPage from './pages/CrawlerPage';
import ExtractorPage from './pages/ExtractorPage';
import HotKeywordPage from './pages/HotKeywordPage';
import InsightPage from './pages/InsightPage';

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/" exact component={CrawlerPage} />
        <Route path="/crawler" exact component={CrawlerPage} />
        <Route path="/extractor" component={ExtractorPage} />
        <Route path="/hotkeyword" component={HotKeywordPage} />
        <Route path="/insight" component={InsightPage} />
      </Switch>
    );
  }
}

export default Routes;
