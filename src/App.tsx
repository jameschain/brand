import { ApolloProvider } from '@apollo/client';
import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import client from './apollo/client';
import { Layout } from './components';
import { setupWallets, WalletProvider } from './context';
import { Home } from './pages';

setupWallets();

const App: FC = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <WalletProvider>
          <Layout>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Layout>
        </WalletProvider>
      </ApolloProvider>
    </Router>
  );
};

export default App;
