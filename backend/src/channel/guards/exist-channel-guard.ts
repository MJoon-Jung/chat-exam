import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channels } from 'src/entities/Channels';
import { Repository } from 'typeorm';

@Injectable()
export class ExistChannelGuard implements CanActivate {
  constructor(
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const channelId = request.params.channelId;
    const channel = await this.channelsRepository.findOne({
      id: channelId,
    });
    if (!channel) {
      throw new NotFoundException('존재하지 않는 채널입니다.');
    }
    return true;
  }
}
