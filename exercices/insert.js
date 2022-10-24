const csv = require('csvtojson')

module.exports = async function(client){

    const result = await client.query('SELECT NOW() as field1')
    console.log(result.rows[0].field1)

    const createAllTable = createTables()
    for (const table of createAllTable){
        await client.query(table)
    }
    
    // ONLY IF RELATIONS DOES NOT ALREADY EXISTS
    // const createAllRelation = createRelations()
    // for (const fkQuery of createAllRelation){
    //     await client.query(fkQuery)
    // }

    const jsonArray = await csv().fromFile("exercices/titanic-full.csv")
        
    const boolFields = ['Survived']
    const floatFields = ['PassengerId', 'Pclass', 'Age', 'Fare']
    const strFields = ['Name', 'Sex', 'Ticket', 'Cabin', 'Hometown', 'Boarded', 'Destination', 'Lifeboat', 'Body']
    const multiFields = ['Name','Hometown', 'Destination']
    const unusedFields = [ 'SibSp', 'Parch', 'WikiId','Name_wiki', 'Age_wiki', 'Embarked', 'Class' ]
    const promises = []

    for(const item of jsonArray) {
        for (const field of unusedFields ) {
            delete (item[field])
        }
        for (const field of multiFields ) {
            const strArray = item[field].split(', ')
            field === 'Name' ? convertName(item, strArray)
            :  field === 'Hometown' ? convertHometown(item, strArray)
            : field === 'Destination' ? convertDestination(item, strArray) : ''
        }
        for (const field of boolFields ) {
            convertToBool(item, field)
        }
        for (const field of floatFields ) {
            convertToFloat(item, field)
        }
        const createAllInsertions = createInsertion(item)
        
        promises.push(client.query(createAllInsertions[0]))
    }
    await Promise.all(promises)

    const t2 = await client.query('SELECT NOW() as field1')
    console.log((t2.rows[0].field1 - result.rows[0].field1) / 1000, 'secondes')
}
function createInsertion(item){
    item.Dcity = item.Dcity.replace("'", '')
    item.Hcity = item.Dcity.replace("'", '')
    item.Lastname = item.Lastname.replace("'", '')
    item.Firstname = item.Firstname.replace("'", '')
    
    if(item.Survived === ""){
        item.Survived = null
    }

    return [
        `
        INSERT INTO "titanic"."hometown" ("id", "city", "state", "country")
        VALUES (${item.PassengerId},'${item.Hcity}', NULLIF('${item.Hstate}', ''), '${item.Hcountry}');

        INSERT INTO "titanic"."destination" ("id", "city", "state", "country")
        VALUES (${item.PassengerId}, NULLIF('${item.Dcity}', ''), NULLIF('${item.Dstate}', ''),'${item.Dcountry}');

        INSERT INTO "titanic"."boarding" ("id", "name")
        VALUES (${item.PassengerId},'${item.Boarded}');

        INSERT INTO "titanic"."ticket" ("id", "ticketNumber", "fare", "class", "cabin", "boardingId", "destinationId" )
        VALUES (${item.PassengerId},'${item.Ticket}','${item.Fare}','${item.Pclass}','${item.Cabin}',${item.PassengerId},${item.PassengerId});

        INSERT INTO "titanic"."passenger" ("id", "lastname", "firstname", "age", "hasSurvived", "ticketId", "hometownId", "lifeboat", "body" )
        VALUES (${item.PassengerId},'${item.Lastname}','${item.Firstname}', ${item.Age || null}, ${item.Survived ? true : item.Survived === null ? null : false}, ${item.PassengerId},${item.PassengerId}, NULLIF('${item.Lifeboat}', ''),NULLIF('${item.Body}', ''));
        `
    ]
}
function createTables() {
    return [
        `
        CREATE TABLE IF NOT EXISTS "titanic"."passenger" (
            "id" SERIAL,
            "lastname" VARCHAR(255) NOT NULL,
            "firstname" VARCHAR(255) NOT NULL,
            "age" INT,
            "hasSurvived" BOOLEAN,
            "ticketId" INT NOT NULL,
            "hometownId" INT NOT NULL,
            "lifeboat" VARCHAR(64),
            "body" VARCHAR(64),
            PRIMARY KEY ("id")
        );`,

        `
        CREATE TABLE IF NOT EXISTS "titanic"."ticket" (
            "id" SERIAL,
            "ticketNumber" VARCHAR(255) NOT NULL,
            "fare" FLOAT,
            "class" INT NOT NULL,
            "cabin" VARCHAR(64),
            "boardingId" INT NOT NULL,
            "destinationId" INT NOT NULL,
            PRIMARY KEY ("id")
        );`,

        `
        CREATE TABLE IF NOT EXISTS "titanic"."boarding" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
        );`,

        `
        CREATE TABLE IF NOT EXISTS "titanic"."hometown" (
            "id" SERIAL,
            "city" VARCHAR(255) NOT NULL,
            "state" VARCHAR(255),
            "country" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
        );`,

        `
        CREATE TABLE IF NOT EXISTS "titanic"."destination" (
            "id" SERIAL,
            "city" VARCHAR(255),
            "state" VARCHAR(255),
            "country" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
        );`
    ]
}
function createRelations() {
    return [
        `
            ALTER TABLE "titanic"."passenger" 
            ADD CONSTRAINT "fk_passenger_ticket" FOREIGN KEY ("ticketId") REFERENCES "titanic"."ticket" ("id");
        `,
        `
            ALTER TABLE "titanic"."passenger" 
            ADD CONSTRAINT "fk_passenger_hometown" FOREIGN KEY ("hometownId") REFERENCES "titanic"."hometown" ("id");
        `,
        `
            ALTER TABLE "titanic"."ticket" 
            ADD CONSTRAINT "fk_ticket_destination" FOREIGN KEY ("destinationId") REFERENCES "titanic"."destination" ("id");
        `,
        `
            ALTER TABLE "titanic"."ticket" 
            ADD CONSTRAINT "fk_ticket_boarding" FOREIGN KEY ("boardingId") REFERENCES "titanic"."boarding" ("id");
        `,
    ]
    
}
function convertToBool(item, field){
    if(!item[field]) {
        return
    }
    if( item[field] === '0.0') {
        item[field] = false
    }else if (item[field] === '1.0' ){
        item[field] = true
    }
}
function convertToFloat(item, field){
    if(!item[field]) {
        return
    }
    item[field] = parseFloat(item[field])
}
function convertName(item, strArray){
    item['Lastname'] = strArray[0]
    item['Firstname'] = strArray[1]
}
function convertHometown(item, strArray){
    if (strArray[2] === 'UK') {
        strArray.pop()
    }
    if (strArray.length === 4 && strArray[3] === 'Belgium'){
        strArray.shift()
    }
    if (strArray.length === 2) {
        item['Hcity'] = strArray[0]
        item['Hstate'] = ''
        item['Hcountry'] = strArray[1]
    }else{
        item['Hcity'] = strArray[0]
        item['Hstate'] = strArray[1]
        item['Hcountry'] = strArray[2]
    }
}
function convertDestination(item, strArray){
    if (strArray[0] === 'New York City' || strArray[0] === 'New York' ) {
        strArray[1] = 'New York'
        strArray[2] = 'US'
    }
    if (strArray.length === 1) {
        item['Dcity'] = ''
        item['Dstate'] = ''
        item['Dcountry'] = strArray[0]
    }
    else if (strArray.length === 2) {
        item['Dcity'] = strArray[0]
        item['Dstate'] = ''
        item['Dcountry'] = strArray[1]
    }else{
        item['Dcity'] = strArray[0]
        item['Dstate'] = strArray[1]
        item['Dcountry'] = strArray[2]
    }
    
}