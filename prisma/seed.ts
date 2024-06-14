import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create a user
  const user = await prisma.user.create({
    data: {
      address: '0x123',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
      description: 'A sample user for seeding purposes.'
    },
  });

  // Create a space
  const space = await prisma.space.create({
    data: {
      userId: user.id,
      name: 'Example Space',
      description: 'A description of the example space.',
      avatar: 'https://example.com/space.jpg'
    },
  });

  // Create an event type
  const eventType = await prisma.eventType.create({
    data: {
      name: 'CHECK-IN',
      description: 'An example event type for tasks.'
    },
  });

  const eventType1 = await prisma.eventType.create({
    data: {
      name: 'ONLINE-TIME',
      description: 'An example event type for tasks.'
    },
  });

  // Create a task
  const task = await prisma.task.create({
    data: {
      spaceId: space.id,
      eventTypeId: eventType.id,
      name: 'Initial Task',
      description: 'This is a task description.',
      params: 'Param details here',
      startDate: new Date(),
      endDate: new Date()
    },
  });

  // Assign points to a user for a task
  const point = await prisma.point.create({
    data: {
      userId: user.id,
      taskId: task.id,
      dataId: 1,
      eventType: eventType.name,
      points: 100
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
