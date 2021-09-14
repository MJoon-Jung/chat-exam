import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Channels } from './Channels';
import { Datetime } from './Datetime';
import { Users } from './Users';

@Entity({ name: 'channelmembers' })
export class ChannelMembers extends Datetime {
  @Column('int', { primary: true, name: 'ChannelId' })
  ChannelId: number;

  @Column('int', { primary: true, name: 'UserId' })
  UserId: number;

  @ManyToOne(() => Users, (users) => users.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'UserId', referencedColumnName: 'id' })
  User: Users;

  @ManyToOne(() => Channels, (channels) => channels.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ChannelId', referencedColumnName: 'id' })
  Channel: Channels;
}
