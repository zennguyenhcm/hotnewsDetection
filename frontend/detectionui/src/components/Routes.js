import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CrawlerPage from './pages/CrawlerPage';
import ExtractorPage from './pages/ExtractorPage';
import HotKeywordPage from './pages/HotKeywordPage';
import InsightPage from './pages/InsightPage';
import FirstPage from './pages/FirstPage';
class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/" exact component={FirstPage} />
        <Route path="/crawler" exact component={CrawlerPage} />
        <Route path="/wordCloud" component={ExtractorPage} />
        <Route path="/keywordOverview" component={HotKeywordPage} />
        <Route path="/tatfidfCompute" component={InsightPage} />
      </Switch>
    );
  }
}

export default Routes;
