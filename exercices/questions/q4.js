
module.exports = async function(client){
  const q4 = await client.query(`SELECT COUNT(*) FROM "titanic"."passenger"
                                WHERE "gender" = 'male' AND "lifeboat" IS NOT NULL;
                              `)
  console.log('QUESTION 4: Donner le nombre de personnes qui ne sont pas concernées par “les femmes et les enfants d’abord”'.cyan)
  console.log('il y a', q4.rows[0].count, 'hommes non concernées par cette phrase qui sont montés a bord un bateau de suvetage')
}
