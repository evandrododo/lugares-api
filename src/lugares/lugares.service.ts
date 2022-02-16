import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { GetLugaresFilterDto } from './dto/get-lugares-filter.dto';
import { Lugar } from './lugar.entity';
import { LugaresRepository } from './lugares.repository';

@Injectable()
export class LugaresService {
  constructor(
    @InjectRepository(LugaresRepository)
    private readonly lugaresRepository: LugaresRepository,
  ) {}

  async getLugarById(id: string, user: User): Promise<Lugar> {
    const found = await this.lugaresRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Lugar with ID "${id}" not found`);
    }

    return found;
  }

  createLugar(createLugarDto: CreateLugarDto, user: User): Promise<Lugar> {
    return this.lugaresRepository.createLugar(createLugarDto, user);
  }

  getLugares(filterDto: GetLugaresFilterDto, user: User): Promise<Lugar[]> {
    return this.lugaresRepository.getLugares(filterDto, user);
  }

  async deleteLugar(id: string, user: User): Promise<void> {
    const result = await this.lugaresRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Lugar with ID "${id}" not found`);
    }

    return;
  }

  async updateLugarLatLng(
    id: string,
    latitude: number,
    longitude: number,
    user: User,
  ): Promise<Lugar> {
    const lugar = await this.getLugarById(id, user);

    lugar.latitude = latitude;
    lugar.longitude = longitude;

    await this.lugaresRepository.save(lugar);
    return lugar;
  }
}
