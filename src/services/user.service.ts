import { db } from "../config/firebase";
import { UserTypes } from "../types";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { randomUUID } from "crypto";

export class UserService {
  private collection = collection(db, "ecommerce.users");

  async getUser(id: string): Promise<UserTypes> {
    const docRef = doc(this.collection, id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      throw new Error("User not found");
    }
    const user = document.data();
    return user as UserTypes;
  }

  async createUser(
    userData: Omit<UserTypes, "id" | "createdAt" | "updatedAt">
  ): Promise<UserTypes> {
    const q = query(this.collection, where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("User already exists");
    }

    const user: UserTypes = {
      id: randomUUID(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = doc(this.collection, user.id);
    await setDoc(docRef, user);
    return user;
  }

  async updateUser(userData: UserTypes): Promise<UserTypes> {
    const docRef = doc(this.collection, userData.id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      throw new Error("User not found");
    }

    const updatedAt = new Date();
    await updateDoc(docRef, {
      ...userData,
      updatedAt: updatedAt,
    });

    return { ...userData, updatedAt };
  }
}
