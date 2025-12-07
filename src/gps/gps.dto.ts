import { IsNumber, IsString } from 'class-validator';

export class GpsDto {
  @IsString()
  deviceId: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  speed?: number;
}