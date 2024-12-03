interface UserTypes {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserTypes {
  name: string;
  email: string;
  phoneNumber: string;
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
  orderDate: Date;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { UserTypes, CreateUserTypes, ProductTypes, OrderTypes };
