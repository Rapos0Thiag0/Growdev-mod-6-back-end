import { MensagemEntity } from "../../../../core/infra/data/database/entities/mensagem";
import { UserEntity } from "../../../../core/infra/data/database/entities/user";
import { User } from "../../../../core/domain/models/user";
import { Mensagem } from "../../../../core/domain/models/mensagem";

interface MensagemParams {
  uid?: string;
  descricao: string;
  detalhamento: string;
  userUid: string;
}

export class MensagemRepository {
  async create(data: MensagemParams): Promise<Mensagem | undefined> {
    const mensagemEntity = MensagemEntity.create({
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      userUid: data.userUid,
    });

    await mensagemEntity.save();

    return this.mapperFromEntityToModel(mensagemEntity);
  }

  async getByUid(uid: string): Promise<Mensagem | undefined> {
    const mensagemEntity = await MensagemEntity.findOne(uid, {
      select: ["descricao", "detalhamento", "uid"],
    });

    if (!mensagemEntity) return undefined;

    return this.mapperFromEntityToModel(mensagemEntity);
  }

  async getLoggedUser(userUid: string): Promise<User | undefined> {
    const loginUserVerification = await UserEntity.findOne(userUid);

    if (!loginUserVerification) return undefined;

    return {
      uid: loginUserVerification.uid,
      nome: loginUserVerification.nome,
      senha: loginUserVerification.senha,
    };
  }

  async getAllMessages(userUid: string): Promise<Mensagem[]> {
    const mensagensEntities = await MensagemEntity.find({
      where: { userUid },
    });

    return mensagensEntities.map((mensagensEntity) =>
      this.mapperFromEntityToModel(mensagensEntity)
    );
  }

  async editMessage(data: MensagemParams): Promise<Mensagem | undefined> {
    const mensagemEntity = await MensagemEntity.findOne(data.uid, {
      where: { userUid: data.userUid },
    });
    if (!mensagemEntity) return undefined;

    const mensagemUpdated = MensagemEntity.create({
      uid: data.uid,
      descricao: data.descricao,
      detalhamento: data.detalhamento,
    });

    await mensagemUpdated.save();
    return this.mapperFromEntityToModel(mensagemUpdated);
  }

  async destroy(uid: string, userUid: string): Promise<Mensagem | undefined> {
    const mensagemEntity = await MensagemEntity.findOne(uid, {
      where: { userUid },
    });
    if (!mensagemEntity) return undefined;

    await mensagemEntity.remove();

    return this.mapperFromEntityToModel(mensagemEntity);
  }

  private mapperFromEntityToModel(entity: MensagemEntity): Mensagem {
    return {
      uid: entity.uid,
      descricao: entity.descricao,
      detalhamento: entity.detalhamento,
      userUid: entity.userUid,
    };
  }
}
