/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCounter } from '../db/entities/login-counter.entity';
import { Repository } from 'typeorm';

import { getDurationInMinutes } from '../common/utils/duration';
import { User } from '../db/entities/user.entity';

@Injectable()
export class LoginCounterService {
  private lockedOutPeriod;
  constructor(
    @InjectRepository(LoginCounter)
    private loginCounterRepository: Repository<LoginCounter>,
  ) {
    this.lockedOutPeriod = 1;
  }

  async create(data: LoginCounter): Promise<LoginCounter> {
    const loginCounter = this.loginCounterRepository.create(data);
    return this.loginCounterRepository.save(loginCounter);
  }

  async find(userId: number): Promise<any> {
    const loginCounter = await this.loginCounterRepository.findOne({
      where: {
        user: { id: userId },
      },
    });
    return loginCounter;
  }

  async handleLockingUser(userFromLoginCounter: LoginCounter): Promise<any> {
    const minutes = getDurationInMinutes(userFromLoginCounter.lockedAt);

    if (minutes && minutes >= this.lockedOutPeriod) {
      userFromLoginCounter.locked = false;
      // userFromLoginCounter.lockedAt = null;
      userFromLoginCounter.counter = 1;
      const data = await this.create(userFromLoginCounter);
      return data;
    }

    if (userFromLoginCounter.counter < 5) {
      userFromLoginCounter.locked = false;
      userFromLoginCounter.counter += 1;
      const data = await this.create(userFromLoginCounter);
      return data;
    } else {
      userFromLoginCounter.locked = true;
      userFromLoginCounter.lockedAt = userFromLoginCounter.lockedAt
        ? userFromLoginCounter.lockedAt
        : new Date();
      await this.create(userFromLoginCounter);
      throw new BadRequestException(
        `You are making too many requests in a short interval. Try again after ${this.lockedOutPeriod} minutes.`,
      );
    }
  }

  async addEmail(user: Partial<User>): Promise<any> {
    if (user.id) {
      const foundUser = await this.find(user.id);
      if (foundUser) {
        this.handleLockingUser(foundUser);
      } else {
        const newUserData = {
          ...foundUser,
          counter: 1,
          user,
          locked: false,
        };
        const data = await this.create(newUserData);
        return data;
      }
    }
  }
}
