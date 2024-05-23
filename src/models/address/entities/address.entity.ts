import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column({ nullable: true }) // This line is added
  userId: number; // This line is added
}
