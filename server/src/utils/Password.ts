import bcrypt from 'bcrypt';

// Hardcoding so the passwords in dev are hashed the same way
const DEV_SALT = '$2a$10$rd6b1srleRbHkSeqxTf3Ke';

class Password {
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor() {}

  static encrypt(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (saltErr, salt) => {
        if (saltErr) {
          return reject(saltErr);
        }

        return bcrypt.hash(
          password,
          process.env.NODE_ENV === 'production' ? salt : DEV_SALT,
          (hashErr, hash) => {
            if (hashErr) return reject(hashErr);

            return resolve(hash);
          }
        );
      });
    });
  }

  static compare(plainPass: string, hashWord: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPass, hashWord, (err, isPasswordMatch) => {
        if (err) return reject(err);

        return resolve(isPasswordMatch);
      });
    });
  }
}

export default Password;
