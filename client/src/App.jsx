import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Login from "./pages/Login";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return [...(existing || []), ...incoming];
          },
        },
        projects: {
          merge(existing, incoming) {
            return [...(existing || []), ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_CLIENT,
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
