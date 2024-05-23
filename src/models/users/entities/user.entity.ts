import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../../todos/entities/todo.entity';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Todo, (todo) => todo.user, {
    cascade: true,
  })
  todos: Todo[];

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
  })
  address: Address[];
}
