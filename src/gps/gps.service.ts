import { Injectable } from '@nestjs/common';
import { GpsDto } from './gps.dto';
import { GpsGateway } from './gps.gateway';

@Injectable()
export class GpsService {
  constructor(private gateway: GpsGateway) {}

  handleGpsUpdate(dto: GpsDto) {
    const payload = {
      deviceId: dto.deviceId,
      lat: dto.lat,
      lng: dto.lng,
      speed: dto.speed ?? 0,
      timestamp: Date.now(),
    };

    this.gateway.broadcastLocation(payload);
    return payload;
  }
}
