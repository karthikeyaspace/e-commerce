import { db } from "../config/firebase";
import { ProductTypes } from "../types";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { randomUUID } from "crypto";

export class ProductService {
  private collection = collection(db, "ecommerce.products");

  async getProduct(id: string): Promise<ProductTypes> {
    const docRef = doc(this.collection, id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      throw new Error("Product not found");
    }
    const product = document.data();
    return product as ProductTypes;
  }

  async createProduct(
    productData: Omit<ProductTypes, "id" | "createdAt" | "updatedAt">
  ): Promise<ProductTypes> {
    const product: ProductTypes = {
      id: randomUUID(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = doc(this.collection, product.id);
    await setDoc(docRef, product);
    return product;
  }

  async updateProduct(
    productData: Omit<ProductTypes, "createdAt" | "updatedAt">
  ): Promise<ProductTypes> {
    const id = productData.id;
    const docRef = doc(this.collection, id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      throw new Error("Product not found");
    }

    const currentProduct = document.data() as ProductTypes;
    const updatedProduct: ProductTypes = {
      ...currentProduct,
      ...productData,
      id,
      updatedAt: new Date(),
    };

    await updateDoc(docRef, { ...updatedProduct });
    return updatedProduct;
  }

  async getStock(): Promise<ProductTypes[]> {
    const q = query(this.collection);
    const querySnapshot = await getDocs(q);
    const products: ProductTypes[] = [];

    querySnapshot.forEach((doc) => {
      products.push(doc.data() as ProductTypes);
    });

    return products;
  }
}
