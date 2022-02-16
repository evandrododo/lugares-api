import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { GetLugaresFilterDto } from './dto/get-lugares-filter.dto';
import { UpdateLugarLatLngDto } from './dto/update-lugar.dto';
import { Lugar } from './lugar.entity';
import { LugaresService } from './lugares.service';
import { Logger } from '@nestjs/common';

@Controller('lugares')
@UseGuards(AuthGuard())
export class LugaresController {
  private logger = new Logger('LugaresController');

  constructor(private lugaresService: LugaresService) {}
  @Get()
  getLugares(
    @Query() filterDto: GetLugaresFilterDto,
    @GetUser() user: User,
  ): Promise<Lugar[]> {
    this.logger.verbose(
      `Usuário "${user.username}" buscando lugares. Filtros: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.lugaresService.getLugares(filterDto, user);
  }

  @Get('/:id')
  getLugarById(@Param('id') id: string, @GetUser() user: User): Promise<Lugar> {
    return this.lugaresService.getLugarById(id, user);
  }

  @Post()
  createLugar(
    @Body() createLugarDto: CreateLugarDto,
    @GetUser() user: User,
  ): Promise<Lugar> {
    this.logger.verbose(
      `Usuário "${
        user.username
      }" criando um novo lugar. Dados: ${JSON.stringify(createLugarDto)}`,
    );
    return this.lugaresService.createLugar(createLugarDto, user);
  }

  @Delete(':id')
  deleteLugar(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`Usuário "${user.username}" deletando lugar "${id}".`);
    return this.lugaresService.deleteLugar(id, user);
  }

  @Patch('/:id/latlng')
  updateLugarLatLng(
    @Param('id') id: string,
    @Body() updateLugarLatLngDto: UpdateLugarLatLngDto,
    @GetUser() user: User,
  ): Promise<Lugar> {
    const { latitude, longitude } = updateLugarLatLngDto;
    this.logger.verbose(
      `Usuário "${
        user.username
      }" atualizando lugar "${id}". Novos valores: ${JSON.stringify(
        updateLugarLatLngDto,
      )}`,
    );
    return this.lugaresService.updateLugarLatLng(id, latitude, longitude, user);
  }
}
