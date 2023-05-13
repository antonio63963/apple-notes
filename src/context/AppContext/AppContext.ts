import { createContext } from "react";

import { IAppContext, IError } from "./AppContext.type";

const appContext = createContext<IAppContext>({
  errorInfo: null,
  setErrorInfo: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export default appContext;
export type { IError };
