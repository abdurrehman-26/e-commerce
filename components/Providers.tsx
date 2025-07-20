// app/providers.tsx
import { cookies } from 'next/headers';
import { StoreProvider } from '@/components/store-provider';
import API from '@/API';

export default async function Providers({ children }: { children: React.ReactNode }) {
  const userCookies = await cookies();

  const userData = await API.getuser(userCookies);
  const cartData = await API.getCart(userCookies)

  return (
    <StoreProvider
      preloadedState={{
        user: {
          data: userData.user || null,
          isAuthenticated: !!userData.user,
          loading: false,
          error: null,
        },
        cart: {
          items: cartData.cart.items,
          loading: false,
          error: null,
        },
      }}
    >
      {children}
    </StoreProvider>
  );
}
