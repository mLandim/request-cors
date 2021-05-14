# Request CORS
Javascript helper function for HTTP requests dealing with CORS

## Installation

`npm install request-cors `

## Usage

Import module and make a request
```
import { requestCors } from 'request-cors'

...

// get

requestCors.get('http://myhost.com').then(response => {
    let statusRequest = response.status
    let myData = response.data
}).catch(error => {
    console.error(error)
})

// or post

const bodyObject = {foo: 'bar'}
requestCors.post('http://myhost.com', bodyObject).then(response => {
    let statusRequest = response.status
    let myData = response.data
}).catch(error => {
    console.error(error)
})

```