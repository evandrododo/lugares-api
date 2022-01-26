import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getLugarById(id: string): Promise<Lugar> {
    const found = await this.lugaresRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Lugar with ID "${id}" not found`);
    }

    return found;
  }

  createLugar(createLugarDto: CreateLugarDto): Promise<Lugar> {
    return this.lugaresRepository.createLugar(createLugarDto);
  }

  getLugares(filterDto: GetLugaresFilterDto): Promise<Lugar[]> {
    return this.lugaresRepository.getLugares(filterDto);
  }

  async deleteLugar(id: string): Promise<void> {
    const result = await this.lugaresRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Lugar with ID "${id}" not found`);
    }

    return;
  }

  async updateLugarLatLng(
    id: string,
    latitude: number,
    longitude: number,
  ): Promise<Lugar> {
    const lugar = await this.getLugarById(id);

    lugar.latitude = latitude;
    lugar.longitude = longitude;

    await this.lugaresRepository.save(lugar);
    return lugar;
  }
}
