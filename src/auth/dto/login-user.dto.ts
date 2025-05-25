import { OmitType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

export class LoginUserDTO extends OmitType(CreateUserDTO, ['username']) {}
