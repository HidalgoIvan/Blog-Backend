import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from 'src/user/user.service';

export type UserData = {
  id: number;
  username: string;
};

export type AuthenticationResult = {
  valid: boolean;
  userData?: UserData;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    // do nothing
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthenticationResult> {
    const matchingUser = await this.userService.findOne(username);
    if (this._isValidUser(matchingUser, password)) {
      return {
        valid: true,
        userData: this._extractUserData(matchingUser),
      };
    }
    return {
      valid: false,
    };
  }

  async login(user: UserData) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private _isValidUser = (user: User, password: string) =>
    user && user.password === password;

  private _extractUserData = (user: User): UserData => {
    return {
      id: user.id,
      username: user.username,
    };
  };
}
