// import { auth, firestore } from "../firebase/firebase";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { collection, where, query, getDocs } from "firebase/firestore";
// import useShowToast from "../store/toast";
// import { useNavigate } from "react-router-dom";
// import useAuthUser from "../store/user";
// import useUpdateOnlineStatus from "./useUpdateOnlineStatus";

// type InputsType = {
//   email: string;
//   password: string;
// };

// function useLoginWithEmailAndPassword() {
//   const [signInWithEmailAndPassword, user, loading, error] =
//     useSignInWithEmailAndPassword(auth);

//   const { showToast } = useShowToast();
//   const { login } = useAuthUser();
//   const navigate = useNavigate();
//   const { updateOnlineStatus } = useUpdateOnlineStatus();

//   const signIn = async (inputs: InputsType) => {
//     if (!inputs.email || !inputs.password) {
//       return showToast("Fields Cannot be empty", "Error");
//     }
//     const res = await signInWithEmailAndPassword(inputs.email, inputs.password);
//     console.log(error);
//     if (!res) {
//       showToast("Invalid Credentials", "Error");
//       return;
//     }

//     if (res?.user.uid !== null && user !== null) {
//       //check for the right password or not

//       const userRef = collection(firestore, "users");
//       const q = query(userRef, where("uid", "==", res?.user.uid));
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         querySnapshot.forEach((doc) => {
//           if (inputs.password !== doc.data().password) {
//             showToast("Invalid Credentials", "Error");
//             return;
//           } else {
//             showToast("Login Successfully", "Success");
//             updateOnlineStatus(true); //update document online status to true
//             localStorage.setItem("user-info", JSON.stringify(doc.data()));
//             login(doc.data());
//             navigate("/");
//           }
//         });
//       }
//     }
//   };
//   return {
//     loading,
//     signIn,
//   };
// }

// export default useLoginWithEmailAndPassword;
import { auth, firestore } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../store/user";
import useUpdateOnlineStatus from "./useUpdateOnlineStatus";
import useShowToast from "../store/toast";

type InputsType = {
  email: string;
  password: string;
};

function useLoginWithEmailAndPassword() {
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { showToast } = useShowToast();
  const { login } = useAuthUser();
  const navigate = useNavigate();
  const { updateOnlineStatus } = useUpdateOnlineStatus();

  const signIn = async (inputs: InputsType) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Fields cannot be empty", "Error");
    }

    try {
      const res = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      console.log(res);

      if (!res?.user) {
        showToast("Invalid Credentials", "Error");
        return;
      }

      // Fetch user data from Firestore using UID from Auth
      const userRef = collection(firestore, "users");
      const q = query(userRef, where("uid", "==", res.user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          showToast("Login Successful", "Success");

          // Store user info in localStorage and call login
          localStorage.setItem("user-info", JSON.stringify(userData));

          login(userData);
          // Update user's online status
          updateOnlineStatus(true);

          // Redirect to home page or wherever necessary
          navigate("/");
        });
      }
    } catch (err) {
      console.error("Error during login:", err);
      showToast("Invalid Credentials", "Error");
    }
  };

  return {
    loading,
    signIn,
  };
}

export default useLoginWithEmailAndPassword;
