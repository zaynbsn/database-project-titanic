module.exports = async function(client){
  const q6 = await client.query(`SELECT COUNT(*) FROM "titanic"."ticket"
                                  JOIN "titanic"."destination" ON "titanic"."ticket"."destinationId" = "titanic"."destination"."id"
                                  WHERE "titanic"."destination"."city" = 'Washington' OR "titanic"."destination"."state" = 'Washington'
                                `)
  console.log('QUESTION 6: Combien de personnes sont parties en direction de Washington DC ?'.cyan)
  console.log('il y a', q6.rows[0].count, 'personnes qui sont parties en direction de washington DC')
}
