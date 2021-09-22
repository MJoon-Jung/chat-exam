import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { stringify } from 'querystring';
import { LoggedInGuard } from 'src/auth/logged-in';
import { User } from 'src/common/user.decorator';
import { ChannelService } from './channel.service';
import { ExistChannelGuard } from './guards/exist-channel-guard';
import { MemberGuard } from './guards/member-guard';
import { NotMemberGuard } from './guards/not-member-guard';

@UseGuards(LoggedInGuard)
@Controller('api/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async loadChannels(@User() user: any) {
    return this.channelService.findAllByUserId(user.id);
  }

  @Get('search')
  async loadChannel(@Query('name') channelName: string) {
    return this.channelService.findChannelByName(channelName);
  }
  @UseGuards(ExistChannelGuard, MemberGuard)
  @Get(':channelId/chats')
  async loadChats(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.channelService.findChatsByChannelId(channelId);
  }

  @HttpCode(201)
  @Post()
  async createChannel(@Body() data: any, @User() user) {
    return this.channelService.createChannel(data.channelName, user.id);
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

  @UseGuards(ExistChannelGuard, MemberGuard)
  @Post(':channelId/chats')
  async createChats(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body('content') content,
    @User() user,
  ) {
    return this.channelService.createChats(channelId, content, user.id);
  }
}
