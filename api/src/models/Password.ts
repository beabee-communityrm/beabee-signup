import { Column } from 'typeorm';

export default class Password {
  @Column()
  hash!: string;

  @Column()
  salt!: string;

  @Column({ default: 1000 })
  iterations!: number;
}
