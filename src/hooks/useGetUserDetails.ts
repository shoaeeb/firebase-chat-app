import useShowToast from "../store/toast";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import useAuthUser from "../store/user";
import { firestore } from "../firebase/firebase";
import { useEffect, useState } from "react";

interface UserData {
  uid: string;
  email: string;
  username: string;
  bio: string;
  profilePicUrl: string;
  conversations: never[];
  createdAt: any;
  onlineStatus: any;
  password: any;
}
function useGetUserDetails() {
  const { user } = useAuthUser();
  const uid = user.uid;
  const [userData, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useShowToast();
  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("uid", "==", uid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const data = {
            uid: doc.data().uid,
            email: doc.data().email,
            username: doc.data().username,
            bio: doc.data().bio,
            profilePicUrl: doc.data().profilePicUrl,
            conversations: [],
            createdAt: doc.data().createdAt,
            onlineStatus: doc.data().onlineStatus,
            password: doc.data().password,
          };
          setData(data);
        });
      } catch (error) {
        console.log("Something Went Wrong", error);
        showToast("Can't fetch User Details", "Error");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, [uid]);
  return { userData, loading };
}

export default useGetUserDetails;
