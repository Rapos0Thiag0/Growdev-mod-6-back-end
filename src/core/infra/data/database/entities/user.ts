import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { MensagemEntity } from "./mensagem";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column()
  nome!: string;

  @Column()
  senha!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;

  @OneToMany(() => MensagemEntity, (mensagem) => mensagem.user)
  mensagens?: MensagemEntity[];

  @BeforeInsert()
  private BeforeInsert() {
    console.log("before insert");
    this.uid = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    console.log("before update");
    this.updatedAt = new Date();
  }
}
