import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { ConnectedUsers } from './interfaces/connected-users.interface';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesWsService {
  private connectedUsers: ConnectedUsers = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(socket: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User is not active');
    }

    this.checkIfUserIsConnected(user);

    this.connectedUsers[socket.id] = { socket, user };
  }

  removeUser(id: string) {
    delete this.connectedUsers[id];
  }

  getConnectedUsers(): string[] {
    return Object.keys(this.connectedUsers);
  }

  getUserById(socketId: string) {
    return this.connectedUsers[socketId].user.name;
  }

  private checkIfUserIsConnected(user: User) {
    for (const clientId in this.connectedUsers) {
      const connectedUser = this.connectedUsers[clientId];

      if (connectedUser.user.id === user.id) {
        connectedUser.socket.disconnect();
        break;
      }
    }
  }
}
