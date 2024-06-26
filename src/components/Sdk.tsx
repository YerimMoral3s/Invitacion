import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type SdkState = {
  user?: User;
  getUser: (id: string) => Promise<User | undefined>;
  updateSubGuest: (subGuest: SubGuest) => Promise<void>;
  acceptInvitation: () => Promise<User | undefined>;
  declineInvitation: () => Promise<User | undefined>;
};

const url = 'https://server-is.wip-mx.com/api/';
// const url = 'http://localhost:1337/api/';

export const useSDK = create<SdkState>((set, get) => ({
  getUser: async (id: string) => {
    const requestOptions = { method: 'GET' };

    try {
      const response = await fetch(
        `${url}guests/${id}?populate=*`,
        requestOptions,
      );
      const user: ApiResponse = await response.json();

      if (user.error) {
        console.error('Failed to fetch user:', user.error);
        set({ user: undefined });
        return undefined;
      } else {
        set({ user: user.data });
        return user.data;
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      set({ user: undefined });
      return undefined;
    }
  },

  updateSubGuest: async (subGuest: SubGuest) => {
    const user = get().user;

    if (!user) {
      return;
    }

    const updatedSubGuests = user.attributes.sub_guests.data.map((sg) =>
      sg.id === subGuest.id
        ? {
            ...sg,
            attributes: {
              ...sg.attributes,
              confirmation: subGuest.attributes.confirmation,
            },
          }
        : sg,
    );

    set({
      user: {
        ...user,
        attributes: {
          ...user.attributes,
          sub_guests: { data: updatedSubGuests },
        },
      },
    });
  },

  acceptInvitation: async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const user = get().user;

      if (!user) {
        return undefined;
      }

      const raw = JSON.stringify({
        id: user.id,
        confirmation: true,
        sub_guests: user.attributes.sub_guests.data.map((sg) => ({
          id: sg.id,
          confirmation: sg.attributes.confirmation,
        })),
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(`${url}confirmAssistance`, requestOptions);

      if (response.status !== 200) {
        console.error('Failed to update user:', response);
        return undefined;
      }

      const updatedUser = await response.json();

      set({
        user: {
          id: updatedUser.data.id,
          attributes: {
            ...updatedUser.data,
            sub_guests: {
              data: updatedUser.data.sub_guests.map((sg: SubGuest) => ({
                id: sg.id,
                attributes: { ...sg },
              })),
            },
          },
        },
      });

      return get().user;
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      return undefined;
    }
  },

  declineInvitation: async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const user = get().user;

      if (!user) {
        return undefined;
      }

      const raw = JSON.stringify({
        id: user.id,
        confirmation: false,
        sub_guests: user.attributes.sub_guests.data.map((sg) => ({
          id: sg.id,
          confirmation: false,
        })),
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(`${url}confirmAssistance`, requestOptions);

      if (response.status !== 200) {
        console.error('Failed to update user:', response);
        return undefined;
      }

      const updatedUser = await response.json();

      set({
        user: {
          id: updatedUser.data.id,
          attributes: {
            ...updatedUser.data,
            sub_guests: {
              data: updatedUser.data.sub_guests.map((sg: SubGuest) => ({
                id: sg.id,
                attributes: { ...sg },
              })),
            },
          },
        },
      });

      return get().user;
    } catch (error) {
      console.error('Failed to decline invitation:', error);
      return undefined;
    }
  },
}));

export type SubGuestAttributes = {
  Name: string;
  confirmation: boolean;
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
