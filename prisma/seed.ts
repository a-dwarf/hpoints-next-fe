import { PrismaClient, QuestStatus, BannerStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const eventTypes = [
    {
      name: "CHECK-IN",
      description: "check in event",
    },
    {
      name: "ONLINE-TIME",
      description: "online time event",
    },
    {
      name: "FOLLOW",
      description: "follow event",
    },
    {
      name: "RETWEET",
      description: "retweet event",
    },
    {
      name: "LIKE",
      description: "like event",
    },
    {
      name: "TX-COUNT",
      description: "transaction account event",
    },
    {
      name: "TX-DAILY",
      description: "daily transaction event",
    },
    {
      name: "VIEW_URL",
      description: "view URL event",
    }
  ];

  // Create Event Types
  for (const eventType of eventTypes) {
    await prisma.eventType.upsert({
      where: { name: eventType.name },
      update: {},
      create: {
        name: eventType.name,
        description: eventType.description,
      },
    });
  }

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      address: '0x1234567890abcdef211',
      name: 'John Doew',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
      description: 'A test user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      address: '0x1234567890abcdew1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.png',
      description: 'A test user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create Quests
  const quest1 = await prisma.quest.create({
    data: {
      userId: user1.id,
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

  const quest2 = await prisma.quest.create({
    data: {
      userId: user1.id,
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

  // Create Tasks
  const task1 = await prisma.task.create({
    data: {
      questId: quest1.id,
      eventType: "CHECK-IN",
      name: 'Complete Profile',
      description: 'Complete your user profile',
      params: '{}',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const task2 = await prisma.task.create({
    data: {
      questId: quest1.id,
      eventType: "ONLINE-TIME",
      name: 'Complete Profile',
      description: 'Complete your user profile',
      params: '{}',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create Points with unique dataId
  await prisma.point.create({
    data: {
      dataId: 1,
      userAddress: user1.address as string,
      taskId: task1.id,
      eventType: task1.eventType,
      points: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.point.create({
    data: {
      dataId: 2,
      userAddress: user1.address as string,
      taskId: task1.id,
      eventType: eventTypes[1].name,
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
