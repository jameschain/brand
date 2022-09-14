import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout } from './components';
import { setupWallets, WalletProvider } from './context';
import { Home } from './pages';

setupWallets();

const App: FC = () => {
  return (
    <Router>
      <WalletProvider>
        <Layout>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </WalletProvider>
    </Router>
  );
};

export default App;
