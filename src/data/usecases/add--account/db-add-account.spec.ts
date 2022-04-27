import { DbAddAccount } from "./db-add-account";

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncryptStub {
      async encrypt(value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encryptStub = new EncryptStub()
    const sut = new DbAddAccount(encryptStub)
    const accountData = {
      name: 'valid_name',
      email: 'valid_name',
      password: 'valid_password'
    }

    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  });
});