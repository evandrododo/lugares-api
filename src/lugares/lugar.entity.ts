import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lugar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao?: string;

  @Column()
  categoria?: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;
}
