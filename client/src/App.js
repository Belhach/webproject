import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import JoinWindow from './component/JoinWindow';
import ChatWindow from './component/ChatWindow';

const App = () => (
    <Router>
        < Route url_path = "/" component={JoinWindow} />
        < Route url_path = "/chat" component={ChatWindow} />
    </Router>    
);

export default App