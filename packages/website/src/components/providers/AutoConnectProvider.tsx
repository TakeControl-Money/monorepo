"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

export interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect: (autoConnect: boolean) => void;
}

export const AutoConnectContext = createContext<AutoConnectContextState>({
  autoConnect: false,
  setAutoConnect: () => null,
});

export function useAutoConnect(): AutoConnectContextState {
  return useContext(AutoConnectContext);
}

export const AutoConnectProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoConnect, setAutoConnect] = useState<boolean>(() => {
    try {
      const isAutoConnect = localStorage.getItem("auto-connect");
      return isAutoConnect ? JSON.parse(isAutoConnect) : true;
    } catch (e) {
      return true;
    }
  });

  return (
    <AutoConnectContext.Provider
      value={{
        autoConnect,
        setAutoConnect: (autoConnect) => {
          setAutoConnect(autoConnect);
          try {
            localStorage.setItem("auto-connect", JSON.stringify(autoConnect));
          } catch (e) {
            // Handle localStorage errors
          }
        },
      }}
    >
      {children}
    </AutoConnectContext.Provider>
  );
};
