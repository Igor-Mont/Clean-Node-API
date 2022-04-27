import { Encrypter } from "./db-add-account-procols";
import { DbAddAccount } from "./db-add-account";

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_name',
      password: 'valid_password'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  });

  test('Should throw if Encrypter throw', async () => {
    const { encrypterStub, sut } = makeSut()

    const accountData = {
      name: 'valid_name',
      email: 'valid_name',
      password: 'valid_password'
    }

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(accountData)
    expect(promise).rejects.toThrow()
  });
});