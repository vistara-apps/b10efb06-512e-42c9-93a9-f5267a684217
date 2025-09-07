import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address } from 'viem';
import { MintState, User, ShmooPoint } from './types';

interface ShmooStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Mint state
  mintState: MintState;
  setMintState: (state: Partial<MintState>) => void;
  resetMintState: () => void;
  
  // Shmoo points
  shmooPoints: ShmooPoint[];
  addShmooPoint: (point: ShmooPoint) => void;
  setShmooPoints: (points: ShmooPoint[]) => void;
  
  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    timestamp: number;
  }>;
  addNotification: (notification: Omit<ShmooStore['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const initialMintState: MintState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  transactionHash: null,
};

export const useShmooStore = create<ShmooStore>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Mint state
      mintState: initialMintState,
      setMintState: (state) => 
        set((prev) => ({ 
          mintState: { ...prev.mintState, ...state } 
        })),
      resetMintState: () => set({ mintState: initialMintState }),
      
      // Shmoo points
      shmooPoints: [],
      addShmooPoint: (point) => 
        set((state) => ({ 
          shmooPoints: [...state.shmooPoints, point] 
        })),
      setShmooPoints: (points) => set({ shmooPoints: points }),
      
      // UI state
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const timestamp = Date.now();
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id, timestamp }
          ]
        }));
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
          get().removeNotification(id);
        }, 5000);
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'shmoo-store',
      partialize: (state) => ({
        user: state.user,
        shmooPoints: state.shmooPoints,
      }),
    }
  )
);

// Selectors for better performance
export const useUser = () => useShmooStore((state) => state.user);
export const useMintState = () => useShmooStore((state) => state.mintState);
export const useShmooPoints = () => useShmooStore((state) => state.shmooPoints);
export const useNotifications = () => useShmooStore((state) => state.notifications);
export const useIsLoading = () => useShmooStore((state) => state.isLoading);
