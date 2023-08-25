import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import cookieParser from 'cookie-parser'

const bootstrap = async () => {
	try {
		const app = await NestFactory.create<NestExpressApplication>(AppModule)

		app.setGlobalPrefix('api')
		app.enableCors({
			credentials: true,
			maxAge: 3600
		})
		app.use(cookieParser())

		const configService = app.get(ConfigService)
		const PORT = configService.get<number>('PORT', 3000)
		const HOST = configService.get<string>('HOST', 'localhost')

		await app.listen(PORT, () =>
			console.log(`Server is running on ${HOST}:${PORT}`)
		)
	} catch (e) {
		console.log(e)
	}
}

bootstrap
