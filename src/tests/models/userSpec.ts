import { UserStore, User } from '../../models/user';
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const store = new UserStore();

describe('User methods', () => {
  it('should have an index method', async () => {
    expect(store.index).toBeDefined();
  });

  it('should create an user', async () => {
    const result = await store.create;
    // console.log(result)
    expect(result).toBeTruthy;
  });

  it('should return a users list', async () => {
    const result = await store.index();
    // console.log(result)
    expect(result).toEqual([]);
  });

  it('should show an user', async () => {
    const result = await store.show('1');
    // console.log(result)
    expect(result).toBeTruthy;
  });

  it('should auth an user', async () => {
    const result = await store.authenticate('testuser', 'hola');
    // console.log(result)
    expect(result).toBeTruthy;
  });

  it('should delete an user', async () => {
    const result = await store.delete('1');
    // console.log(result)
    expect(result).toBeTruthy;
  });
});
