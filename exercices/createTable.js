module.exports = async function(client){

  const createAllTable = createTables()
  for (const table of createAllTable){
      await client.query(table)
  }
}
function createTables() {
  return [
      `
      CREATE TABLE IF NOT EXISTS "titanic"."passenger" (
          "id" SERIAL,
          "lastname" VARCHAR(255) NOT NULL,
          "firstname" VARCHAR(255) NOT NULL,
          "gender" VARCHAR(64),
          "age" INT,
          "hasSurvived" BOOLEAN,
          "ticketId" INT NOT NULL,
          "hometownId" INT NOT NULL,
          "lifeboat" VARCHAR(64),
          "body" VARCHAR(64),
          PRIMARY KEY ("id")
      );`,

      `
      CREATE TABLE IF NOT EXISTS "titanic"."ticket" (
          "id" SERIAL,
          "ticketNumber" VARCHAR(255) NOT NULL,
          "fare" FLOAT,
          "class" INT NOT NULL,
          "cabin" VARCHAR(64),
          "boardingId" INT NOT NULL,
          "destinationId" INT NOT NULL,
          PRIMARY KEY ("id")
      );`,

      `
      CREATE TABLE IF NOT EXISTS "titanic"."boarding" (
          "id" SERIAL,
          "name" VARCHAR(255) NOT NULL,
          PRIMARY KEY ("id")
      );`,

      `
      CREATE TABLE IF NOT EXISTS "titanic"."hometown" (
          "id" SERIAL,
          "city" VARCHAR(255) NOT NULL,
          "state" VARCHAR(255),
          "country" VARCHAR(255) NOT NULL,
          PRIMARY KEY ("id")
      );`,

      `
      CREATE TABLE IF NOT EXISTS "titanic"."destination" (
          "id" SERIAL,
          "city" VARCHAR(255),
          "state" VARCHAR(255),
          "country" VARCHAR(255) NOT NULL,
          PRIMARY KEY ("id")
      );`
  ]
}