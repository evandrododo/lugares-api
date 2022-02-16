import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LugaresController } from './lugares.controller';
import { LugaresRepository } from './lugares.repository';
import { LugaresService } from './lugares.service';

@Module({
  imports: [TypeOrmModule.forFeature([LugaresRepository]), AuthModule],
  controllers: [LugaresController],
  providers: [LugaresService],
})
export class LugaresModule {}
