import { ApolloProvider, ApolloClient, InMemoryCache,  } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Layout from "./components/common/Layout";
import ClientPage from "./pages/ClientPage";
import OrderPage from "./pages/OrderPage";
import OrderDetails from "./pages/OrderDetails";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_CLIENT,
  cache,
  fetch,
});

function App() {
  return (
    <>
      <main className="w-full min-h-screen bg-[#f3f4f6] ">
        <ApolloProvider client={client}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<ClientPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/products" element={<ProductPage/>} />
              <Route path="/products/:id" element={<ProductDetails/>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApolloProvider>
      </main>
    </>
  );
}

export default App;
