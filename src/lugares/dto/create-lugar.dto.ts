import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLugarDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  nome: string;

  descricao: string;

  categoria: string;
}
