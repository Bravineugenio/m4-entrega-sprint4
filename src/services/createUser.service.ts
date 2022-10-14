import { IUserCreate, IUser } from "../interfaces/users/index";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
  createdAt,
  updatedAt,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);
  user.isAdm = isAdm;
  user.createdAt = new Date();
  user.updatedAt = new Date();

  userRepository.create(user);
  await userRepository.save(user);

  const newUser = {
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    isActive: true,
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  console.log(newUser);
  return newUser;
};

export default userCreateService;
