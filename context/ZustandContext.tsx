import React from "react";
import { StoreApi } from "zustand";

export const ZustandContext = (getStore: (initial: any) => any) => {
  const Context = React.createContext(null as any);

  const Provider = (props: {
    children: React.ReactNode;
    initialValue: any;
  }) => {
    const [store] = React.useState(getStore(props.initialValue));

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };
  return {
    useContext: () => React.useContext(Context),
    Context,
    Provider,
  };
};
