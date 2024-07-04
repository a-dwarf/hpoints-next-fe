'use client';

import React from 'react';

const handleSubmit = async (e: React.FormEvent, url: any) => {
  e.preventDefault();
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

const handlePost = async (e: React.FormEvent, url: any, params: any) => {
  e.preventDefault();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  console.log(data);
}

const handlePut = async (e: React.FormEvent, url: any, params: any) => {
  e.preventDefault();
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  console.log(data);
}

export default function Page() {
  return (
    <div className="px-20">

      <h1>GET</h1><br />
      <button onClick={(e) => handleSubmit(e, "/api/quests")}>Test API: /api/quests</button><br />
      <button onClick={(e) => handleSubmit(e, '/api/quests/1')}>Test API: /api/quests/1</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/quests/participate")}>Test API: /api/quests/participate</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/event-types")}>Test API: /api/event-types</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/tasks?offset=0&limit=10")}>Test API: /api/tasks?offset=0&limit=10</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/tasks?offset=0&limit=10&event_types=TX-COUNT,TX-DAILY")}>Test API: /api/tasks?offset=0&limit=10&event_types=TX-COUNT,TX-DAILY</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/op-records?quest_id=1")}>Test API: /api/op-records?quest_id=1</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/reputations")}>Test API: /api/reputations</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/tasks/1/check")}>Test API: /api/tasks/1/check</button><br />
      <button onClick={(e) => handleSubmit(e, "/api/user")}>Test API: /api/user</button>

      <br /><br /><br />
      <h1>POST</h1><br />
      <button onClick={(e) => handlePost(e, "/api/quests", {
        "name": "New Quest",
        "avatar": "http://example.com/avatar.png",
        "rewards": "Reward description",
        "description": "Quest description",
        "startDate": "2024-06-30T00:00:00.000Z",
        "endDate": "2024-07-30T00:00:00.000Z",
        "tasks": [
          {
            "name": "Task 1",
            "description": "Task 1 description",
            "eventType": "CHECK-IN",
            "params": {}
          },
          {
            "name": "Task 2",
            "description": "Task 2 description",
            "eventType": "FOLLOW",
            "params": {
              "user_x_id": "123",
              "target_x_name": "ddd"
            }
          }
        ]
      })}>Test API: /api/quests</button><br />
      <button onClick={(e) => handlePost(e, "/api/quests/1/publish", {})}>Test API: /api/quests/1/publish</button><br />

      <button onClick={(e) => handlePost(e, "/api/op-records", {
        "eventType": "FOLLOW",
        "taskId": 3,
        "questId": 1,
        "params": {
          "user_x_id": "user123",
          "target_x_username": "targetUser"
        }
      })}>Test API: /api/op-records</button><br />

      <br /><br /><br />
      <h1>PUT</h1><br />

      <button onClick={(e) => handlePut(e, "/api/quests/4", {
        "name": "New Quest22222",
        "avatar": "http://example.com/avatar.png",
        "rewards": "Reward description",
        "description": "Quest description",
        "startDate": "2024-06-30T00:00:00.000Z",
        "endDate": "2024-07-30T00:00:00.000Z",
        "tasks": [
          {
            "name": "Task 11",
            "description": "Task 1 description",
            "eventType": "CHECK-IN",
            "params": {}
          },
          {
            "name": "Task 22",
            "description": "Task 2 description",
            "eventType": "FOLLOW",
            "params": {
              "user_x_id": "123",
              "target_x_name": "ddd"
            }
          }
        ]
      })}>Test API: /api/quests/4</button><br />

    </div >

  );
}
