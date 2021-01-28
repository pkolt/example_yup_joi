import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min, Max, IsBoolean, IsEmail, IsEnum, Length } from 'class-validator';
import { UserRole } from './types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column()
  @IsBoolean()
  isActive: boolean;

  @Column()
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;
}
