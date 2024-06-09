import { create } from 'zustand';

export type SdkState = {
  user?: User;
  getUser: (id: string) => Promise<void>;
  updateSubGuest: (subGuest: SubGuest) => Promise<void>;
};

export const useSDK = create<SdkState>((set, get) => ({
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
  updateSubGuest: async (subGuest: SubGuest) => {
    const user = get().user;

    if (!user) {
      return;
    }

    user.attributes.sub_guests.data.filter((sg) => {
      if (sg.id === subGuest.id) {
        sg.attributes.Confirmation = subGuest.attributes.Confirmation;
      }
    });
  },
}));

export type SubGuestAttributes = {
  Name: string;
  Confirmation: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type SubGuest = {
  id: number;
  attributes: SubGuestAttributes;
};

export type Attributes = {
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

export type User = {
  id: number;
  attributes: Attributes;
};

export type ApiResponse = {
  data: User;
  error?: unknown;
};
