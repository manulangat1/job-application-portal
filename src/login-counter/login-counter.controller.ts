import { Controller } from '@nestjs/common';
import { LoginCounterService } from './login-counter.service';

@Controller('login-counter')
export class LoginCounterController {
  constructor(private readonly loginCounterService: LoginCounterService) {}
}
