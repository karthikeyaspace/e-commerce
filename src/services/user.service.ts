import { db } from "../config/firebase";
import { UserTypes } from "../types";
import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";

export class UserService {
  private collection = collection(db, "users");

  async getUser(id: string): Promise<UserTypes> {
    try {
      const docRef = doc(this.collection, id);
      const document = await getDoc(docRef);
      const user = document.data();
      return user as UserTypes;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createUser(user: UserTypes): Promise<UserTypes> {
    try {
      const docRef = doc(this.collection, user.email);
      const document = await getDoc(docRef);
      if (document.exists()) {
        throw new Error("User already exists");
      }
      await addDoc(this.collection, user);
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateUser(id: string, user: UserTypes): Promise<UserTypes> {
    try {
      const docRef = doc(this.collection, id);
      const document = await getDoc(docRef);
      if (!document.exists()) {
        throw new Error("User does not exist");
      }
      await updateDoc(docRef, { ...user });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
