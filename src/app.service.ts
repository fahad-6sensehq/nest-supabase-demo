import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    });
    return users;
  }

  async createUser() {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    });
  }
}
