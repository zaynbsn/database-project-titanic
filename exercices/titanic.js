const csv = require('csvtojson')

module.exports = async function(client){


    // duplicate this file to add other exercices.
    const result = await client.query('SELECT NOW() as field1')
    console.log(result.rows[0].field1)
    console.log("🎉 Exercice 0 is a sample on how to create a new file ".black.bgGreen);

    const jsonArray = await csv().fromFile("exercices/titanic-full.csv")
    
    
    
    const boolFields = ['Survived']
    const floatFields = ['PassengerId', 'Pclass', 'Age', 'Fare']
    const strFields = ['Name', 'Sex', 'Ticket', 'Cabin', 'Hometown', 'Boarded', 'Destination', 'Lifeboat', 'Body']
    const multiFields = ['Name','Hometown', 'Destination']
    const unusedFields = [ 'SibSp', 'Parch', 'WikiId','Name_wiki', 'Age_wiki', 'Embarked', 'Class' ]
    
    for(const item of jsonArray) {
        for (const field of unusedFields ) {
            delete (item[field])
        }
        for (const field of multiFields ) {
            const strArray = item[field].split(',')
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
    }
    // console.log(jsonArray)
    
   
    async function createTables() {
        const createAllTable = [
            `
            CREATE TABLE IF NOT EXISTS "titanic"."passenger" (
                "id" SERIAL,
                "lastname" VARCHAR(255) NOT NULL,
                "firstname" VARCHAR(255) NOT NULL,
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
                "fare" FLOAT NOT NULL,
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
                "city" VARCHAR(255) NOT NULL,
                "state" VARCHAR(255),
                "country" VARCHAR(255) NOT NULL,
                PRIMARY KEY ("id")
            );`
        ]
        for (const table of createAllTable){
            await client.query(table)
        }
    }
    await createTables()
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
    item['lastname'] = strArray[0]
    item['firstname'] = strArray[1]
}
function convertHometown(item, strArray){
    if (strArray.length === 2) {
        item['Hcity'] = strArray[0]
        item['Hstate'] = undefined
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
    if (strArray.length === 2) {
        item['Hcity'] = strArray[0]
        item['Hstate'] = undefined
        item['Hcountry'] = strArray[1]
    }else{
        item['Dcity'] = strArray[0]
        item['Dstate'] = strArray[1]
        item['Dcountry'] = strArray[2]
    }
    
}