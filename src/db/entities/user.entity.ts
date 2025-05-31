import { genSalt } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashPassword } from '../../common/lib/auth';
import { LoginCounter } from './login-counter.entity';
import { JobApplication } from './job.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  pkid: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column('varchar', { select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LoginCounter, (loginCounter) => loginCounter.user)
  loginCounter: LoginCounter[];

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.user)
  jobApplications: JobApplication[];

  @BeforeInsert()
  private async generateSaltAndHash?(): Promise<void> {
    if (this.password) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.salt = await genSalt();
      this.password = await hashPassword(this.password, this.salt);
    }
  }
}
