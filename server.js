const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
// const readline = require('readline-sync')

const port = process.env.PORT || 3030

app.use(logger('dev'))         
app.use(bodyParser.json())    
app.use(bodyParser.urlencoded({extended: true}))
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })


app.get('*', (req, res) => {
  res.send('CON USSD MEDICAL PAYMENT')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON IKAZE KURI MEDICAL PAYMENT`
    res.send(response)
  } 
  else if (text != '1199670003005067') {
    // Business logic for first level response
    let response = `END ---MEDICAL PAYMENT---
    
    Ntibyakunze`
    res.send(response)
  }
  else if (text == '1199670003005067') {
    // Business logic for first level response
    let response = `CON ---MEDICAL PAYMENT---

    Amazina : NIYONSENGA EDITHE 
    shyiramo kode wishyuriraho`
    res.send(response)
  }  
  
  else if (text != '1199670003005067*3575') {
    // Business logic for first level response
    let response = `END ---MEDICAL PAYMENT---

    Ntibyakunze mwongere mugerageze`
    res.send(response)
  }

   else if (text == '1199670003005067*3575') {
    // Business logic for first level response
    let response = `CON ---MEDICAL PAYMENT--- 
    
    NIYONSENGA EDITHE urishyura 230
    kanda:

    1.kwemeza kwishyura
    2.kubihagarika`
    res.send(response)
  }  
   
  else if (text == '1199670003005067*3575*1') {
    // Business logic for first level response
    let response = `END ---MEDICAL PAYMENT--- 
    
    NIYONSENGA EDITHE kwishyura byakunze
    
    Murakoze kwishyura`
    res.send(response)
  }
  else if (text == '1199670003005067*3575*2') {
    // Business logic for first level response
    let response = `END ---MEDICAL PAYMENT--- 
    
    Murakoze`
    res.send(response)
  }

  else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
