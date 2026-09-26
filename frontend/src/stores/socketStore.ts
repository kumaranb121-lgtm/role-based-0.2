import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>()((set, get) => ({
  socket: null,
  connect: (token: string) => {
    if (get().socket) return;
    
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || `http://${window.location.hostname}:3000`;
    const newSocket = io(SOCKET_URL, {
      auth: { token },
    });

    set({ socket: newSocket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
