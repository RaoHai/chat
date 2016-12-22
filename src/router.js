import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Chat from './routes/Chat';
import ChatRoom from './routes/ChatRoom';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/chat" component={Chat} />
      <Route path="/chatroom" component={ChatRoom} />
    </Router>
  );
};
