import { Injectable } from '@nestjs/common';

interface AwaitingUser {
  id: string;
}

@Injectable()
export class InMemoryMatchmakingRepository {
  private users: AwaitingUser[] = [];

  addUser(userId: string) {
    this.removeUserById(userId);
    this.users.push({ id: userId });
  }

  getUsers() {
    return this.users;
  }

  getUserById(userId: string) {
    return this.users.find((u) => u.id === userId);
  }

  removeUserById(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.users = this.users.filter((u) => u.id !== userId);
    }
  }
}
