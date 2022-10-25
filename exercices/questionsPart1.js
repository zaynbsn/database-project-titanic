module.exports = async function(client){

  const q1 = await client.query('SELECT COUNT(*) FROM "titanic"."passenger";')
  console.log('QUESTION 1: Donner le nombre de passagers qu’il y a dans le fichier '.black.bgWhite)
  console.log('il y a', q1.rows[0].count, 'passagers au total')
  
  const q2 = await client.query('SELECT COUNT(*) FROM "titanic"."passenger" WHERE "hasSurvived" = FALSE;')
  const q21 = await client.query('SELECT COUNT(*) FROM "titanic"."passenger" WHERE "body" IS NOT NULL;')
  console.log('QUESTION 2: Donner le nombre de décès, et combien de corps ont été retrouvés '.black.bgWhite)
  console.log('il y a', q2.rows[0].count, 'decès (attention, les données sont imcomplètes)')
  console.log('il y a', q21.rows[0].count, 'corps retrouvés')
  
  
  const q3 = await client.query(`SELECT "titanic"."ticket"."class", COUNT(*) FROM "titanic"."ticket"
                                  JOIN "titanic"."passenger" ON "titanic"."ticket"."id" = "titanic"."passenger"."ticketId"
                                  WHERE "titanic"."passenger"."hasSurvived" = TRUE
                                  GROUP BY "titanic"."ticket"."class" 
                                  ORDER BY "titanic"."ticket"."class" ASC
                                  LIMIT 1;
                              `)
  console.log('QUESTION 3: Donner la classe qui a le plus survécu  '.black.bgWhite)
  console.log("c'est la classe", q3.rows[0].class, "qui a le plus survécue, avec", q3.rows[0].count, 'vivants')
  
  const q4 = await client.query(`SELECT COUNT(*) FROM "titanic"."passenger"
                                WHERE "gender" = 'male' AND "hasSurvived" = true;`)
  console.log('QUESTION 4: Donner le nombre de personnes qui ne sont pas concernées par “les femmes et les enfants d’abord”'.black.bgWhite)
  console.log('il y a', q4.rows[0].count, 'personnes non concernées par cette phrase')
  
  const q5 = await client.query(`SELECT gender, COUNT(*) FROM "titanic"."passenger"
                                WHERE "hasSurvived" = true
                                GROUP BY gender;
                              `)
  const q51 = await client.query(`SELECT COUNT(*) FROM "titanic"."passenger"
                                WHERE "hasSurvived" = true AND age < 18;
                              `)
  console.log('QUESTION 5: Est-ce que cette phrase a bien été appliquée ?'.black.bgWhite)
  console.log('Il y a', q5.rows[0].count, 'hommes qui ont survécus')
  console.log('Il y a', q5.rows[1].count, 'femmes qui ont survécues')
  console.log('Il y a', q51.rows[0].count, 'enfants qui ont survécus')
  
}