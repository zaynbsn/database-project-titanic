module.exports = async function(client){
  const q3 = await client.query(`SELECT "titanic"."ticket"."class", COUNT(*) FROM "titanic"."ticket"
                                  JOIN "titanic"."passenger" ON "titanic"."ticket"."id" = "titanic"."passenger"."ticketId"
                                  WHERE "titanic"."passenger"."hasSurvived" = TRUE
                                  GROUP BY "titanic"."ticket"."class" 
                                  ORDER BY "titanic"."ticket"."class" ASC
                                  LIMIT 1;
                              `)
  console.log('QUESTION 3: Donner la classe qui a le plus survécu  '.cyan)
  console.log("c'est la classe", q3.rows[0].class, "qui a le plus survécue, avec", q3.rows[0].count, 'vivants')
}