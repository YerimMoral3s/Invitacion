import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiResponse, SubGuest, User, UserUpdates } from './types';
import { useEffect } from 'react';

// export const url = 'http://localhost:1337';
export const url = 'https://server-is.wip-mx.com';

const formatDate = () => {
  const date = new Date();
  return date.getTime();
};

const fetchUser = async () => {
  const id = getUserId();

  if (!id) {
    throw new Error('No user ID provided');
  }

  const response = await fetch(`${url}/api/guests/${id}?populate=*`);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const user: ApiResponse = await response.json();

  if (user.error) {
    throw new Error(user.error.message || 'User not found or other API error');
  }

  return user.data;
};

export const getUserId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id) {
    return parseInt(id);
  }
  return null;
};

export const useUser = () => {
  const userid = getUserId();

  useEffect(() => {
    if (userid) {
      const d = formatDate() as unknown as string;
      updateUser({ id: userid, updates: { seen: d } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useQuery({
    queryKey: ['user', userid],
    queryFn: fetchUser,
    notifyOnChangeProps: 'all',
    staleTime: 0,
  });
};

type UpdateUser = {
  id: number;
  updates: UserUpdates;
};

export const updateUser = async ({ id, updates }: UpdateUser) => {
  const response = await fetch(`${url}/api/guests/${id}?populate=*`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: updates }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      responseData.error.message || 'User update failed or other API error',
    );
  }

  return responseData.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const userId = getUserId();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', userId], (oldData: User) => {
        return {
          ...oldData,
          ...data,
        };
      });
    },
    onError: (error) => {
      queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
      console.error('Error confirming assistance:', error.message);
    },
  });
};

const getGuests = async () => {
  const _url = `${url}/api/guests-with-sub-guests`;

  try {
    const response = await fetch(_url);

    if (!response.ok) {
      console.error('Failed to fetch guests:', response);
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`,
      );
    }

    const guests = await response.json();

    return guests.data as User[];
  } catch (error) {
    console.error('Failed to fetch guests:', error);
    throw new Error(
      `Failed to fetch guests: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

// Hook personalizado para obtener la lista de invitados
export const useGuests = () => {
  return useQuery({
    queryKey: ['guests'],
    queryFn: getGuests,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

const updateGuestOrSubGuest = async ({
  id,
  type,
  updates,
}: {
  id: number;
  type: 'user' | 'subGuest';
  updates: Partial<User['attributes']> | Partial<SubGuest['attributes']>;
}) => {
  const _url = `${url}/api/${type === 'user' ? 'guests' : 'sub-guests'}/${id}`;
  const response = await fetch(_url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: updates }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update ${type}: ${response.status} - ${response.statusText}`,
    );
  }

  return response.json(); // Suponiendo que el servidor devuelve los datos actualizados
};

export const useUpdateGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGuestOrSubGuest,
    onMutate: async ({ id, type, updates }) => {
      // Cancelar cualquier actualización en curso para evitar conflictos

      queryClient.cancelQueries({ queryKey: ['guests'] });

      // Obtener los datos en caché
      const cachedGuests = queryClient.getQueryData<User[]>(['guests']);

      // Crear un estado optimista
      if (cachedGuests) {
        const updatedGuests = cachedGuests.map((guest) => {
          if (type === 'user' && guest.id === id) {
            return {
              ...guest,
              attributes: {
                ...guest.attributes,
                ...updates, // Actualizar los atributos del usuario
              },
            };
          }

          if (type === 'subGuest') {
            return {
              ...guest,
              attributes: {
                ...guest.attributes,
                sub_guests: {
                  data: guest.attributes.sub_guests.data.map((subGuest) =>
                    subGuest.id === id
                      ? {
                          ...subGuest,
                          attributes: {
                            ...subGuest.attributes,
                            ...updates, // Actualizar los atributos del subinvitado
                          },
                        }
                      : subGuest,
                  ),
                },
              },
            };
          }

          return guest;
        });

        // Actualizar el caché con el estado optimista
        queryClient.setQueryData(['guests'], updatedGuests);
      }

      return { cachedGuests }; // Devolver el estado anterior para revertirlo en caso de error
    },
    onError: (error, _, context) => {
      if (context?.cachedGuests) {
        queryClient.setQueryData(['guests'], context.cachedGuests);
      }
      console.error('Error al actualizar:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['guests'],
      });
    },
  });
};
