import { db } from "../config/firebase";
import { OrderTypes } from "../types";
import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";

export class OrderService {
  private collection = collection(db, "orders");

  async getOrder(id: string): Promise<OrderTypes> {
    try {
      const docRef = doc(this.collection, id);
      const document = await getDoc(docRef);
      const order = document.data();
      return order as OrderTypes;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createOrder(order: OrderTypes): Promise<OrderTypes> {
    try {
      const docRef = doc(this.collection, order.id);
      const document = await getDoc(docRef);
      if (document.exists()) {
        throw new Error("Order already exists");
      }
      await addDoc(this.collection, order);
      return order;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateOrder(id: string, order: OrderTypes): Promise<OrderTypes> {
    try {
      const docRef = doc(this.collection, id);
      const document = await getDoc(docRef);
      if (!document.exists()) {
        throw new Error("Order does not exist");
      }
      await updateDoc(docRef, { ...order });
      return order;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getRecentOrders(days: number): Promise<OrderTypes[]> {
    try {
      // Get recent orders
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getUserOrders(userId: string): Promise<OrderTypes[]> {
    try {
      // Get orders by user id
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getProductOrders(productId: string): Promise<OrderTypes[]> {
    try {
      // Get orders by product id
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
