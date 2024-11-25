import { doc, updateDoc } from "firebase/firestore";

import { firestore } from "../firebase/firebase";

const useUpdateOnlineStatus = () => {
  const updateOnlineStatus = async (updateStatus: boolean) => {
    try {
      const user = JSON.parse(localStorage.getItem("user-info") || "{}");
      const userRef = doc(firestore, "users", user?.uid);
      await updateDoc(userRef, {
        onlineStatus: updateStatus,
      });
      console.log("Online Status Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return { updateOnlineStatus };
};

export default useUpdateOnlineStatus;
