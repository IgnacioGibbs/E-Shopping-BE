import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerUser(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.server.emit(
      'connectedUsers',
      this.messagesWsService.getConnectedUsers(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeUser(client.id);
  }

  @SubscribeMessage('messageFromUser')
  handleMessage(client: Socket, payload: NewMessageDto): void {
    // Se puede hacer la función asíncrona para guardar el mensaje en DB y luego emitirlo

    // Emit only to the sender
    // client.emit('messageFromUser', payload);

    // Emit to all connected users except the sender
    // client.broadcast.emit('messageFromUser', payload);

    // Emit to all connected users
    this.server.emit('messageFromServer', {
      userName: this.messagesWsService.getUserById(client.id),
      message: payload.message || 'No message!',
    });

    // Emit to a specific user
    // this.server.to('someId').emit('messageFromUser', payload);

    // Emit to a specific room
    // this.server.to('someRoom').emit('messageFromUser', payload);
  }
}
