import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { UserEntity } from "./user";

@Entity({ name: "mensagens" })
export class MensagemEntity extends BaseEntity {
  @PrimaryColumn()
  uid!: string;

  @Column()
  descricao!: string;

  @Column()
  detalhamento!: string;

  @Column({ name: "user_uid" })
  userUid!: string;

  @Column({ name: "created_at" })
  createdAt?: Date;

  @Column({ name: "updated_at" })
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.mensagens)
  @JoinColumn({ name: "user_uid", referencedColumnName: "uid" })
  user?: UserEntity;

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
