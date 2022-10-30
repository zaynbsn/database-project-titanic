module.exports = async function(client){
  const q2 = await client.query('SELECT COUNT(*) FROM "titanic"."passenger" WHERE "hasSurvived" = FALSE;')
  const q21 = await client.query('SELECT COUNT(*) FROM "titanic"."passenger" WHERE "body" IS NOT NULL;')
  console.log('QUESTION 2: Donner le nombre de décès, et combien de corps ont été retrouvés '.cyan)
  console.log('il y a', q2.rows[0].count, 'decès (attention, les données sont imcomplètes)')
  console.log('il y a', q21.rows[0].count, 'corps retrouvés')
}