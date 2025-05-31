import { Controller, Get, HttpCode } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '../db/entities/user.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @HttpCode(200)
  async getUserProfile(@CurrentUser() user: User): Promise<User> {
    return this.profileService.getProfile(user);
  }
}
