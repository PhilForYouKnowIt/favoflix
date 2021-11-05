import { Button } from "react-bootstrap";
import { auth } from "services/firebase";
import { signOut } from "firebase/auth";

export const LogoutButton = (): JSX.Element => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Button variant="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};
