import { Body, Controller, Post, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() dto: CreateUserDto) {
		const user = await this.usersService.create(dto);
		return user;
	}

	@Post('login')
	async login(@Body() dto: LoginUserDto) {
		const user = await this.usersService.login(dto);
		return user;
	}

	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number) {
		const user = await this.usersService.findById(id);
		return user;
	}

	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		const result = await this.usersService.delete(id);
		return result;
	}
}

