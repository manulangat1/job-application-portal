import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up to use the jobzy application' })
  @ApiResponse({ status: 200, description: 'User created Successfully' })
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.authService.create(body);
  }

  @ApiOperation({ summary: 'Sign in to use the jobzy application' })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiResponse({
    status: 400,
    description: 'Error while logging into the application',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while logging into the application',
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }
}
