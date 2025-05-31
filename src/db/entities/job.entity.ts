import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import {
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
  })
  description: JobApplicationRejectionStatus;

  @Column()
  link: string;

  @Column('varchar')
  expectedSalary: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
