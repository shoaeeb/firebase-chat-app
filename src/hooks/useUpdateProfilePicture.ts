import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

import useShowToast from "../store/toast";
import useAuthUser from "../store/user";
import { firestore } from "../firebase/firebase";

const useUpdateProfilePicture = () => {
  const storage = getStorage();
  const { user, setUser } = useAuthUser();
  const storageRef = ref(storage, `profilePicture/${user?.uid}`);
  const { showToast } = useShowToast();
  async function updateProfilePicture(selectedImage: string) {
    try {
      await uploadString(storageRef, selectedImage, "data_url");
      const downloadURL = await getDownloadURL(storageRef);
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        profilePicUrl: downloadURL,
      });
      setUser({
        ...user,
        profilePicUrl: downloadURL,
      });
      showToast("Uploaded Profile Picture Successfully", "Success");
    } catch (error) {
      showToast("Error while uploading", "Error");
      console.log(error);
    }
  }
  return {
    updateProfilePicture,
  };
};

export { useUpdateProfilePicture };
