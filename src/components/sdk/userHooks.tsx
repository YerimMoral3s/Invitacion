import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiResponse, User, UserUpdates } from './types';
import { useEffect, useRef } from 'react';

export const url = 'http://localhost:1337';

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
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender) {
      if (userid) {
        updateUser({ id: userid, updates: { seen: formatDate() } });
      }

      isFirstRender.current = false;
    }
  }, [userid]);

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
