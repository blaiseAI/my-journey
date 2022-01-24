import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from './entities/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Observable<User> {
    // from converts a promise to an observable
    return from(this.UserRepository.save(createUserDto));
  }

  findAll(): Observable<User[]> {
    return from(this.UserRepository.find());
  }

  findOne(id: number): Observable<any> {
    return from(this.UserRepository.findOne(id));
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<any> {
    return from(this.UserRepository.update(id, updateUserDto));
  }

  remove(id: number): Observable<any> {
    return from(this.UserRepository.delete(id));
  }
}
