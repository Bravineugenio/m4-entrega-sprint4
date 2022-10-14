import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const getAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User)
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
  // const userRepository = AppDataSource.getRepository(User)
  // const users = userRepository.find()

  return userRepository;
};

export default getAllUsersService;
