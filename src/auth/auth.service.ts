import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { _400 } from '../common/error/error.messages';
import { LoginUserDTO } from './dto/login-user.dto';
import { compareHash } from '../common/lib/auth';
import { plainToInstance } from 'class-transformer';
import { LoginObjectDTO } from '../common/dto/loginResponseDTO';
import { LoginCounterService } from '../login-counter/login-counter.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private loginCounterService: LoginCounterService,
    private jwtService: JwtService,
  ) {}

  generateAccessToken = (user: User): Promise<string> => {
    const payload = { sub: user.id };
    return this.jwtService.signAsync(payload);
  };

  generateLoginResponse(data: LoginObjectDTO, accessToken: string): any {
    return {
      message: 'Login success',
      data,
      accessToken,
    };
  }

  async create(dto: CreateUserDTO) {
    const { email, password, username } = dto;

    // check whether user is present in the database.
    const emailExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (emailExists) throw new BadRequestException(_400.USER_ALREADY_EXISTS);

    const user = this.userRepository.create({
      email,
      username,
      password,
    });
    await this.userRepository.save(user);

    return user;

    // const hashPassword = await argon;
  }

  async login(dto: LoginUserDTO): Promise<any> {
    const { email, password } = dto;
    const userExists = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select([
        'user.id',
        // 'user.pkid',
        'user.email',
        'user.password',
        'user.salt',
        'user.createdAt',
        'user.updatedAt',
      ])
      .getOne();

    if (!userExists) {
      // TODO: come and throw an appopriate error message
      throw new BadRequestException('Bad credentials');
    }

    const isPasswordMatch = await compareHash(userExists, password);
    if (!isPasswordMatch) {
      await this.loginCounterService.addEmail(userExists);
      throw new BadRequestException('PASSWORDS_DO_NOT_MATCH');
    }

    const data: LoginObjectDTO = plainToInstance(LoginObjectDTO, userExists);

    // generate async token

    const token = await this.generateAccessToken(userExists);

    console.log(token);

    return this.generateLoginResponse(data, token);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }
}
