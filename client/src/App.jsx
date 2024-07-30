import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_CLIENT,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <>
      <Header />
      <div className="container">
        <h1>App Client</h1>
      </div>
    </>
  );
}

export default App;
