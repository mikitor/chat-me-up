class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  deleteUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(usr => usr.id !== id);
    }
    return user;
  }

  getAllUsers(room) {
    const users = this.users
      .filter(user => user.room === room)
      .map(user => user.name);
    return users;
  }
}

module.exports = { Users };
