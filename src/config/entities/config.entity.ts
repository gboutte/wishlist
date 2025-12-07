import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryColumn()
  code: string;

  @Column()
  value: string;
}
