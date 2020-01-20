const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
// const readline = require('readline-sync')

const port = process.env.PORT || 3030

app.use(logger('dev'))         
app.use(bodyParser.json())    
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('CON USSD MEDICAL PAYMENT')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON IKAZE KURI MEDICAL PAYMENT
      shyiramo imibare y'indangamuntu
      (submit your id No)`
    res.send(response)
  } 

  else if (text == '1199780092756207') {
    // Business logic for first level response
    let response = `CON ---MEDICAL PAYMENT---

    Amazina (names): Olly Imanishimmwe 
    shyiramo kode wishyuriraho
    (submit the code sent in sms)`
    res.send(response)
  }  

  else if (text == '1199780092756297*3575') {
    // Business logic for first level response
    let response = `CON ---MEDICAL PAYMENT--- 
    
    Olly Imanishimmwe  urishyura (you will pay): frw 230.
    
    kanda:

    1.kwemeza kwishyura (yes pay)
    2.kubihagarika (no)`
    res.send(response)
  }  
   
  else if (text == '1199780092756297*3575*1') {
    // Business logic for first level response
    let response = `END ---MEDICAL PAYMENT--- 
    
    Olly Imanishimmwe  kwishyura byakunze
    
    Murakoze kwishyura
    (thank you)`
    res.send(response)
  }
  else if (text == '1199780092756297*3575*2') {
    // Business logic for first level response
    let response = `END ---MEDICAL PAYMENT--- 
    
    Murakoze
    (thank you)`
    res.send(response)
  }

  else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
