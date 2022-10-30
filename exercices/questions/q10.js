module.exports = async function(client){
  const q10 = await client.query(`SELECT DISTINCT "titanic"."ticket"."ticketNumber", "titanic"."passenger"."lastname" FROM "titanic"."ticket"
                                  JOIN "titanic"."passenger" ON "titanic"."ticket"."id" = "titanic"."passenger"."ticketId"
                                `)
  console.log('QUESTION 10: Pour chaque ticket, donner le nom de famille associé au ticket'.cyan)
  console.log(q10.rows)
}