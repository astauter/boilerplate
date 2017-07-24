import React from 'react';
import ReactDom from 'react-dom';
import Root from './root'
import {Provider} from 'react-redux'
import store from './react/redux/store'
import './stylesheets/index.scss'

ReactDom.render(
  <Provider store={store}>
  <Root />
  </Provider>
  , document.getElementById('main')
)

