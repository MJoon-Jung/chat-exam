import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { channel } from 'diagnostics_channel';
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

  async findAllByUserId(userId: number) {
    return this.connection.query(
      `SELECT * 
      FROM channels c LEFT OUTER JOIN channelmembers m
      ON c.id = m.ChannelId
      WHERE c.id IN (SELECT ChannelId FROM channelmembers WHERE UserId = ${userId});`,
    );
  }

  async createChannel(channelName: string, userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const channel: ChannelDto = await queryRunner.manager
        .getRepository(Channels)
        .save({
          name: channelName,
        });
      await queryRunner.manager.getRepository(ChannelMembers).save(
        {
          ChannelId: channel.id,
          UserId: userId,
        },
        { reload: false },
      );
      await queryRunner.commitTransaction();
      return this.channelsRepository.findOne({
        join: {
          alias: 'channel',
          leftJoin: {
            ChannelMembers: 'channel.ChannelMembers',
          },
        },
        where: {
          id: channel.id,
        },
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
  async findChannelByName(channelName: string) {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .leftJoin(ChannelMembers, 'members', 'members.ChannelId = channel.id')
      .where('channel.name = :channelName', { channelName })
      .getMany();
  }
}
