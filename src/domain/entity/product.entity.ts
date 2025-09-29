import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { BrandEntity } from './brand.entity';
import { UnitMeasureEntity } from './unit_measure.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'sku', type: 'varchar', length: 100, unique: true, nullable: true })
  sku: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text'})
  description: string;

  @Column({ name: 'bar_code', type: 'varchar', length: 100, unique: true })
  bar_code: string;

  @Column({ name: 'igv_apply', type: 'boolean', default: false })
  igv_apply: boolean;

  @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
  base_price: number;

  @Column({ name: 'selling_price', type: 'decimal', precision: 10, scale: 2 })
  selling_price: number;

  @Column({ name: 'stock', type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'min_stock', type: 'int', default: 0 })
  min_stock: number;

  @Column({ name: 'quantity', type: 'int', default: 0 })
  quantity: number;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ name: 'state', type: 'boolean', default: true })
  state: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    eager: true,
  })
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @ManyToOne(() => UnitMeasureEntity, (unitMeasure) => unitMeasure.products, {
    eager: true,
  })
  @JoinColumn({ name: 'unit_measure_id' })
  unit_measure: UnitMeasureEntity;
}
