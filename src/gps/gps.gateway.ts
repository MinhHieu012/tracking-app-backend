import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GpsGateway {
  @WebSocketServer()
  server: Server;

  /**
   * Emit data to all Angular clients
   */
  broadcastLocation(data: any) {
    this.server.emit('gps-update', data);
  }
}
