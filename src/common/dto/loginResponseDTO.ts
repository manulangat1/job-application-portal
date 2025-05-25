import { Exclude, Expose } from 'class-transformer';

export class LoginObjectDTO {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}

export class LoginResponseDTO {
  message: string;
  status: string;
  data: LoginObjectDTO;
}
