
module.exports = async function(client){
  const q13 = await client.query(`SELECT titanic.hometown.country, COUNT(*) AS nb_passengers FROM titanic.hometown
                                JOIN "titanic"."passenger" ON titanic.hometown.id = "titanic"."passenger"."hometownId"
                                GROUP BY country
                              `)
  console.log('QUESTION 13: Lister tous les pays d’origine des passagers ainsi que le nombre de passagés'.cyan)
  console.log(q13.rows)
}