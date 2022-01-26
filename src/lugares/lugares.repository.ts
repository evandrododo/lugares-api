import { EntityRepository, Repository } from 'typeorm';
import { CreateLugarDto } from './dto/create-lugar.dto';
import { GetLugaresFilterDto } from './dto/get-lugares-filter.dto';
import { Lugar } from './lugar.entity';

@EntityRepository(Lugar)
export class LugaresRepository extends Repository<Lugar> {
  async getLugares(filterDto: GetLugaresFilterDto): Promise<Lugar[]> {
    const { categoria, busca } = filterDto;
    const query = this.createQueryBuilder('lugar');

    if (categoria) {
      query.andWhere('lugar.categoria = :categoria', { categoria });
    }

    if (busca) {
      query.andWhere('LOWER(lugar.nome) LIKE LOWER(:busca)', {
        busca: `%${busca}%`,
      });
      query.orWhere('LOWER(lugar.descricao) LIKE LOWER(:busca)', {
        busca: `%${busca}%`,
      });
    }
    const lugares = await query.getMany();
    return lugares;
  }

  async createLugar(createLugarDto: CreateLugarDto): Promise<Lugar> {
    const { nome, descricao, categoria, latitude, longitude } = createLugarDto;

    const lugar = this.create({
      nome,
      descricao,
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
