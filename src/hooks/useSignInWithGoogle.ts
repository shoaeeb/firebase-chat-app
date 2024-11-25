import useShowToast from "../store/toast";
import useAuthUser from "../store/user";
import { auth, firestore } from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const useLoginwithGoogle = () => {
  const { showToast } = useShowToast();
  const { login } = useAuthUser();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      // Get the Google provider result without signing in

      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;

      // Check if user exists with this email
      const userRef = collection(firestore, "users");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.password !== "") {
          // Immediately sign out and show error
          await auth.signOut();
          showToast("Please use email/password login instead", "Error");
          return;
        }
      }

      // Proceed with Google sign in for new users
      const userDoc = {
        uid: result.user.uid,
        email: result.user.email,
        username: result.user.displayName,
        bio: "",
        profilePicUrl: result.user.photoURL,
        conversations: [],
        createdAt: Date.now(),
        onlineStatus: true,
      };

      await setDoc(doc(firestore, "users", result.user.uid), userDoc);
      localStorage.setItem("user-info", JSON.stringify(userDoc));
      login(userDoc);
      showToast("Logged in successfully with Google", "Success");
    } catch (error) {
      console.error("Login error", error);
      showToast("Something went wrong", "Error");
      await auth.signOut();
    }
  };

  return { loginWithGoogle };
};

export default useLoginwithGoogle;
