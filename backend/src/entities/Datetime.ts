import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class Datetime {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
