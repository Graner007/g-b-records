import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'universal-cookie';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();