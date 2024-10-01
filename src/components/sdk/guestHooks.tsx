import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubGuest, User } from './types';
import { getUserId, url } from './userHooks';

export type updateSubGuestRequest = {
  id: number;
  sub_guests: { id: number; confirmation: boolean }[];
};

export const useUpdateGuestCache = () => {
  const queryClient = useQueryClient();
  const userId = getUserId();

  const updateCache = (subGuest: SubGuest, state: boolean) => {
    const previousUserData = queryClient.getQueryData<User>(['user', userId]);

    queryClient.setQueryData(['user', userId], (user: User | undefined) => {
      if (!user) return;
      user.attributes.sub_guests.data.map((sg) => {
        if (sg.id === subGuest.id) {
          sg.attributes.confirmation = state;
        }
        return sg;
      });

      return user;
    });

    return previousUserData;
  };

  return { updateCache };
};

export const updateSubGuest = async (requestData: updateSubGuestRequest) => {
  const response = await fetch(`${url}/api/confirmAssistance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to confirm assistance');
  }

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(
      responseData.error.message ||
        'Assistance confirmation failed or other API error',
    );
  }

  return responseData.data;
};

export const useUpdateGuestAPI = () => {
  const queryClient = useQueryClient();
  const userId = getUserId();

  return useMutation({
    mutationFn: updateSubGuest,
    onSuccess: (updatedUserData: User) => {
      queryClient.setQueryData(['user', userId], updatedUserData);
    },
    onError: (error) => {
      queryClient.invalidateQueries({
        queryKey: ['user', userId],
      });
      console.error('Error confirming assistance:', error.message);
    },
  });
};
