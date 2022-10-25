module.exports = async function(client){

  // ONLY IF RELATIONS DOES NOT ALREADY EXISTS
  const createAllRelation = createRelations()
  for (const fkQuery of createAllRelation){
      await client.query(fkQuery)
  }
}
function createRelations() {
  return [
      `
          ALTER TABLE "titanic"."passenger" 
          ADD CONSTRAINT "fk_passenger_ticket" FOREIGN KEY ("ticketId") REFERENCES "titanic"."ticket" ("id");
      `,
      `
          ALTER TABLE "titanic"."passenger" 
          ADD CONSTRAINT "fk_passenger_hometown" FOREIGN KEY ("hometownId") REFERENCES "titanic"."hometown" ("id");
      `,
      `
          ALTER TABLE "titanic"."ticket" 
          ADD CONSTRAINT "fk_ticket_destination" FOREIGN KEY ("destinationId") REFERENCES "titanic"."destination" ("id");
      `,
      `
          ALTER TABLE "titanic"."ticket" 
          ADD CONSTRAINT "fk_ticket_boarding" FOREIGN KEY ("boardingId") REFERENCES "titanic"."boarding" ("id");
      `,
  ]
}