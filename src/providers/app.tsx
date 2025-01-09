import * as React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Spinner, Button } from "@/components/Elements";
import { Notifications } from "@/components/Notifications";

import { store } from "@/slices";

const ErrorFallback = ({ error }: FallbackProps) => {
  const handleReset = () => window.location.assign(window.location.origin);

  return (
    <div role="alert">
      <h2 style={{ marginBottom: "1rem" }}>Ooops, something went wrong :( </h2>
      <pre>{error.message}</pre>
      <Button onClick={handleReset} />
    </div>
  );
};

const SuspenseFallback = () => {
  return (
    <div className="fill-center">
      <Spinner size="xl" />
    </div>
  );
};

const persistor = persistStore(store);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={SuspenseFallback}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Notifications />
              <Router>
                <React.Fragment>{children}</React.Fragment>
              </Router>
            </PersistGate>
          </ReduxProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
