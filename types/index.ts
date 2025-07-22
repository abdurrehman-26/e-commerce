import { Address } from "@/components/checkout-address-selection";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Product {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  price: number,
  compare_at_price: number,
  description: string;
  sku: string,
  images: string[]
  __v: number;
}

export interface ProductTableRow {
  key: string;
  slug: string;
  image: string;
  title: string;
  price: number;
  compare_at_price: number;
}

export interface signData {
    "timestamp": string,
    "signature": string,
    "apiKey": string,
    "cloudName": string,
    "folder": string
}

export type ProductFormData = {
  title: string;
  price: number | null,
  compare_at_price: number | null,
  description: string;
  images: string[],
  sku: string
};

export type user = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

export interface UserTableRow {
  key: string;
  fullname: string;
  username: string;
  email: string;
  datejoined: string;
  ordercount: string;
  totalspend: string;
}

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TableProduct = {
  title: string,
  image: string,
  slug: string,
  price: number
}

export type TableOrder = {
  _id: string;
  order_No: number;
  user_Details: { name: string; email: string };
  payment_Method: string;
  payment_Status: string;
  status: string;
  total: number;
  created_At: string;
};

export interface orderDetailItem {
    "product": {
      "image": string,
      "title": string,
    }
    "quantity": number,
    "price": number
    "total": number
}

export interface OrderDetails {
    "_id": string,
    "order_no": number,
    "items": [orderDetailItem],
    "shipping_address": Address,
    "billing_address": Address,
    "payment_method": string,
    "payment_status": "paid" | "unpaid",
    "paymentID"?: string,
    "sub_total": number,
    "tax": number,
    "shipping_cost": number,
    "total": number,
    "status": "pending" | "processing" | "shipped" | "delivered",
    "created_at": string,
    "user_details": {
        "name": string,
        "email": string
    }
}