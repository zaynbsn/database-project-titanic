module.exports = async function(client){
  const q7 = await client.query(`SELECT COUNT(*) FROM "titanic"."ticket"
                                  WHERE cabin != ''
                                `)
  const q71 = await client.query(`SELECT DISTINCT "titanic"."ticket"."ticketNumber", "titanic"."ticket"."cabin" FROM "titanic"."ticket"
                                  WHERE  "titanic"."ticket"."cabin" != ''
                                `)
  console.log('QUESTION 7: Pour chaque ticket, combien de cabines ont été attribuées ? Lister tous les tickets et leurs cabines'.cyan)
  console.log('il y a', q7.rows[0].count, 'cabines attribuées')
  console.log(q71.rows)
}