import { PrismaClient, QuestStatus, BannerStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create User
  const user = await prisma.user.create({
    data: {
      address: '0x1234567890abcdef',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
      description: 'A test user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.user.create({
    data: {
      address: '0x1234567890abcdew',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
      description: 'A test user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Ensure userAddress is not undefined
  const userAddress = user.address ?? '';

  // Create Event Type
  const eventType = await prisma.eventType.create({
    data: {
      name: 'Task Completion',
      description: 'Points awarded for completing a task',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create Quest
  const quest = await prisma.quest.create({
    data: {
      userId: user.id,
      name: 'First Quest 1',
      avatar: 'https://example.com/quest-avatar.png',
      status: QuestStatus.Ongoing,
      rewards: '100 XP',
      description: 'Complete the tasks to earn rewards',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.quest.create({
    data: {
      userId: user.id,
      name: 'First Quest 2',
      avatar: 'https://example.com/quest-avatar.png',
      status: QuestStatus.Draft,
      rewards: '10 XP',
      description: 'Complete the tasks to earn rewards',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create Task
  const task = await prisma.task.create({
    data: {
      questId: quest.id,
      eventTypeId: eventType.id,
      name: 'Complete Profile',
      description: 'Complete your user profile',
      params: '{}',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.task.create({
    data: {
      questId: quest.id,
      eventTypeId: eventType.id,
      name: 'Complete Profile',
      description: 'Complete your user profile',
      params: '{}',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create Point
  await prisma.point.create({
    data: {
      dataId: 1,
      userAddress: userAddress,
      taskId: task.id,
      eventType: eventType.name,
      points: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.point.create({
    data: {
      dataId: 2,
      userAddress: userAddress,
      taskId: task.id,
      eventType: eventType.name,
      points: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });


  // Create Banner
  await prisma.banner.create({
    data: {
      title: 'Welcome Banner',
      imageUrl: 'https://example.com/banner.png',
      redirectUrl: 'https://example.com',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      position: 1,
      status: BannerStatus.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
