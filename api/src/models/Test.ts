import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Test {
  @PrimaryColumn()
  id!: string;
}
