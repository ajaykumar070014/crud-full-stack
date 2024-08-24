import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./components/AppContent";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
