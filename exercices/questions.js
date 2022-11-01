const questions = []
for(let i=1; i<16; i++){
  questions.push(require('./questions/q' + i))
}

module.exports = async function(client){
  console.log("Hello! In this command prompt, all the answers to the project's questions will be displayed.".red)
  await sleep(2000)
  console.log('You can exit the program anytime by pressing "Ctrl+c"'.red)
  await sleep(1500)
  console.log('Press any key to see the first question'.red)
  await keypress()
  clear()
  
  for (const question of questions){
    await question(client)
    console.log('press any key to see the next question...'.red)
    await keypress()
    clear()
  }
  console.log('thank you for your lecture have a great time :)'.blue)
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', data => {
    const byteArray = [...data]
    if (byteArray.length > 0 && byteArray[0] === 3) {
      console.log('^C')
      process.exit(1)
    }
    process.stdin.setRawMode(false)
    resolve()
  }))
}

const clear = () => {
  process.stdout.write('\033c')
}