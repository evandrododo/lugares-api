import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { GetLugaresFilterDto } from './dto/get-lugares-filter.dto';
import { UpdateLugarLatLngDto } from './dto/update-lugar.dto';
import { Lugar } from './lugar.entity';
import { LugaresService } from './lugares.service';

@Controller('lugares')
export class LugaresController {
  constructor(private lugaresService: LugaresService) {}
  @Get()
  getLugares(@Query() filterDto: GetLugaresFilterDto): Promise<Lugar[]> {
    return this.lugaresService.getLugares(filterDto);
  }

  @Get('/:id')
  getLugarById(@Param('id') id: string): Promise<Lugar> {
    return this.lugaresService.getLugarById(id);
  }

  @Post()
  createLugar(@Body() createLugarDto: CreateLugarDto): Promise<Lugar> {
    return this.lugaresService.createLugar(createLugarDto);
  }

  @Delete(':id')
  deleteLugar(@Param('id') id: string): Promise<void> {
    return this.lugaresService.deleteLugar(id);
  }

  @Patch('/:id/latlng')
  updateLugarLatLng(
    @Param('id') id: string,
    @Body() updateLugarLatLngDto: UpdateLugarLatLngDto,
  ): Promise<Lugar> {
    const { latitude, longitude } = updateLugarLatLngDto;
    return this.lugaresService.updateLugarLatLng(id, latitude, longitude);
  }
}
