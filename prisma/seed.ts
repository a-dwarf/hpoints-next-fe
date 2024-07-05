import { PrismaClient, QuestStatus, BannerStatus, OpCheckStatus } from '@prisma/client';

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
      address: '0xe56d1Dcf934A1d2Ff1Fc27fF3B12ea57C8687Fcf',
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
      userId: user2.id,
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


  const tasks = [
    {
      id: 1,
      questId: quest1.id,
      eventType: "TX-COUNT",
      name: 'Complete Profile',
      description: 'Complete your user profile',
      params: { "network": 1, "address": "0x35A18000230DA775CAc24873d00Ff85BccdeD550", "start_time": 1717313365, "end_time": 1719905365 },
    },
    {
      id: 2,
      questId: quest1.id,
      eventType: "TX-DAILY",
      name: 'Updated Task 1',
      description: 'Updated task 1 description',
      params: { "network": 1, "address": "0x35A18000230DA775CAc24873d00Ff85BccdeD550", "start_time": 1717313365, "end_time": 1719905365 },
    },
    {
      id: 3,
      questId: quest1.id,
      eventType: "FOLLOW",
      name: 'Updated Task 1',
      description: 'Updated task 1 description',
      params: {},
    },
    {
      id: 4,
      questId: quest2.id,
      eventType: "ONLINE-TIME",
      name: 'Updated Task 1',
      description: 'Updated task 1 description',
      params: {},
    }
  ];


  for (const task of tasks) {
    await prisma.task.create({
      data: {
        questId: task.questId,
        eventType: task.eventType || "",
        name: task.name,
        description: task.description,
        params: task.params,
      },
    });
  }

  const operationRecords = [
    {
      userId: user1.id,
      eventType: 'FOLLOW',
      taskId: 1,
      questId: quest1.id,
      params: { start_time: '', end_time: '' },
      point: 10,
      status: OpCheckStatus.INIT,
    },
    {
      userId: user2.id,
      eventType: 'ONLINE-TIME',
      taskId: 2,
      questId: quest1.id,
      params: { duration: '', start_time: '', end_time: '' },
      point: 20,
      status: OpCheckStatus.INIT,
    }
  ];

  for (const record of operationRecords) {
    await prisma.operationRecord.create({
      data: record,
    });
  }

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
