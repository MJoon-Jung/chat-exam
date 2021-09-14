import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Channels, ChannelMembers])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
