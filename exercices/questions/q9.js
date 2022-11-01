module.exports = async function(client){
  const q9 = await client.query(`SELECT AVG(a.fare) FROM (SELECT DISTINCT "ticket"."ticketNumber", "ticket"."fare" FROM "titanic"."ticket" 
                                                          GROUP BY "ticket"."ticketNumber", "ticket"."fare") a
                                `)
  console.log('QUESTION 9: Donner le prix moyen (fare) de la place'.cyan)
  console.log("le prix moyen d'une place est", q9.rows[0].avg)
}