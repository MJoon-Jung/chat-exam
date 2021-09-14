import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Repository } from 'typeorm';

@Injectable()
export class NotMemberGuard implements CanActivate {
  constructor(
    @InjectRepository(ChannelMembers)
    private channelmembersRepository: Repository<ChannelMembers>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const channelId = request.params.channelId;
    const user = request.user;
    const member = await this.channelmembersRepository.findOne({
      ChannelId: channelId,
      UserId: user.id,
    });
    if (member) {
      throw new ForbiddenException('이미 채널에 가입한 멤버입니다.');
    }
    return true;
  }
}
