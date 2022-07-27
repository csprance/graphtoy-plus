import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TinyURL {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  url!: string;

  @Column('text')
  adminUrl!: string;

  @Column('text')
  hash!: string;

  @Column('jsonb')
  value!: string;

  @Column('bigint')
  hits!: number;
}
