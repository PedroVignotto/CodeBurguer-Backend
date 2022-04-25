import { Account } from './account'
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

@Entity('addresses')
export class Address {
  @PrimaryColumn()
  id!: string

  @Column()
  accountId!: string

  @ManyToOne(() => Account)
  account!: Account

  @Column()
  surname!: string

  @Column()
  zipCode!: string

  @Column()
  district!: string

  @Column()
  address!: string

  @Column()
  number!: number

  @Column({ nullable: true })
  complement?: string
}
