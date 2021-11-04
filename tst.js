let hiragana = {'あ': 'a', 'い':'i', 'う':'u', 'え':'e', 'お':'o',
                'か':'ka', 'き':'ki', 'く':'ku', 'け':'ke', 'こ':'ko',  
                'さ':'sa', 'し':'shi', 'す':'su', 'せ':'se', 'そ':'so',  
                'た':'ta', 'ち':'chi', 'つ':'tsu', 'て':'te', 'と':'to',  
                'な':'na', 'に':'ni', 'ぬ':'nu', 'ね':'ne', 'の':'no',  
                'は':'ha', 'ひ':'hi', 'ふ':'fu', 'へ':'he', 'ほ':'ho',  
                'ま':'ma', 'み':'mi', 'む':'mu', 'め':'me', 'も':'mo',  
                'や':'ya', 'ゆ':'yu', 'よ':'yo',  
                'ら':'ra', 'り':'ri', 'る':'ru', 'れ':'re', 'ろ':'ro',  
                'わ':'wa', 'を':'wo', 'ん':'n'}
                
let katakana = {'ア': 'a', 'イ':'i', 'ウ':'u', 'エ':'e', 'オ':'o',
                'カ':'ka', 'キ':'ki', 'ク':'ku', 'ケ':'ke', 'コ':'ko',  
                'サ':'sa', 'シ':'shi', 'ス':'su', 'セ':'se', 'ソ':'so',  
                'タ':'ta', 'チ':'chi', 'ツ':'tsu', 'テ':'te', 'ト':'to',  
                'ナ':'na', 'ニ':'ni', 'ヌ':'nu', 'ネ':'ne', 'ノ':'no',  
                'ハ':'ha', 'ヒ':'hi', 'フ':'fu', 'ヘ':'he', 'ホ':'ho',  
                'マ':'ma', 'ミ':'mi', 'ム':'mu', 'メ':'me', 'モ':'mo',  
                'ヤ':'ya', 'ユ':'yu', 'ヨ':'yo',  
                'ラ':'ra', 'リ':'ri', 'ル':'ru', 'レ':'re', 'ロ':'ro',  
                'ワ':'wa', 'ヲ':'wo', 'ン':'n'}

let columnsStartIndexes = {
    'a': 0, 'ka': 5, 'sa': 10, 'ta': 15, 'na': 20, 'ha': 25, 'ma': 30, 'ya': 35, 'ra': 38, 'wa': 43 
}

let columnsEndIndexes = {
    'a': 4, 'ka': 9, 'sa': 14, 'ta': 19, 'na': 24, 'ha': 29, 'ma': 34, 'ya': 37, 'ra': 42, 'wa': 45 
}

let romaji = ['a', 'i', 'u', 'e', 'o',
              'ka', 'ki', 'ku', 'ke', 'ko',  
              'sa', 'shi', 'su', 'se', 'so',  
              'ta', 'chi', 'tsu', 'te', 'to',  
              'na', 'ni', 'nu', 'ne', 'no',  
              'ha', 'hi', 'fu', 'he', 'ho',  
              'ma', 'mi', 'mu', 'me', 'mo',  
              'ya', 'yu', 'yo',  
              'ra', 'ri', 'ru', 're', 'ro',  
              'wa', 'wo', 'n']


var previousQuestion = -1
var currentAnswer = ''
var correctAnswers = 0
var incorrectAnswers = 0
var incorrectHint = ""
var currentKanatype = "1" //hiragana = 1, katakana = 2
var kanaRowsInUse = ['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa']
var kanaColumnsUsed = Array.from(Array(46).keys())
var currentButtonsAmount = 8

function getKana(){
    switch(currentKanatype){
        case 1: return hiragana;
        case 2: return katakana;
    }
}

function generateQuestion(){
    document.getElementById("correct").textContent = "Correct Answers: " + correctAnswers
    document.getElementById("incorrect").textContent = "Incorrect Answers: " + incorrectAnswers
    document.getElementById("incorrectHint").textContent = incorrectHint

    var p1 = document.getElementById("question")
    var randomNum = getRandomInKanaRange(46)
    while (randomNum == previousQuestion){
        var randomNum = getRandomInKanaRange(46)
    }
    previousQuestion = randomNum
    p1.textContent = getKeyByValue(currentKanatype == 1 ? hiragana : katakana, romaji[randomNum])

    currentAnswer = romaji[randomNum]
    var answers = generateAnswers()
    answers = shuffle(answers)

    var idBase = "anws"
    var i = 1
    for (var answer of answers){
        var asnwId = idBase + i
        document.getElementById(asnwId).textContent = answer
        i++
    }
}

function generateAnswers(){
    var answers = []
    answers.push(currentAnswer)
    while (answers.length != currentButtonsAmount){
        var newAnswer = romaji[getRandomInKanaRange(46)]

        if (!answers.includes(newAnswer)){
            answers.push(newAnswer)
        }
    }
    return answers
}

function checkAnswer(elId){
    if (document.getElementById(elId).textContent == currentAnswer){
        correctAnswers++
        incorrectHint = "Good Job!"
    }
    else{
        incorrectAnswers++
        incorrectHint = getKeyByValue(currentKanatype == 1 ? hiragana : katakana, currentAnswer) + " - " + currentAnswer
    }
    generateQuestion()
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getRandomInKanaRange(max) {
    var randomNum = getRandomInt(46)
    while (!kanaColumnsUsed.includes(randomNum)){
        randomNum = getRandomInt(46)
    }
    return randomNum
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function changeKanatype(type){
    if (type == currentKanatype){
        return;
    }
    else{
        currentKanatype = type
        if (kanaColumnsUsed.length > 0){
            generateQuestion()
            var a = document.getElementById("al")
            var ka = document.getElementById("kal")
            var sa = document.getElementById("sal")
            var ta = document.getElementById("tal")
            var na = document.getElementById("nal")
            var ha = document.getElementById("hal")
            var ma = document.getElementById("mal")
            var ya = document.getElementById("yal")
            var ra = document.getElementById("ral")
            var wa = document.getElementById("wal")
            if (currentKanatype == 1){
                a.textContent = "あいうえお"
                ka.textContent = "かきくけこ"
                sa.textContent = "さしすせそ"
                ta.textContent = "たちつてと"
                na.textContent = "なにぬねの"
                ha.textContent = "はひふへほ"
                ma.textContent = "まみむめも"
                ya.textContent = "やゆよ"
                ra.textContent = "らりるれろ"
                wa.textContent = "わをん"  
            }
            else{
                a.textContent = "アイウエオ"
                ka.textContent = "カキクケコ"
                sa.textContent = "サシスセソ"
                ta.textContent = "タチツテト"
                na.textContent = "ナニヌネノ"
                ha.textContent = "ハヒフヘホ"
                ma.textContent = "マミムメモ"
                ya.textContent = "ヤユヨ"
                ra.textContent = "ラリルレロ"
                wa.textContent = "ワヲン"  
            }
        }
    }
  }

  function changeKanacolumns(e){
    var x = range(columnsStartIndexes[e.id], columnsEndIndexes[e.id] - columnsStartIndexes[e.id] + 2)    

        if (!e.checked){
            kanaColumnsUsed = kanaColumnsUsed.filter(function(item) {
                return x.indexOf(item) === -1;
            });
        }
        else{
            kanaColumnsUsed = kanaColumnsUsed.concat(x)
        }

        if (kanaColumnsUsed.length < currentButtonsAmount){

            var idbase = "anws"
            for (var i = currentButtonsAmount; i > kanaColumnsUsed.length; i--){
                document.getElementById(idbase + i).style.visibility = 'hidden'
            }
            currentButtonsAmount = kanaColumnsUsed.length 
            console.log(currentButtonsAmount);
        }

        if (kanaColumnsUsed.length > currentButtonsAmount && currentButtonsAmount < 8){
            var tmp = kanaColumnsUsed.length - currentButtonsAmount
            if (tmp > 8){
                tmp = 8
            }
            var idbase = "anws"
            if (currentButtonsAmount == 0){
                currentButtonsAmount++
                tmp--;
            }
            for (var i = currentButtonsAmount; i <= tmp + currentButtonsAmount; i++){
                if (i > 8){
                    break;
                }
                document.getElementById(idbase + i).style.visibility = 'visible'
            }
            currentButtonsAmount = kanaColumnsUsed.length > 8 ? 8 : kanaColumnsUsed.length
        }

        if (kanaColumnsUsed.length > 0){
            generateQuestion()
        }
  }

  function range(start, end) {
    return Array.apply(0, Array(end - 1))
      .map((element, index) => index + start);
  }
