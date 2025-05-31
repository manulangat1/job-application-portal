import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getProfile(user: User): Promise<any> {
    const userExist = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['jobApplications'],
    });

    if (!userExist) throw new BadRequestException('User not found');

    return userExist;
  }
}
