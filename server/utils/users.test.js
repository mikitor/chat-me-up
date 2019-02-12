const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    const userOne = { id: 'test', name: 'testName', room: 'testRoom' };
    const userTwo = { id: 'testTwo', name: 'testNameTwo', room: 'testRoom' };
    const userThree = { id: 'testThree', name: 'testNameThree', room: 'testRoomTwo' };
    users = new Users();
    users.addUser(userOne.id, userOne.name, userOne.room);
    users.addUser(userTwo.id, userTwo.name, userTwo.room);
    users.addUser(userThree.id, userThree.name, userThree.room);
  });

  it('should add a user to the list', () => {
    const user = { id: 'new', name: 'newtestName', room: 'newtestRoom' };
    const users = new Users();
    const result = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should get the user based on id', () => {
    const { id } = users.users[0];
    const result = users.getUser(id);

    expect(result).toEqual(users.users[0]);
    expect(result.id).toBe(id);
    expect(typeof result).toBe('object');
  });

  it('should not find a user if id is wrong', () => {
    const result = users.getUser('tes');

    expect(result).toBe(undefined);
  });

  it('should delete the user based on id', () => {
    const { id } = users.users[2];
    const result = users.deleteUser(id);

    expect(users.users.length).toBe(2);
    expect(users.users).not.toEqual(result);
    expect(result.id).toBe(id);
    expect(typeof result).toBe('object');
  });

  it('should not delete the user if id is wrong', () => {
    const result = users.deleteUser('tes');

    expect(users.users.length).toBe(3);
    expect(result).toBe(undefined);
  });

  it('should get all the usernames in the room', () => {
    const result = users.getAllUsers('testRoom');

    expect(result).toEqual(['testName', 'testNameTwo']);
  });
});
