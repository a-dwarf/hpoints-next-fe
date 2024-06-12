import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.point.deleteMany();
  await prisma.task.deleteMany();
  await prisma.space.deleteMany();
  await prisma.eventType.deleteMany();
  await prisma.user.deleteMany();

  // Insert users data
  const user1 = await prisma.user.create({
    data: {
      address: '0x1234abcd',
      name: 'User 1',
      avatar: 'https://avatar1.url',
      description: 'Description for user 1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      address: '0x5678efgh',
      name: 'User 2',
      avatar: 'https://avatar2.url',
      description: 'Description for user 2',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      address: '0x1a2b3c4d',
      name: 'User 3',
      avatar: 'https://user1.avatar.url',
      description: 'Description for user 3',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      address: '0x5e6f7g8h',
      name: 'User 4',
      avatar: 'https://user2.avatar.url',
      description: 'Description for user 4',
    },
  });

  // Insert event types data
  const eventType1 = await prisma.eventType.create({
    data: {
      name: 'EventType1',
      description: 'Description for event type 1',
    },
  });

  const eventType2 = await prisma.eventType.create({
    data: {
      name: 'EventType2',
      description: 'Description for event type 2',
    },
  });

  // Insert spaces data
  const space1 = await prisma.space.create({
    data: {
      userId: user1.id,
      name: 'Space 1',
      avatar: 'https://space1.avatar.url',
      description: 'Description for space 1',
    },
  });

  const space2 = await prisma.space.create({
    data: {
      userId: user1.id,
      name: 'Space 2',
      avatar: 'https://space2.avatar.url',
      description: 'Description for space 2',
    },
  });

  const space3 = await prisma.space.create({
    data: {
      userId: user2.id,
      name: 'Space 3',
      avatar: 'https://space3.avatar.url',
      description: 'Description for space 3',
    },
  });

  // Insert tasks data
  const task1 = await prisma.task.create({
    data: {
      spaceId: space1.id,
      eventTypeId: eventType1.id,
      name: 'Task 1',
      description: 'Description for task 1',
      status: '未开始',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-07'),
    },
  });

  const task2 = await prisma.task.create({
    data: {
      spaceId: space1.id,
      eventTypeId: eventType2.id,
      name: 'Task 2',
      description: 'Description for task 2',
      status: '进行中',
      startDate: new Date('2024-06-02'),
      endDate: new Date('2024-06-08'),
    },
  });

  const task3 = await prisma.task.create({
    data: {
      spaceId: space2.id,
      eventTypeId: eventType1.id,
      name: 'Task 3',
      description: 'Description for task 3',
      status: '已完成',
      startDate: new Date('2024-06-03'),
      endDate: new Date('2024-06-09'),
    },
  });

  // Insert points data
  await prisma.point.create({
    data: {
      userId: user1.id,
      taskId: task1.id,
      points: 10,
    },
  });

  await prisma.point.create({
    data: {
      userId: user1.id,
      taskId: task2.id,
      points: 20,
    },
  });

  await prisma.point.create({
    data: {
      userId: user2.id,
      taskId: task3.id,
      points: 30,
    },
  });

  console.log('Data seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
