import { Column, Entity, PrimaryColumn } from 'typeorm';
import Password from './Password';

@Entity()
export default class Organisation {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  addressLine1!: string;

  @Column()
  addressLine2!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column()
  postcode!: string;

  @Column()
  locale!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column(() => Password)
  password!: Password;
}
