import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChannelChats } from './ChannelChat';
import { ChannelMembers } from './ChannelMembers';
import { Datetime } from './Datetime';

@Entity({ name: 'users' })
export class Users extends Datetime {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30, nullable: true })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @OneToMany(() => ChannelMembers, (channelmembers) => channelmembers.User)
  ChannelMembers: ChannelMembers;

  @OneToMany(() => ChannelChats, (channelchats) => channelchats.User)
  ChannelChats: ChannelChats;
}
