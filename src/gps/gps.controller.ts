import { Body, Controller, Post } from '@nestjs/common';
import { GpsDto } from './gps.dto';
import { GpsService } from './gps.service';

@Controller('gps')
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Post()
  receiveGps(@Body() dto: GpsDto) {
    return this.gpsService.handleGpsUpdate(dto);
  }
}
