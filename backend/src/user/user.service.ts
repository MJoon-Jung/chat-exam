import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async findOne(email: string) {
    const user = await this.usersRepository.findOne(
      { email },
      {
        select: [
          'id',
          'email',
          'nickname',
          'password',
          'createdAt',
          'updatedAt',
        ],
        relations: ['ChannelMembers'],
      },
    );
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return user;
  }
}
