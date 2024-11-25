import { updateDoc, doc } from "firebase/firestore";
import useShowToast from "../store/toast";
import { firestore } from "../firebase/firebase";
import useAuthUser from "../store/user";
import { UserFormType } from "../components/UserForm";
import { useState } from "react";

function useUpdateUser() {
  const { showToast } = useShowToast();
  const { user } = useAuthUser();
  const [loading, setLoading] = useState(false);

  const updateUser = async (data: UserFormType) => {
    setLoading(true);
    try {
      const userRef = doc(firestore, "users", user.uid);
      const result = await updateDoc(userRef, data);
      showToast("Updated Successfully", "Success");
      console.log(result);
    } catch (error) {
      showToast("Something Went Wrong", "Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    updateUser,
  };
}
export default useUpdateUser;
