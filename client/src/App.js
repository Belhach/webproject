import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import JoinWindow from './components/JoinWindow/JoinWindow';
import ChatWindow from './components/ChatWindow/ChatWindow';

const App = () => (
    <Router>
        < Route path = "/" exact component={JoinWindow} />
        < Route path = "/chat" component={ChatWindow} />
    </Router>    
);

export default App