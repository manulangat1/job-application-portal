import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { Public } from '../common/decorators/Public.decorator';
import { User } from '../db/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up to use the jobzy application' })
  @ApiResponse({ status: 200, description: 'User created Successfully' })
  @Post()
  @Public()
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
  @Public()
  async login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }

  @Get('/me/:id')
  @ApiResponse({
    status: 200,
    description: ' Get the user',
  })
  @HttpCode(200)
  async getUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.authService.getUserById(id);
  }
}
