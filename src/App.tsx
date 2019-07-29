import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import createStore from './store/createStore';

const history = createBrowserHistory();
const { store, persistor } = createStore(history);


function Index() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Loader() {
  return <h1>LOADING</h1>;
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <ConnectedRouter history={history}>
            <Button color="danger">Danger!</Button>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about/">About</Link>
                  </li>
                  <li>
                    <Link to="/users/">Users</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={Index} />
              <Route path="/users/" component={Users} />
            </div>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default () => <App/>;
