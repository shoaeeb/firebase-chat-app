import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useEffect, useState } from "react";
import useAuthUser from "../store/user";
import { UserType } from "../types/types";

function useGetAllUser() {
  const { user } = useAuthUser();
  const [users, setUsers] = useState<[UserType]>();

  useEffect(() => {
    async function getAllUsers() {
      if (!user?.uid) return;
      const userRef = collection(firestore, "users");
      const q = query(userRef);
      const userList: any = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userList.push(doc.data());
      });
      setUsers(userList);
    }
    getAllUsers();
  }, [user?.uid]);
  return {
    users,
  };
}

export default useGetAllUser;
