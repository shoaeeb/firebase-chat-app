import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "../store/toast";
import useAuthUser from "../store/user";
import useUpdateOnlineStatus from "./useUpdateOnlineStatus";

function useLogOut() {
  const [signOut, loading, error] = useSignOut(auth);
  const { showToast } = useShowToast();
  const { logout: logoutUser } = useAuthUser();
  const { updateOnlineStatus } = useUpdateOnlineStatus();

  const logout = async () => {
    try {
      const success = await signOut();
      if (success) {
        updateOnlineStatus(false);
        showToast("Logout Successfully", "Success");
        localStorage.removeItem("user-info"); //remove from localStorage
        logoutUser(); //remove from state
        //update the onlineStatus of the doc
        return;
      }
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      showToast("Cannot Logout", "Error");
      console.log(error);
    }
  };
  return { loading, logout };
}

export default useLogOut;
