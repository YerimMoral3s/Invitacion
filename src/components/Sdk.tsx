import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const url = 'http://localhost:1337';

// Función para obtener el usuario
const fetchUser = async () => {
  const id = getUserId();

  if (!id) {
    console.log('No id provided');
  }

  const response = await fetch(`${url}/api/guests/${id}?populate=*`);
  const user: ApiResponse = await response.json();

  if (user.error) {
    console.log('Failed to fetch user');
  }
  return user.data;
};
// Hook para obtener el id de los parametros
export const getUserId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
};
// Hook para obtener el usuario
export const useUser = () => {
  const userid = getUserId();

  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    enabled: !!userid,
    notifyOnChangeProps: 'all',
    staleTime: 0,
  });
};
// Función para aceptar invitación
const acceptInvitation = async (user: User) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

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

  const response = await fetch(`${url}/api/confirmAssistance`, requestOptions);
  if (response.status !== 200) {
    throw new Error('Failed to update user, acceptInvitation');
  }

  const updatedUser = await response.json();
  return updatedUser.data;
};

// Hook para aceptar invitación
export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptInvitation,
    onMutate: async (user: User) => {
      queryClient.setQueryData(['user'], {
        ...user,
        attributes: { ...user.attributes, confirmation: true },
      });
    },
    onError: (error) => {
      console.log('Error', error);
      return 'Algo salió mal, por favor intenta de nuevo';
    },
  });
};
// Función para rechazar invitación
const declineInvitation = async (user: User) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

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

  const response = await fetch(`${url}/api/confirmAssistance`, requestOptions);
  if (response.status !== 200) {
    throw new Error('Failed to update user, declineInvitation');
  }

  const updatedUser = await response.json();
  return updatedUser.data;
};
// Hook para rechazar invitación
export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: declineInvitation,
    onMutate: async (user: User) => {
      queryClient.setQueryData(['user'], {
        ...user,
        attributes: {
          ...user.attributes,
          confirmation: false,
          sub_guests: {
            data: user.attributes.sub_guests.data.map((sg) => ({
              ...sg,
              attributes: { ...sg.attributes, confirmation: false },
            })),
          },
        },
      });
    },
    onError: (error) => {
      console.log('Error', error);
      return 'Algo salió mal, por favor intenta de nuevo';
    },
  });
};
// getPlaces from api
export const getPlaces = async () => {
  const response = await fetch(`${url}/api/places?populate=*`);
  const data: ApiResponsePlaces = await response.json();

  if (data.error) {
    console.log('Failed to fetch places');
    throw new Error('Failed to fetch places');
  }

  return data.data;
};
// Hook to get places
export const usePlaces = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: getPlaces,
  });
};

type UpdateSubGuestVariables = {
  subGuest: SubGuest;
  checked: boolean;
  user: User;
};

// Función para actualizar subinvitados
export const useUpdateSubGuest = () => {
  const queryClient = useQueryClient();

  return ({ subGuest, checked, user }: UpdateSubGuestVariables) => {
    const updatedSubGuest = {
      ...subGuest,
      attributes: { ...subGuest.attributes, confirmation: checked },
    };

    const updatedSubGuests = user.attributes.sub_guests.data.map((sg) =>
      sg.id === subGuest.id ? updatedSubGuest : sg,
    );

    const updatedUser = {
      ...user,
      attributes: {
        ...user.attributes,
        sub_guests: { data: updatedSubGuests },
      },
    };

    queryClient.setQueryData(['user'], updatedUser);
  };
};

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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  confirmation: boolean;
  sub_guests: {
    data: SubGuest[];
  };
};

export type User = {
  id: number;
  attributes: Attributes;
};

export type ErrorResponse = {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
};

export type ApiResponse = {
  data: User;
  meta: Record<string, unknown>;
  error: ErrorResponse;
};
export type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export type ImageData = {
  id: number;
  attributes: ImageAttributes;
};

export type Image = {
  data: ImageData;
};

export type PlaceAttributes = {
  name: string;
  address: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  airbnb: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
};

export type Place = {
  id: number;
  attributes: PlaceAttributes;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: PaginationMeta;
};

export type ApiResponsePlaces = {
  data: Place[];
  meta: Meta;
  error: ErrorResponse;
};
