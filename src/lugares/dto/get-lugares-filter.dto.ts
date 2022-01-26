import { IsOptional, IsString } from 'class-validator';

export class GetLugaresFilterDto {
  @IsOptional()
  @IsString()
  busca?: string;

  @IsOptional()
  categoria?: string;
}
