import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Channels } from '../../entities/Channels';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Channels)
      .values([{ id: 1, name: 'chatting' }])
      .execute();
  }
}
