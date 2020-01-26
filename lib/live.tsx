async function getCurrentTasks(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/points/tasks"
    : /* Client */ "/api/points/tasks";
  const results = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await results.json();
}

// CAN only be called from the client
async function saveTask(newTask) {
  const urlRoute = "/api/points/tasks";
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ ...newTask, blocking: false, description: "" })
  });
  return result.status === 200;
}

async function updateTask(updatedTask) {
  const urlRoute = "/api/points/tasks";
  const result = await fetch(urlRoute, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  });
  const jsonBody = await result.json();
  return result.status === 200;
}

async function getHouses(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/person/houses"
    : /* Client */ "/api/person/houses";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await result.json();
}

async function getPersonInfo(req) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/live/personInfo"
    : /* Client */ "/api/live/personInfo";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await result.json();
}

async function getHouseInfo(req, houseId) {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + `api/live/houseInfo/:${houseId}`
    : /* Client */ `/api/live/houseInfo/:${houseId}`;

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  return await result.json();
}

// Should be of the form
// { name: name, color: #..... }
async function createHouse(houseObj) {
  const urlRoute = "/api/person/houses/";
  const result = await fetch(urlRoute, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(houseObj)
  });
  return result.status === 200;
}

async function updateHouse(houseObj) {
  const urlRoute = "/api/person/houses/";
  const result = await fetch(urlRoute, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(houseObj)
  });
  return result.status === 200;
}

export {
  getCurrentTasks,
  saveTask,
  updateTask,
  getHouses,
  getHouseInfo,
  createHouse,
  updateHouse
};
