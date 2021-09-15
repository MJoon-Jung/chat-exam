import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    console.log('validate');
    const user = await this.userService.findOne(email);
    console.log(user);
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (user && isMatchedPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new ForbiddenException('일치하는 유저 정보가 없습니다.');
  }
  async createUser(email: string, nickname: string, password: string) {
    const user = await this.usersRepository.findOne({
      email,
    });
    if (user) {
      throw new ForbiddenException('이미 가입된 유저입니다.');
    }
    password = await bcrypt.hash(password, 12);
    return this.usersRepository.save({
      email,
      nickname,
      password,
    });
  }
  async loadInfo(id: number) {
    return;
  }
}
