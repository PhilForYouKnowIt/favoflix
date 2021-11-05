import { Button } from "react-bootstrap";
import { auth } from "services/firebase";
import { signOut } from "firebase/auth";

interface LogoutButtonProps {
  label: string;
}

export const LogoutButton = (props: LogoutButtonProps): JSX.Element => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Button variant="primary" onClick={handleLogout}>
      {props.label}
    </Button>
  );
};
