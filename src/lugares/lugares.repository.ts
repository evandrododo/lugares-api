import { Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { GetLugaresFilterDto } from './dto/get-lugares-filter.dto';
import { Lugar } from './lugar.entity';

@EntityRepository(Lugar)
export class LugaresRepository extends Repository<Lugar> {
  private logger = new Logger('LugaresRepository', { timestamp: true });
  async getLugares(
    filterDto: GetLugaresFilterDto,
    user: User,
  ): Promise<Lugar[]> {
    const { categoria, busca } = filterDto;
    const query = this.createQueryBuilder('lugar');
    query.where({ user });

    if (categoria) {
      query.andWhere('lugar.categoria = :categoria', { categoria });
    }

    if (busca) {
      query.andWhere(
        `( 
          LOWER(lugar.nome) LIKE LOWER(:busca) 
          OR 
          LOWER(lugar.descricao) LIKE LOWER(:busca) 
        )`,
        {
          busca: `%${busca}%`,
        },
      );
    }
    try {
      const lugares = await query.getMany();
      return lugares;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar lugares por usuário "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new Error('An error occurred while list lugares.');
    }
  }

  async createLugar(
    createLugarDto: CreateLugarDto,
    user: User,
  ): Promise<Lugar> {
    const { nome, descricao, categoria, latitude, longitude } = createLugarDto;

    const lugar = this.create({
      nome,
      descricao,
      user,
      categoria,
      latitude,
      longitude,
    });

    await this.save(lugar);
    return lugar;
  }

  async deleteLugar(id: string): Promise<void> {
    await this.delete(id);
  }
}
