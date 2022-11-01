module.exports = async function(client){
  const q5 = await client.query(`SELECT gender, COUNT(*) FROM "titanic"."passenger"
                                WHERE "hasSurvived" = true
                                GROUP BY gender;
                              `)
  const q51 = await client.query(`SELECT COUNT(*) FROM "titanic"."passenger"
                                WHERE "hasSurvived" = true AND age < 18;
                              `)
  console.log('QUESTION 5: Est-ce que cette phrase a bien été appliquée ?'.cyan)
  console.log('Il y a', q5.rows[0].count, 'hommes qui ont survécus')
  console.log('Il y a', q5.rows[1].count, 'femmes qui ont survécues')
  console.log('Il y a', q51.rows[0].count, 'enfants qui ont survécus')
  console.log('donc oui la phrase a plus ou moins bien été appliquée')
}