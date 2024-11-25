import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import useShowToast from "../store/toast";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

function useSignUpWithEmailPassword() {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const { showToast } = useShowToast();

  const signUp = async (inputs: Inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username) {
      return showToast("Inputs cannot be empty", "Error");
    }
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);
    const q1 = query(userRef, where("email", "==", inputs.email));
    const querySnapshot1 = await getDocs(q1);
    if (!querySnapshot.empty || !querySnapshot1.empty) {
      showToast("User Already Exists", "Success");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      if (!newUser && error) {
        console.log("Error while Signup", error);
        return showToast("Something Went Wrong", "Error");
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          bio: "",
          profilePicUrl: "",
          createdAt: Date.now(),
          conversations: [],
          onlineStatus: true,
          password: inputs.password,
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        return showToast("Registered Successfully", "Success");
      }
    } catch (error) {
      console.log(error);
      return showToast("Something Went Wrong", "Error");
    }
  };

  return { loading, error, signUp };
}

export default useSignUpWithEmailPassword;
