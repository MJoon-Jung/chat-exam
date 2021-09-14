import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Channels])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
