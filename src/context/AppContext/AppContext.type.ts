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

export type { IAppContext, IError };
