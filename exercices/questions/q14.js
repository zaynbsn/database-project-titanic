module.exports = async function(client){
  const q14 = await client.query(`SELECT DISTINCT titanic.hometown.city FROM titanic.hometown
                                  WHERE titanic.hometown.country = 'US'
                                  ORDER BY titanic.hometown.city
                                `)
  console.log('QUESTION 14: Lister toutes les villes américaines de destination'.cyan)
  console.log(q14.rows)
}