import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('db')
export class PrismaController {
	constructor(private readonly prisma: PrismaService) {}

	@Get('health')
	async healthCheck() {
		// Testa conexão com o banco
		await this.prisma.$queryRaw`SELECT 1`;
		return { status: 'ok' };
	}
}
