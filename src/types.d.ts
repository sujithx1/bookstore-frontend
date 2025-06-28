export type UserRole = "ADMIN" | "AUTHOR" | "USER";

export interface User_Tyeps {
  readonly id: string;
  mobile: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  Address?: Address_types[];
  profile?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddAdress_type {
  userId: string;
  address: Address_types;
}

export interface Address_types {
  _id: string;

  name: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}
export interface User_create_types {
  name: string;
  email: string;
  role: "USER" | "AUTHOR";
  mobile: string;
  password: string;
}
export interface InitialState_types {
  user: User_Tyeps | null;
  users: User_Tyeps[];
  isAuthenticated: boolean;
  isSuccess: boolean;
  loading: boolean;
  error: string | null;
}

export interface UserLogin_types {
  email: string;
  password: string;
}

export interface ErrorPayload {
  message: string;
  status?: number;
}

export interface User {
  userId: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  createdBy: string;
  isActive: boolean;
  TimeZone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  groupId?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  TimeZone?: string;
  groupId?: string;
}

export interface UpdateUserRequest {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  TimeZone?: string;
  groupId?: string;
}

export interface UserStats {
  totalUsers: number;
  superAdmins: number;
  admins: number;
  unitManagers: number;
  regularUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface UserFilters {
  role: UserRole | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
  searchTerm: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface BookCreate_types {
  title: string;
  description: string;

  price: string;
  status: string;
  picture: string;
  author: string;
  authorname: string;
}
export interface BookEdit_types {
  id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  picture: string;
}

export type SaleRecordType = {
  date: string;
  title: string;
  quantity: number;
  revenue: number;
  orderId: string;
};  
export interface BookState_types {
  id: string;
  bookId: string;
  title: string;
  description: string;
  author: string;
  isActive: boolean;
  authorname: string;
  price: number;
  picture: string;
  sellCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PurchaseState {
  id: string;
  purchaseId: string;
  bookId: string;
  userId: string;
  authorId: string;
  purchaseDate: Date;
  price: number;
}

export interface PurchaseState_History {
  id: string;
  purchaseId: string;
  userId: string;
  authorId: string;
  purchaseDate: Date;
  price: number;
  bookId: BookState_types;
}

export interface AuthorStats_Types {
  totalRevenue: number;
  monthlyRevenue: number;
  totalBooks: number;
  totalSales: number;
}

export interface PurchaseCreate_types {
  bookId: string;
  userId: string;
  authorId: string;
  price: number;
  address: string;
  paymentmethod: "razorpay" | "cod";
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    escape: boolean;
    ondismiss: () => void;
  };
}

export interface Razorpay {
  new (options: RazorpayOptions): RazorpayInstance;
  open(): void;
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: Razorpay;
  }
}

export interface Response_Razorpay_types {
  amount: number;
  currency: string;
  id: string;
}

export interface RecentSales_Types {
  id: string;
  purchaseId: string;
  bookId: {
    bookid: string;
    titile: string;
  };
  userId: string;
  paymentmethod: "razorpay" | "cod";
  paymentstatus: "completed" | "cancelled" | "pending";
  orderstatus: "completed" | "cancelled" | "pending";
  authorId: string;
  purchaseDate: Date;
  price: number;
  address: Address_types;
}

export interface SalesHistory_Types {
  id: string;
  purchaseId: string;
  bookId: {
    bookid: string;
    titile: string;
  };
  userId: {
    userId:string;
    name:string,
    email:string
  };
  paymentmethod: "razorpay" | "cod";
  paymentstatus: "completed" | "cancelled" | "pending";
  orderstatus: "completed" | "cancelled" | "pending";
  authorId: {
    authorId:string,
    authorName:string
  };
  purchaseDate: Date;
  price: number;
  address: Address_types;
}
