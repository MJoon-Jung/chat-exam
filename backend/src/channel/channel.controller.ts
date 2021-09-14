import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/logged-in';
import { User } from 'src/common/user.decorator';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/Create.Channel.Dto';
import { ExistChannelGuard } from './guards/exist-channel-guard';
import { MemberGuard } from './guards/member-guard';
import { NotMemberGuard } from './guards/not-member-guard';

@UseGuards(LoggedInGuard)
@Controller('api/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getChannels() {
    return this.channelService.findAll();
  }
  @HttpCode(201)
  @Post()
  async createChannel(@Body() data: CreateChannelDto, @User() user) {
    return this.channelService.createChannel(data.name, user.id);
  }

  @UseGuards(ExistChannelGuard, NotMemberGuard)
  @Post(':channelId')
  async joinChannel(
    @Param('channelId', ParseIntPipe) channelId: number,
    @User() user,
  ) {
    return this.channelService.joinChannel(channelId, user.id);
  }

  @UseGuards(ExistChannelGuard, MemberGuard)
  @Get(':channelId/members')
  async getChannelMembers(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.channelService.findChannelMembers(channelId);
  }

  @UseGuards(ExistChannelGuard, MemberGuard)
  @Delete(':channelId')
  async removeChannel(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.channelService.removeChannel(channelId);
  }
}
