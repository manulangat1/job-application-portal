import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class LoginCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  counter: number;

  @Column('date', { nullable: true })
  lockedAt: Date;

  @Column({ default: false })
  locked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.loginCounter)
  user: User;
}
