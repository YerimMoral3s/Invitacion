import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const url = 'http://localhost:1337/api/';

// Función para obtener el usuario
const fetchUser = async () => {
  const id = getUserId();

  if (!id) {
    console.log('No id provided');
  }

  const response = await fetch(`${url}guests/${id}?populate=*`);
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

  const response = await fetch(`${url}confirmAssistance`, requestOptions);
  if (response.status !== 200) {
    console.log('Failed to update user');
    return;
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

  const response = await fetch(`${url}confirmAssistance`, requestOptions);
  if (response.status !== 200) {
    throw new Error('Failed to update user');
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

interface UpdateSubGuestVariables {
  subGuest: SubGuest;
  checked: boolean;
  user: User;
}

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

export type SuccessResponse = {
  data: User;
  meta: Record<string, unknown>;
  error: ErrorResponse;
};

export type ApiResponse = SuccessResponse;
