module.exports = async function(client){

const q11 = await client.query(``)
console.log('QUESTION 11: Quel est le prix du trajet entre chaque étapes (Southampton/Cherbourg, Cherbourg/Queenstown, Queenstown/New York) ?'.black.bgWhite)
console.log('pas réussie')

const q12 = await client.query(``)
console.log('QUESTION 12: Lister les passagers qui voyagaient ensemble et qui ont été séparées dans plusieurs canot de sauvetage'.black.bgWhite)
console.log('pas réussie')

const q13 = await client.query(`SELECT titanic.hometown.country, COUNT(*) AS nb_passengers FROM titanic.hometown
                                JOIN "titanic"."passenger" ON titanic.hometown.id = "titanic"."passenger"."hometownId"
                                GROUP BY country
                              `)
console.log('QUESTION 13: Lister tous les pays d’origine des passagers ainsi que le nombre de passagés'.black.bgWhite)
console.log(q13.rows)

const q14 = await client.query(`SELECT DISTINCT titanic.hometown.city FROM titanic.hometown
                                WHERE titanic.hometown.country = 'US'
                                ORDER BY titanic.hometown.city
                              `)
console.log('QUESTION 14: Lister toutes les villes américaines de destination'.black.bgWhite)
console.log(q14.rows)

const q15 = await client.query(`SELECT DISTINCT titanic.hometown.city AS Hcity, titanic.destination.city AS Dcity FROM "titanic"."ticket"
                                JOIN "titanic"."passenger" ON "titanic"."ticket"."id" = "titanic"."passenger"."ticketId" 
                                JOIN titanic.hometown ON  "titanic"."passenger"."hometownId" = titanic.hometown.id
                                JOIN titanic.destination ON "titanic"."ticket"."destinationId" = titanic.destination.id
                                WHERE titanic.hometown.city = titanic.destination.city
                              `)
console.log('QUESTION 15: Existe-t-il des villes de destinations qui sont aussi des villes d’origine ?'.black.bgWhite)
console.log(q15.rows)
}