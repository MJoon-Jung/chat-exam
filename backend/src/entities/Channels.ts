import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChannelChats } from './ChannelChat';
import { ChannelMembers } from './ChannelMembers';
@Entity({ name: 'channels' })
export class Channels {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @OneToMany(() => ChannelMembers, (channelmembers) => channelmembers.Channel)
  ChannelMembers: ChannelMembers;

  @OneToMany(() => ChannelChats, (channelchats) => channelchats.Channel)
  ChannelChats: ChannelChats;
}
