import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  done: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column({ nullable: true }) // This line is added
  userId: number; // This line is added
}
