import { db } from "../config/firebase";
import { OrderTypes, ProductTypes, UserTypes } from "../types";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  Timestamp,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { randomUUID } from "crypto";

export class OrderService {
  private collection = collection(db, "ecommerce.orders");
  private userCollection = collection(db, "ecommerce.users");
  private productCollection = collection(db, "ecommerce.products");

  private async updateProductStock(productId: string, quantity: number) {
    const productRef = doc(this.productCollection, productId);
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw new Error("Product not found");
      }

      const product = productDoc.data() as ProductTypes;
      const newStock = product.stock - quantity;

      if (newStock < 0) {
        throw new Error("Insufficient stock");
      }

      transaction.update(productRef, { stock: newStock });
    });
  }

  private async validateOrder(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    const userRef = doc(this.userCollection, userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const productRef = doc(this.productCollection, productId);
    const productDoc = await getDoc(productRef);
    if (!productDoc.exists()) {
      throw new Error("Product not found");
    }

    const product = productDoc.data() as ProductTypes;
    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }
  }

  async createOrder(
    orderData: Omit<OrderTypes, "id" | "orderDate" | "createdAt" | "updatedAt">
  ): Promise<OrderTypes> {
    await this.validateOrder(
      orderData.userId,
      orderData.productId,
      orderData.quantity
    );

    const order: OrderTypes = {
      id: randomUUID(),
      ...orderData,
      orderDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = doc(this.collection, order.id);

    await runTransaction(db, async (transaction) => {
      await this.updateProductStock(order.productId, order.quantity);
      transaction.set(docRef, order);
    });

    return order;
  }

  async getOrder(id: string): Promise<OrderTypes> {
    const docRef = doc(this.collection, id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      throw new Error("Order not found");
    }
    const order = document.data();
    return order as OrderTypes;
  }

  async updateOrder(
    orderData: Omit<OrderTypes, "createdAt" | "updatedAt">
  ): Promise<OrderTypes> {
    const id = orderData.id;
    const docRef = doc(this.collection, id);

    const document = await getDoc(docRef);
    if (!document.exists()) {
      throw new Error("Order not found");
    }

    const currentOrder = document.data() as OrderTypes;

    if (currentOrder.quantity !== orderData.quantity) {
      await this.validateOrder(
        orderData.userId,
        orderData.productId,
        orderData.quantity
      );

      const quanDiff = orderData.quantity - currentOrder.quantity;
      await this.updateProductStock(orderData.productId, quanDiff);
    }

    const updatedOrder: OrderTypes = {
      ...currentOrder,
      ...orderData,
      id,
      updatedAt: new Date(),
    };

    await setDoc(docRef, updatedOrder);
    return updatedOrder;
  }

  async getRecentOrders(days: number): Promise<OrderTypes[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);

    const q = query(
      this.collection,
      where("orderDate", ">=", Timestamp.fromDate(date))
    );

    const querySnapshot = await getDocs(q);
    const orders: OrderTypes[] = [];

    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as OrderTypes);
    });

    return orders;
  }

  async getUserOrders(userId: string): Promise<OrderTypes[]> {
    const q = query(this.collection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const orders: OrderTypes[] = [];

    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as OrderTypes);
    });

    return orders;
  }

  async getProductOrders(productId: string): Promise<UserTypes[]> {
    const q = query(this.collection, where("productId", "==", productId));
    const querySnapshot = await getDocs(q);

    const userIds = new Set<string>();
    querySnapshot.forEach((doc) => {
      userIds.add((doc.data() as OrderTypes).userId);
    });

    const users: UserTypes[] = [];
    for (const userId of userIds) {
      const userDoc = await getDoc(doc(this.userCollection, userId));
      if (userDoc.exists()) {
        users.push(userDoc.data() as UserTypes);
      }
    }

    return users;
  }
}
