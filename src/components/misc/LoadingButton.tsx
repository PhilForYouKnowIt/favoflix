import { ReactNode } from "react";
import { Button, ButtonProps } from "react-bootstrap";

interface LoadingButtonProps extends ButtonProps {
  loadingCondition: boolean;
  loadingText?: string;
  children?: ReactNode;
}

const LoadingButton = ({
  loadingCondition,
  loadingText,
  children,
  ...props
}: LoadingButtonProps): JSX.Element => {
  return (
    <Button
      type={props.type ? props.type : "submit"}
      {...props}
      disabled={loadingCondition}
    >
      {loadingCondition ? (
        <>
          <span className="spinner-border spinner-border-sm mr-1" />{" "}
          {loadingText ? loadingText : "Saving..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
