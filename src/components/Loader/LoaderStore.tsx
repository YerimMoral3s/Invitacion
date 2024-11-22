import { create } from 'zustand';

type LoaderState<T = unknown> = {
  isLoading: boolean;
  promises: { id: string; promise: Promise<T> }[];
  addPromise: (promise: Promise<T>, from: string) => void;
};

export const loaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  promises: [],

  addPromise: (promise: Promise<unknown>, id: string) => {
    set((state) => {
      if (state.promises.some((p) => p.id === id)) {
        return state;
      }

      return {
        promises: [...state.promises, { id, promise }],
        isLoading: true,
      };
    });

    promise.finally(() => {
      set((state) => {
        const updatedPromises = state.promises.filter((p) => p.id !== id);
        return {
          promises: updatedPromises,
          isLoading: updatedPromises.length > 0,
        };
      });
    });
  },
}));
