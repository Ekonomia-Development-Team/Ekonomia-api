import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
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

	async login(dto: LoginUserDto) {
		const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
		if (!user || !user.password) {
			throw new UnauthorizedException('Invalid email or password');
		}

		const isPasswordValid = await bcrypt.compare(dto.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid email or password');
		}

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	async delete(id: number) {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		try {
			await this.prisma.user.delete({ where: { id } });
			return { message: 'User deleted successfully' };
		} catch (err) {
			throw new InternalServerErrorException('Failed to delete user');
		}
	}

	async findById(id: number) {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}
}

