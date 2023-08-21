import React from "react";
import { AppRouter } from "./navigation/app-routes";
import { MantineProvider } from "@mantine/core";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AppRouter />
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
