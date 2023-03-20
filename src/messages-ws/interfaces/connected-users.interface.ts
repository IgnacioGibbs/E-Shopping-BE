import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';

export interface ConnectedUsers {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}
