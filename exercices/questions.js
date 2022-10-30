const questions = [
  require('./questions/q1'),
  require('./questions/q2'),
  require('./questions/q3'),
  require('./questions/q4'),
  require('./questions/q5'),
  require('./questions/q6'),
  require('./questions/q7'),
  require('./questions/q8'),
  require('./questions/q9'),
  require('./questions/q10'),
  require('./questions/q11'),
  require('./questions/q12'),
  require('./questions/q13'),
  require('./questions/q14'),
  require('./questions/q15')
]

module.exports = async function(client){
  for (const question of questions){
    await question(client)
    console.log('next question in 15 seconds'.red) 
    await sleep(15000)
    
    
    // console.log('waiting keypress..')
    // await waitingKeypress();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// function waitingKeypress() {
//   return new Promise((resolve) => {
//     document.addEventListener('keydown', onKeyHandler);
//     function onKeyHandler(e) {
//       if (e.keyCode === 13) {
//         document.removeEventListener('keydown', onKeyHandler);
//         resolve();
//       }
//     }
//   });
// }