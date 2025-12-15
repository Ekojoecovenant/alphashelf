import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Author } from '../../authors/entities/author.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  publicationYear?: string;

  @Column({ nullable: true })
  isbn?: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
