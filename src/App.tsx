import React from "react";
import { AppRouter } from "./navigation/app-routes";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
