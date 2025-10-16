import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

type User = {
	id: number;
	name: string;
	email: string;
	password: string; // hashed
};

@Injectable()
export class UsersService {
	private users: User[] = [];
	private idSequence = 1;

	async create(dto: CreateUserDto) {
		const exists = this.users.find((u) => u.email === dto.email);
		if (exists) {
			throw new ConflictException('Email already registered');
		}

		const saltRounds = 10;
		const hashed = await bcrypt.hash(dto.password, saltRounds);

		const user: User = {
			id: this.idSequence++,
			name: dto.name,
			email: dto.email,
			password: hashed,
		};

		this.users.push(user);

		// return copy without password
		const { password, ...rest } = user;
		return rest;
	}

	// helper for tests or future flows
	async findByEmail(email: string) {
		return this.users.find((u) => u.email === email);
	}
}

