import { create } from 'zustand';

type SubGuestAttributes = {
  Name: string;
  Confirmation: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type SubGuest = {
  id: number;
  attributes: SubGuestAttributes;
};

type Attributes = {
  phone_number: string;
  name: string;
  confirmation: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sub_guests: {
    data: SubGuest[];
  };
};

type User = {
  id: number;
  attributes: Attributes;
};

type SdkState = {
  user?: User;
  getUser: (id: string) => Promise<void>;
};

type ApiResponse = {
  data: User;
  error?: unknown;
};

export const useSDK = create<SdkState>((set) => ({
  getUser: async (id: string) => {
    const url = 'http://server-is.wip-mx.com/api/';
    const requestOptions = {
      method: 'GET',
    };

    try {
      const response = await fetch(
        `${url}guests/${id}?populate=*`,
        requestOptions,
      );
      const user: ApiResponse = await response.json();

      if (user.error) {
        console.error('Failed to fetch user:', user.error);
        set({ user: undefined });
      } else {
        set({ user: user.data });
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: undefined });
    }
  },
}));
