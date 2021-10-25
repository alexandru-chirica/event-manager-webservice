import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash as bHash } from 'bcryptjs';

@Injectable()
export class HasherService {
  // --- Public methods ---

  async check(hashedPassword: string, password: string) {
    return compare(password, hashedPassword);
  }

  async hash(password: string) {
    const salt = await genSalt();

    return bHash(password, salt);
  }
}
