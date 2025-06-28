import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import {
  Currency,
  JobApplicationRejectionStatus,
  JobApplicationStatus,
} from '../../common/enums/common-enums.dto';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  pkid: string;

  @Column()
  @Index()
  name: string;

  @Column({
    type: 'enum',
    enum: JobApplicationStatus,
    default: JobApplicationStatus.APPLIED,
  })
  status: JobApplicationStatus;

  @Column({
    type: 'enum',
    enum: JobApplicationRejectionStatus,
    nullable: true,
  })
  description: JobApplicationRejectionStatus | null;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.KES,
  })
  currency: Currency;

  @Column()
  link: string;

  @Column('varchar')
  expectedSalary: number;

  @Column('date')
  appliedDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  offerExtendedDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  offerRejectedDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  contractSignedDate: Date;
  @ManyToOne(() => User, (user) => user.jobApplications)
  user: User;

  //   implement reminders here

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
