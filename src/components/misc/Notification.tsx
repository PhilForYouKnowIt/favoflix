import { Toast } from "react-bootstrap";
import { REMOVE, useToastContext } from "components/misc/ToastContext";
import { useCallback, useEffect } from "react";

interface NotificationProps {
  id: string;
  title: string;
  body: string;
}

export const Notification = (props: NotificationProps): JSX.Element => {
  const toastContext = useToastContext();

  const closeToast = useCallback(() => {
    toastContext.toastDispatch({
      type: REMOVE,
      payload: { id: props.id },
    });
  }, [toastContext, props.id]);

  useEffect(() => {
    const timer = setTimeout(() => closeToast(), 3500);
    return () => clearTimeout(timer);
  }, [closeToast]);

  return (
    <Toast onClose={() => closeToast()}>
      <Toast.Header>
        <strong className="me-auto">{props.title}</strong>
      </Toast.Header>
      <Toast.Body>{props.body}</Toast.Body>
    </Toast>
  );
};
