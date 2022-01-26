import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLugarLatLngDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
