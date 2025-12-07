import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpsModule } from './gps/gps.module';

@Module({
  imports: [GpsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
