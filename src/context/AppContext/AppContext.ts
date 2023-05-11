import { createContext } from "react";

interface IError {
  title: string;
  message: any;
}

interface IAppContext {
  errorInfo: IError | undefined | null;
  setErrorInfo: (data: IError) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (data: boolean) => void;
}

const appContext = createContext<IAppContext>({
  errorInfo: null,
  setErrorInfo: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export default appContext;
export type { IError };
