import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { Connection, Repository } from 'typeorm';
import { ChannelDto } from './dto/channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelmembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private connection: Connection,
  ) {}

  async findAll() {
    return this.channelsRepository.find();
  }

  async createChannel(name: string, userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const channel: ChannelDto = await queryRunner.manager
        .getRepository(Channels)
        .save(
          {
            name,
          },
          { reload: false },
        );
      await queryRunner.manager.getRepository(ChannelMembers).save(
        {
          ChannelId: channel.id,
          UserId: userId,
        },
        { reload: false },
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return { success: true };
  }
  async findOne(id: number) {
    const channel = await this.channelsRepository.findOne({
      id,
    });
    if (!channel) {
      throw new NotFoundException('존재하지 않는 채널입니다.');
    }
    return channel;
  }
  async joinChannel(channelId: number, userId: number) {
    return this.channelmembersRepository.save({
      ChannelId: channelId,
      UserId: userId,
    });
  }

  async findChannelMembers(id: number) {
    return this.channelmembersRepository.find({
      where: {
        ChannelId: id,
      },
    });
  }
  async removeChannel(id: number) {
    await this.countMembersInChannel(id);
    const queryRunner = this.connection.createQueryRunner();
  }
  async countMembersInChannel(id: number) {
    const number = await this.channelmembersRepository
      .createQueryBuilder('member')
      .select('COUNT(*) AS count')
      .where('member.ChannelId = :id', { id })
      .getRawOne();
    if (number > 1) {
      throw new ForbiddenException('채널에 두명 이상이 존재합니다.');
    }
    return number;
  }
}
