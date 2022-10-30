
module.exports = async function(client){
  const q1 = await client.query('SELECT COUNT(*) FROM "titanic"."passenger";')
  console.log('QUESTION 1: Donner le nombre de passagers qu’il y a dans le fichier '.cyan)
  console.log('il y a', q1.rows[0].count, 'passagers au total')
}