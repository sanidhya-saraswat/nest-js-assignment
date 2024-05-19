import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done) {
    done(null, user.id);
  }

  async deserializeUser(id: number, done) {
    const user = await this.usersService.findOneById(id);
    done(null, user);
  }
}
