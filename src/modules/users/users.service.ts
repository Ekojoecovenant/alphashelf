import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async create(data: Partial<User>) {
    const existing = await this.findByEmail(data.email!);
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }
}
