module.exports = async function(client){
  const q8 = await client.query(`SELECT AVG(age) FROM "titanic"."passenger" WHERE gender = 'female'`)
  console.log('QUESTION 8:  Donner l’âge moyen des femmes du bateau'.cyan)
  console.log("L'age moyen des femmes est", q8.rows[0].avg, 'ans')
}