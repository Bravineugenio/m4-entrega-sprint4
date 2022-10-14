import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

const updateUserService = async (id: string, updatedData: any) => {
  if (updatedData.isAdm === false || updatedData.isAdm === true || updatedData.id=== false || updatedData.id=== true || updatedData.isActive === true || updatedData.isActive === false) {
    throw new Error("Update is available only for name, email and password");
  }

  const userRepository = AppDataSource.getRepository(User);

  // const users = await userRepository.find();

  // const account = users.find((user) => user.id === id);

const account = await userRepository.findOneBy({id})



  if (updatedData.password) {
    if (bcrypt.compareSync(updatedData.password, account!.password)) {
      throw new Error("Inform a different password.");
    }
  }

  const newName = updatedData.name ? updatedData.name : account?.name;
  const newEmail = updatedData.email ? updatedData.email : account?.email;
  const newPassword = updatedData.password
    ? bcrypt.hashSync(updatedData.password, 10)
    : account?.password;
  const updatedNow = new Date();

  await userRepository.update(account!.id, {
    name: newName,
    email: newEmail,
    password: newPassword,
    updatedAt: updatedNow,
  });

  return true;
};

export default updateUserService;
