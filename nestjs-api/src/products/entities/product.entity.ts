import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image_url: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}

//microservice
// faz a goapi duplicada para nao ficar dependente da api externa, voce duplica ela

// ordem de compra
