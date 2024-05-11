import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Arush",
      "email": "arush@gmail.com",
      "role": "ADMIN"
    },
    {
      "id": 2,
      "name": "Milan",
      "email": "milan@gmail.com",
      "role": "INTERN"
    },
    {
      "id": 3,
      "name": "Gopal",
      "email": "gopal@gmail.com",
      "role": "INTERN"
    },
    {
      "id": 4,
      "name": "Aman",
      "email": "aman@gmail.com",
      "role": "ENGINEER"
    },
    {
      "id": 5,
      "name": "Ram",
      "email": "ram@gmail.com",
      "role": "ENGINEER"
    }
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
    if(role){
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number){
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
    const newUser = {
      id: usersByHighestId[0].id + 1, ...user 
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updatedUser: {name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    this.users = this.users.map((user) => {
      if(user.id === id){
        return { ...user, ...updatedUser }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number){
    const findUser = this.findOne(id);
    if(findUser){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return findUser;
  }
}