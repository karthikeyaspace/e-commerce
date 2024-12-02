interface UserTypes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductTypes {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderTypes {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  orderDate: Date;
  status: "pending" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
