import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../dbservice/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateUserDto) {
		const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
		if (exists) {
			throw new ConflictException('Email already registered');
		}

		try {
			const saltRounds = 10;
			const hashed = await bcrypt.hash(dto.password, saltRounds);

			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					name: dto.name,
					password: hashed,
				},
			});
			const { password, ...rest } = user as any;
			return rest;
		} catch (err) {
			throw new InternalServerErrorException('Failed to create user');
		}
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}
}

