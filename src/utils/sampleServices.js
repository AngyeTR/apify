import { sampleAdmin, sampleSeller, sampleMarketingUser } from "./sampleData"
export const login =  (email, password)=> {
     function checkCredentials(email, password){
        if(email.toLowerCase() == "a" && password == "123"){
            return ({status: "ok", data: sampleAdmin})
        }
        else if (email.toLowerCase() == "a" && password == "456"){
            return ({status: "ok", data: sampleMarketingUser})
        }
        else if (email.toLowerCase() == "a" && password == "789"){
            return ({status: "ok", data: sampleSeller})
        }
        else {
            return ({status: "error"})
        }
    }
    const response =  checkCredentials(email, password)
    return response
}



export const loginRes = {
    "response": {
      "message": "Credenciales correctas",
      "isValid": true,
      "idRegistro": 10,
      "data": {
        "id": 10,
        "idCompany": 1,
        "firstName": "Angie",
        "lastName": "Rodriguez",
        "fullname": "Angie Rodriguez",
        "idProfile": 1,
        "email": "angie.rodriguez@tambora.co",
        "password": "aEGpzmtaxZTzga9c5LtcAQ==",
        "avatar": null,
        "isActive": true,
        "createdDate": "2025-03-29T10:32:32.6446242",
        "modifiedDate": "2025-03-29T10:32:32.644627",
        "createdBy": "API",
        "modifiedBy": "API"
      },
      "errorMessages": null
    },
    "token": {
      "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjgxNmNlYjdhLTE5NzItNDAxMS04OTBjLTVhOTdiMDQ0MTU4MiIsInN1YiI6ImFuZ2llLnJvZHJpZ3VlekB0YW1ib3JhLmNvIiwiZW1haWwiOiJhRUdwem10YXhaVHpnYTljNUx0Y0FRPT0iLCJqdGkiOiIwYjEzOWNlYy0xNGJiLTQyNzgtOTJkZC1lMzk3ZTg1MzdmZTUiLCJuYmYiOjE3NDM0MjkzMDMsImV4cCI6MTc0MzQ2MTcwMywiaWF0IjoxNzQzNDI5MzAzLCJpc3MiOiJodHRwczovL2FwcC5kYXNod29yay5jby8iLCJhdWQiOiJodHRwczovL2FwcC5kYXNod29yay5jby8ifQ.0H2gjXvY-7dAjGNNzpOVv04r4wtmgT5ysA4QkTjD6kMFpyHBwGICK0z-H3dA795RhCGu58t9j1Twi_mTNgKN5Q",
      "expiredDate": "2025-03-31T17:55:03.0419101-05:00"
    },
    "company": {
      "id": 1,
      "name": "Tambora",
      "idSegment": 1,
      "segment": {
        "id": 1,
        "name": "Ecommerce"
      },
      "urlLogo": null,
      "principalColor": null,
      "secondaryColor": null
    },
    "user": {
      "id": 10,
      "idCompany": 1,
      "firstName": "Angie",
      "lastName": "Rodriguez",
      "fullname": "Angie Rodriguez",
      "idProfile": 1,
      "email": "angie.rodriguez@tambora.co",
      "password": "aEGpzmtaxZTzga9c5LtcAQ==",
      "avatar": null,
      "isActive": true,
      "createdDate": "2025-03-29T10:32:32.6446242",
      "modifiedDate": "2025-03-29T10:32:32.644627",
      "createdBy": "API",
      "modifiedBy": "API"
    },
    "suscription": {
      "id": 1,
      "idCompany": 1,
      "idCampaignChannel": 2,
      "idSuscriptionType": 1,
      "suscriptionType": {
        "id": 1,
        "name": "Gold",
        "comment": null,
        "maxUsers": 0,
        "maxWarehouse": 0
      },
      "detail": [
        {
          "id": 1,
          "idSystemSuscription": 1,
          "startDate": "2025-01-01T00:00:00",
          "endDate": "2025-12-31T00:00:00",
          "expirationDate": "2025-12-31T00:00:00",
          "isPaid": true
        }
      ]
    },
    "implementation": {
      "id": 1,
      "idCompany": 1,
      "implementationStep": 1,
      "success": false
    },
    "options": [
      {
        "id": 1,
        "name": "General",
        "comment": null,
        "idModule": 1,
        "module": {
          "id": 1,
          "name": "Configuración",
          "comment": null,
          "sort": 0,
          "className": null
        },
        "controller": "m",
        "action": "m",
        "sort": 0
      },
      {
        "id": 2,
        "name": "Sedes",
        "comment": null,
        "idModule": 1,
        "module": {
          "id": 1,
          "name": "Configuración",
          "comment": null,
          "sort": 0,
          "className": null
        },
        "controller": "m",
        "action": "m",
        "sort": 1
      },
      {
        "id": 3,
        "name": "Usuarios",
        "comment": null,
        "idModule": 1,
        "module": {
          "id": 1,
          "name": "Configuración",
          "comment": null,
          "sort": 0,
          "className": null
        },
        "controller": "m",
        "action": "m",
        "sort": 2
      },
      {
        "id": 4,
        "name": "Campañas",
        "comment": null,
        "idModule": 2,
        "module": {
          "id": 2,
          "name": "Marketing",
          "comment": null,
          "sort": 1,
          "className": null
        },
        "controller": "m",
        "action": "m",
        "sort": 0
      },
      {
        "id": 5,
        "name": "Diseñador",
        "comment": null,
        "idModule": 2,
        "module": {
          "id": 2,
          "name": "Marketing",
          "comment": null,
          "sort": 1,
          "className": null
        },
        "controller": "m",
        "action": "m",
        "sort": 0
      }
    ]
  }