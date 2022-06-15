// Test making a question
let text = '{ "questionMaster" : [' + '{ "questionNo":1 , "questionText":"This is q1", "aAnswer":"Answer 1" , "bAnswer":"Answer 2" , "cAnswer":"Answer 3" , "dAnswer":"Answer 4" , "correctAnswer", "A" },' +
    '{ "questionNo":2 , "questionText":"This is q2", "aAnswer":"Answer 2.1" , "bAnswer":"Answer 2.2" , "cAnswer":"Answer 2.3" , "dAnswer":"Answer 2.4" , "correctAnswer", "B" },' +
    '{ "questionNo":3 , "questionText":"This is q3", "aAnswer":"Answer 3.1" , "bAnswer":"Answer 3.2" , "cAnswer":"Answer 3.3" , "dAnswer":"Answer 3.4" , "correctAnswer", "C" }]}';

console.log(obj.questionMaster[1].questionText + " " + obj.obj.questionMaster[1].aAnswer);