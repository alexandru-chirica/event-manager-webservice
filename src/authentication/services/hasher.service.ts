import { Injectable } from '@nestjs/common';
import { genSalt, hash as bHash } from 'bcryptjs';

import { HashingOptionsModel } from '../models/hashing-options.model';

const hashPartsSize = 3;

@Injectable()
export class HasherService {
  // --- Public methods ---

  async check(
    hashedPassword: string,
    password: string,
    options: HashingOptionsModel,
  ) {
    const parts = hashedPassword.split('.', hashPartsSize);

    if (parts.length !== hashPartsSize) {
      throw new Error(
        'Unexpected hash format. Should be formatted as `{iterations}.{salt}.{hash}`',
      );
    }

    const [iterations, salt, key] = parts;
    const hashedPasswordToCheck = await this.hashInternal(
      password,
      salt,
      options,
    );

    return {
      // Return a warning if we're using a lower number of iterations than is the default in HashingOptionsModel.
      needsUpgrade: options.iterations > parseInt(iterations, 10),
      verified: key === hashedPasswordToCheck,
    };
  }

  async hash(password: string, options: HashingOptionsModel) {
    const salt = await genSalt();
    const hashedPassword = await this.hashInternal(password, salt, {
      ...options,
      // Get a random number of iterations so we make the password even harder to compare to rainbow tables.
      iterations: this.getRandomIterationsBasedOnMinimum(options),
    });

    return `${options.iterations}.${salt}.${hashedPassword}`;
  }

  // --- Private methods ---

  private getRandomIterationsBasedOnMinimum(options: HashingOptionsModel) {
    const { iterations, maxIterationsIncrease } = options;
    const min = iterations;
    const max = iterations + maxIterationsIncrease;

    // Returns a number integer between x and y ; both x and y are included.
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private async hashInternal(
    password: string,
    salt: string,
    options: HashingOptionsModel,
  ) {
    let hashedPassword = password;

    for (let x = 0; x < options.iterations; x++) {
      hashedPassword = await bHash(password, salt);
    }

    return hashedPassword;
  }
}
