import { Address } from "@/components/checkout-address-selection";
import { API_SERVER } from "@/constants";
import { Product, ProductFormData } from "@/types";
import { orderSummaryItem } from "@/types/API-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default class API {
  static async login(email: string, password: string) {
    const raw = JSON.stringify({
      email,
      password,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/login`,
        requestOptions,
      )
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async checkLogin({userCookies}: {userCookies?: ReadonlyRequestCookies}): Promise<{
    login: boolean,
    message: string
  }> {
    const requestHeaders = new Headers()
    if (userCookies) {
      requestHeaders.append("Cookie", userCookies.toString())
    }
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: requestHeaders,
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/checklogin`,
        requestOptions,
      )
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async signup(name: string, email: string, password: string) {
    const raw = JSON.stringify({
      name,
      email,
      password,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/signup`,
        requestOptions,
      )
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async logout(): Promise<{
    status: "success" | "failed",
    message: string
  }> {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/logout`,
        requestOptions,
      )
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async getuser(userCookies?: ReadonlyRequestCookies): Promise<{
    status: "success" | "failed",
    message: string,
    user: {
      name: string,
      email: string,
      userID: string,
      isAdmin: boolean
    }
  }> {
    const requestHeaders = new Headers()
    if (userCookies) {
        requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: requestHeaders,
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/getloggedinuser`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       throw error
    }
  }
  static async getProducts({
    page,
    userCookies
  }: {
    page?: number
    userCookies?: ReadonlyRequestCookies
  } = {}
  ): Promise<{status: string,
    data: Product[],
    pagination: {
      total: number,
      page: number,
      totalPages: number,
      limit: number
    }
  }> {
    const requestHeaders = new Headers()
    if (userCookies) {
        requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/products/?page=${page}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
  static async addProduct(product: ProductFormData) {
    const raw = JSON.stringify(product);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/products/add-product/`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
  static async updateProduct(product: ProductFormData, slug: string) {
    const raw = JSON.stringify(product);
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/products/update/${slug}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async getProductDetails(slug: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/products/getdetails/${slug}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async deleteProduct(id: string) {
    const requestOptions: RequestInit = {
      method: "DELETE",
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/products/${id}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async addToCart(productID: string, quantity: number) {
    const raw = JSON.stringify({productID, quantity});
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/cart/`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async removeFromCart(productID: string) {
    const raw = JSON.stringify({productID});
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/cart/`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async getCart(userCookies?: ReadonlyRequestCookies): Promise<{
    status: string,
    cart: {
      items: {
      productID: string
      title: string
      price: number
      quantity: number
      image: string
      slug: string
    }[]
    },
    message: string
  }> {
    const requestHeaders = new Headers()
    if (userCookies) {
        requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "GET",
      headers: requestHeaders,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/cart/`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async updateCartQuantity(productID: string, quantity: number) {
    const raw = JSON.stringify({productID, quantity});
    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/cart/`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async createCheckoutSession(mode: 'buyNow' | 'cart', productID?: string, quantity?: number) {
    const raw = JSON.stringify({mode, productID, quantity});
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/checkout/create`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async getCheckoutSession(token: string, userCookies?: ReadonlyRequestCookies) {
    const requestHeaders = new Headers()
    if (userCookies) {
        requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "GET",
      headers: requestHeaders,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/checkout/${token}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateCheckoutSessionAddresses(
    token: string,
    options?: {
      shippingAddressId?: string;
      billingAddressId?: string;
    },
    userCookies?: ReadonlyRequestCookies,
  ) {
    const { shippingAddressId, billingAddressId } = options || {};

    const addressesArgs: {
      shippingAddressId?: string;
      billingAddressId?: string;
    } = {};

    if (shippingAddressId) {
      addressesArgs.shippingAddressId = shippingAddressId;
    }
    if (billingAddressId) {
      addressesArgs.billingAddressId = billingAddressId;
    }

    const raw = JSON.stringify(addressesArgs);

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    if (userCookies) {
      requestHeaders.append("Cookie", userCookies.toString());
    }

    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: requestHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/checkout/${token}/addresses`,
        requestOptions
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  static async createorder(checkoutToken: string, paymentMethod: "card" | "cash_on_delivery") {
    const raw = JSON.stringify({checkoutToken, paymentMethod});
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/orders`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
  }
  static async AddAddress({address, userCookies}:{address: Address, userCookies?: ReadonlyRequestCookies}): Promise<{status: "success" | "failed", message: string, addedAddress: Address}> {
    const requestHeaders = new Headers()
    if (userCookies) {
      requestHeaders.append("Cookie", userCookies.toString());
    }
    requestHeaders.append("Content-Type", "application/json")
    const raw = JSON.stringify({...address})
    const requestOptions: RequestInit = {
      method: "POST",
      headers: requestHeaders,
      redirect: "follow",
      body: raw,
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/addresses/add`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async updateAddress({addressID, address, userCookies}:{addressID: string, address: Address, userCookies?: ReadonlyRequestCookies}): Promise<{status: "success" | "failed", message: string, updatedAddress: Address}> {
    const requestHeaders = new Headers()
    if (userCookies) {
      requestHeaders.append("Cookie", userCookies.toString());
    }
    requestHeaders.append("Content-Type", "application/json")
    const raw = JSON.stringify({...address})
    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: requestHeaders,
      redirect: "follow",
      body: raw,
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/addresses/update/${addressID}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async deleteAddress({addressID, userCookies}:{addressID: string, userCookies?: ReadonlyRequestCookies}): Promise<{status: "success" | "failed", message: string, updatedAddress: Address}> {
    const requestHeaders = new Headers()
    if (userCookies) {
      requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "DELETE",
      headers: requestHeaders,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/addresses/delete/${addressID}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async getUserAddresses(userCookies?: ReadonlyRequestCookies): Promise<{status: "success" | "failed", message: string, addresses: Address[]}> {
    const requestHeaders = new Headers()
    if (userCookies) {
        requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "GET",
      headers: requestHeaders,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/user/addresses`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error
    }
  }
  static async createPaymentIntent(orderId: string): Promise<{status: string, clientSecret: string, message: string}> {
    const raw = JSON.stringify({orderId});
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/payments/create-payment-intent`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
  static async getOrderSummary({confirmationToken, userCookies}: {confirmationToken: string, userCookies?: ReadonlyRequestCookies}): Promise<{status: string, order: {
    _id: string,
    orderNo: number,
    placedOn: string,
    items: orderSummaryItem[],
    paymentMethod: "card" | "cash_on_delivery",
    subTotal: number,
    tax: number,
    shippingCost: number,
    total: number
  }, message: string}> {
    const requestHeaders = new Headers()
    if (userCookies) {
        requestHeaders.append("Cookie", userCookies.toString());
    }
    const requestOptions: RequestInit = {
      method: "GET",
      headers: requestHeaders,
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/orders/order-summary/${confirmationToken}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  static async getMyOrderDetails({userCookies, orderId}:{userCookies: ReadonlyRequestCookies, orderId: string}): Promise<{
  _id: string;
  orderNo: number;
  items: {
    title: string,
    image: string,
    price: number,
    quantity: number
  }[];
  subTotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'card' | 'cash_on_delivery';
  paymentStatus: 'paid' | 'unpaid';
  stripePaymentId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address
  createdAt: string;
}> {
    const requestHeaders = new Headers()  
    requestHeaders.append("Cookie", userCookies.toString())
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: requestHeaders
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/orders/my-order-details/${orderId}`,
        requestOptions,
      );
      const result = await response.json();

      return result.order;
    } catch (error) {
      throw error
    }
  }

  static async getMyOrders({userCookies}:{userCookies: ReadonlyRequestCookies}): Promise<{
  _id: string,
  date: string,
  status: string,
  total: number,
  items: {
    title: string,
    image: string,
    price: number,
    quantity: number
  }[];
  createdAt: string;
}[]> {
    const requestHeaders = new Headers()  
    requestHeaders.append("Cookie", userCookies.toString())
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: requestHeaders
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/orders/my-orders/`,
        requestOptions,
      );
      const result = await response.json();

      return result.orders;
    } catch (error) {
      throw error
    }
  }

  static admin = class {
    static async getUsersList() {
      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        credentials: "include",
      };

      try {
        const response = await fetch(
          `${API_SERVER}/api/v1/admin/getuserslist`,
          requestOptions,
        );
        const result = await response.json();

        return result;
      } catch (error) {
         
        console.error(error);
      }
    }
    static async getAllTableProducts() {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/products/getproductsfortable`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
    }
    static async getAllTableOrders(userCookies: ReadonlyRequestCookies) {
    const requestHeaders = new Headers()  
    requestHeaders.append("Cookie", userCookies.toString())
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: requestHeaders
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/orders/get-table-orders`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
    }
    static async getOrderDetails(userCookies: ReadonlyRequestCookies, orderNo: string) {
    const requestHeaders = new Headers()  
    requestHeaders.append("Cookie", userCookies.toString())
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
      headers: requestHeaders
    };

    try {
      const response = await fetch(
        `${API_SERVER}/api/v1/orders/${orderNo}`,
        requestOptions,
      );
      const result = await response.json();

      return result;
    } catch (error) {
       
      console.error(error);
    }
    }

    static async updateOrderStatus(
      orderNo: string,
      status: "pending" | "processing" | "shipped" | "delivered",
      userCookies?: ReadonlyRequestCookies
    ): Promise<{ status: boolean; message?: string }> {

      const raw = JSON.stringify({ status });

      const headers = new Headers({
        "Content-Type": "application/json",
      });

      // Only append cookies if passed (i.e., server-side call)
      if (userCookies) {
        headers.append("Cookie", userCookies.toString());
      }

      const requestOptions: RequestInit = {
        method: "PUT",
        redirect: "follow",
        credentials: "include",
        headers,
        body: raw,
      };

      try {
        const response = await fetch(
          `${API_SERVER}/api/v1/orders/${orderNo}/status`,
          requestOptions
        );

        const result = await response.json();

        return result;
      } catch (error) {
        console.error("Failed to update order status:", error);
        return { status: false, message: "Network connection error" };
      }
    }

    static async updateOrderPaymentStatus(
      orderNo: string,
      paymentStatus: "unpaid" | "paid",
      userCookies?: ReadonlyRequestCookies
    ): Promise<{ status: "success" | "failed"; message?: string }> {

      const raw = JSON.stringify({ paymentStatus });

      const headers = new Headers({
        "Content-Type": "application/json",
      });

      // Only append cookies if passed (i.e., server-side call)
      if (userCookies) {
        headers.append("Cookie", userCookies.toString());
      }

      const requestOptions: RequestInit = {
        method: "PUT",
        redirect: "follow",
        credentials: "include",
        headers,
        body: raw,
      };

      try {
        const response = await fetch(
          `${API_SERVER}/api/v1/orders/${orderNo}/payment-status`,
          requestOptions
        );

        const result = await response.json();
        
        return result;
      } catch (error) {
        console.error("Failed to update order status:", error);
        return { status: "failed", message: "Network connection error" };
      }
    }
  };
}
