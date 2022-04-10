import { injectable } from "inversify";
import bcrypt from 'bcrypt';
import { IHashProvider } from "./IHashProvider";

@injectable()
export class HashProvider implements IHashProvider {

  public async hash(value: string) {
    return await bcrypt.hash(value, 8)
  }

  public async compare(value1: string, value2: string) {
    return await bcrypt.compare(value1, value2);
  }
}

