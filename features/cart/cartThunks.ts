// features/cart/cartThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/API";

export const syncCartQuantity = createAsyncThunk(
  "cart/syncCartQuantity",
  async ({ _id, quantity }: { _id: string; quantity: number }) => {
    await API.updateCartQuantity(_id, quantity); // uses your SDK
    return { _id, quantity };
  }
);

export const syncAddToCart = createAsyncThunk(
  "cart/syncAddToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    await API.addToCart(productId, quantity); // ✅ use correct signature
    return { productId, quantity };
  }
);

export const syncRemoveFromCart = createAsyncThunk(
  "cart/syncRemoveFromCart",
  async (_id: string) => {
    await API.removeFromCart(_id); // Replace with your SDK function
    return _id;
  }
);
