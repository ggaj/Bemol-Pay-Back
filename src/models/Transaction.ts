import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  installments: number;

  @Column()
  card_number: string;

  @Column()
  holder: string;

  @Column()
  expiration_date: string;

  @Column()
  brand: string;

  @Column()
  authorization_code: string;

  @Column()
  payment_id: string;

  @Column()
  received_date: string;

  @Column()
  captured: boolean;

  @Column()
  provider: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
