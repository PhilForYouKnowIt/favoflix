import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Notification } from "components/misc/Notification";

export interface ToastContextValue {
  toast: ToastType[];
  toastDispatch: React.Dispatch<any>;
}

export const ToastContext = createContext<ToastContextValue>(
  {} as ToastContextValue
);

interface ToastType {
  id: string;
  content: ToastMsg;
  type: string;
}

interface ToastMsg {
  title: string;
  message: string;
}

const initialState: ToastType[] = [];

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const REMOVE_ALL = "REMOVE_ALL";

export const toastReducer = (state: any[], action: any) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type,
        },
      ];
    case REMOVE:
      return state.filter((t: ToastType) => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = (props: ToastProviderProps) => {
  const [toast, toastDispatch] = useReducer(toastReducer, initialState);
  const toastData = { toast, toastDispatch };
  return (
    <ToastContext.Provider value={toastData}>
      {toast && toast.length > 0 && (
        <div className="toasts-wrapper">
          {toast.map((t) => (
            <Notification
              key={t.id}
              body={t.content.message}
              title={t.content.title}
              id={t.id}
            />
          ))}
        </div>
      )}
      {props.children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};
