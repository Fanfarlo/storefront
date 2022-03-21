import client from '../../database';
import { UserStore} from '../../models/user';

const store = new UserStore();

describe('User Model Methods', () => {
  it('should have an index method', async () => {
    expect(store.index).toBeDefined();
    console.log(store.index)
  });

  it('should create an user', async () => {
    const result = await store.create({
        firstName:'toti',
        lastName:'last',
        password:'pass1'
    });
    console.log(result)
    expect(result.id).toMatch('1');
  });

  it('should return a users list', async () => {
    const result = await store.index();
    console.log(result)
    expect(result.length).toEqual(1);
  });

  it('should show an user', async () => {
    const result = await store.show('1');
    // console.log(result)
    expect(result.id).toMatch('1');
   
  });

  it('should auth an user', async () => {
    const result = await store.authenticate('toti', 'pass1');
    // console.log(result)
    expect(result).toBeTruthy;
  });

});
