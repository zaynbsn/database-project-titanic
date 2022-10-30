module.exports = async function(client){
  const q9 = await client.query(`SELECT DISTINCT "titanic"."ticket"."ticketNumber", AVG(fare)
                                  FROM "titanic"."ticket"
                                  GROUP BY "titanic"."ticket"."ticketNumber"
                                `)
  console.log('QUESTION 9: Donner le prix moyen (fare) de la place'.cyan)
  console.log(q9.rows)
}