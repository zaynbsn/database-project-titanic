module.exports = async function(client){

  const q6 = await client.query(`SELECT COUNT(*) FROM "titanic"."ticket"
  JOIN "titanic"."destination" ON "titanic"."ticket"."destinationId" = "titanic"."destination"."id"
  WHERE "titanic"."destination"."city" = 'Washington' OR "titanic"."destination"."state" = 'Washington'
`)
console.log('QUESTION 6: Combien de personnes sont parties en direction de Washington DC ?'.black.bgWhite)
console.log('il y a', q6.rows[0].count, 'personnes qui sont parties en direction de washington DC')

const q7 = await client.query(`SELECT COUNT(*) FROM "titanic"."ticket"
    WHERE cabin != ''
`)
const q71 = await client.query(`SELECT "titanic"."ticket"."ticketNumber", "titanic"."ticket"."cabin" FROM "titanic"."ticket"`)
console.log('QUESTION 7: Pour chaque ticket, combien de cabines ont été attribuées ? Lister tous les tickets et leurs cabines'.black.bgWhite)
console.log('il y a', q7.rows[0].count, 'cabines attribuées')
console.log(q71.rows)

const q8 = await client.query(`SELECT AVG(age) FROM "titanic"."passenger" WHERE gender = 'female'`)
console.log('QUESTION 8:  Donner l’âge moyen des femmes du bateau'.black.bgWhite)
console.log("L'age moyen des femmes est", q8.rows[0].avg, 'ans')

const q9 = await client.query(`SELECT DISTINCT "titanic"."ticket"."ticketNumber", AVG(fare)
    FROM "titanic"."ticket"
    GROUP BY "titanic"."ticket"."ticketNumber"
  `)
console.log('QUESTION 9: Donner le prix moyen (fare) de la place'.black.bgWhite)
console.log(q9.rows)

const q10 = await client.query(`SELECT DISTINCT "titanic"."ticket"."ticketNumber", "titanic"."passenger"."lastname" FROM "titanic"."ticket"
    JOIN "titanic"."passenger" ON "titanic"."ticket"."id" = "titanic"."passenger"."ticketId"
  `)
console.log('QUESTION 10: Pour chaque ticket, donner le nom de famille associé au ticket'.black.bgWhite)
console.log(q10.rows)
  
}