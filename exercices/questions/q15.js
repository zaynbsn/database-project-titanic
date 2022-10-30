module.exports = async function(client){
  const q15 = await client.query(`SELECT DISTINCT titanic.hometown.city AS Hcity, titanic.destination.city AS Dcity FROM "titanic"."ticket"
                                  JOIN "titanic"."passenger" ON "titanic"."ticket"."id" = "titanic"."passenger"."ticketId" 
                                  JOIN titanic.hometown ON  "titanic"."passenger"."hometownId" = titanic.hometown.id
                                  JOIN titanic.destination ON "titanic"."ticket"."destinationId" = titanic.destination.id
                                  WHERE titanic.hometown.city = titanic.destination.city
                                `)
  console.log('QUESTION 15: Existe-t-il des villes de destinations qui sont aussi des villes d’origine ?'.cyan)
  console.log(q15.rows)
}