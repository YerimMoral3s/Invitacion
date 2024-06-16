import { create } from 'zustand';

export type SdkState = {
  user?: User;
  getUser: (id: string) => Promise<User | undefined>;
  updateSubGuest: (subGuest: SubGuest) => Promise<void>;
  // updateGuest: () => Promise<User | undefined>;
  acceptInvitation: () => Promise<User | undefined>;
  declineInvitation: () => Promise<User | undefined>;
};

const url = 'http://server-is.wip-mx.com/api/';

export const useSDK = create<SdkState>((set, get) => ({
  getUser: async (id: string) => {
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
        return undefined;
      } else {
        set({ user: user.data });
        console.log('user', {
          user: user.data,
        });
        return user.data;
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

    user.attributes.sub_guests.data.find((sg) => {
      if (sg.id === subGuest.id) {
        sg.attributes.confirmation = subGuest.attributes.confirmation;
      }
    });

    set({ user });
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

      const response = await fetch(
        'http://server-is.wip-mx.com/api/confirmAssistance',
        requestOptions,
      );

      if (response.status !== 200) {
        console.error('Failed to update user:', response);
        return undefined;
      }

      const updatedUser = await response.json();

      set({
        user: {
          ...user,
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
      console.error('Failed to fetch user:', error);
    }
  },

  declineInvitation: async () => {
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

    const response = await fetch(
      'http://server-is.wip-mx.com/api/confirmAssistance',
      requestOptions,
    );

    if (response.status !== 200) {
      console.error('Failed to update user:', response);
      return undefined;
    }

    const updatedUser = await response.json();

    set({
      user: {
        ...user,
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
