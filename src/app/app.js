import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import { Router, Route, hashHistory } from 'react-router'
import { BrowserRouter as Router, Route } from "react-router-dom";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Home from './Home'
import '../www/styles/main.scss'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
            <Route path="/" render={({ location, history }) => {
                return <Home history={history} />
            }} />
        </Router>
    </MuiThemeProvider>
), document.getElementById('app'))
