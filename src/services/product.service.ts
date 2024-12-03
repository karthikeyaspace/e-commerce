import { db } from "../config/firebase";
import { ProductTypes } from "../types";
import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";

export class ProductService {
  private collection = collection(db, "products");

  async getProduct(id: string): Promise<ProductTypes> {
    try {
      const docRef = doc(this.collection, id);
      const document = await getDoc(docRef);
      const product = document.data();
      return product as ProductTypes;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async createProduct(product: ProductTypes): Promise<ProductTypes> {
    try {
      const docRef = doc(this.collection, product.id);
      const document = await getDoc(docRef);
      if (document.exists()) {
        throw new Error("Product already exists");
      }
      await addDoc(this.collection, product);
      return product;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateProduct(
    id: string,
    product: ProductTypes
  ): Promise<ProductTypes> {
    try {
      const docRef = doc(this.collection, id);
      const document = await getDoc(docRef);
      if (!document.exists()) {
        throw new Error("Product does not exist");
      }
      await updateDoc(docRef, { ...product });
      return product;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getStock(): Promise<ProductTypes[]> {
    try {
      // Get stock of all products
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
