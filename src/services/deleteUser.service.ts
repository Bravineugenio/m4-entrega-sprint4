import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository
    .createQueryBuilder("user")
    .select([
      "user.name",
      "user.email",
      "user.isAdm",
      "user.isActive",
      "user.id",
      "user.createdAt",
      "user.updatedAt",
    ])
    .withDeleted()
    .getMany();

  const account = users.find((user) => user.id === id);

  const newActive = false;

  await userRepository.update(account!.id, { isActive: newActive });
  // await userRepository.softDelete(account!.id);

  return true;
};

export default deleteUserService;
