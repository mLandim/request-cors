/**
 * Helper function for http requests with CORS
 * 
 * @function requestCors
 * @author Marcelo Landim <marcelolandim85@gmail.com>
 * @version v1.0.3
 * @date 14/05/2021
 * @param {String} method - HTTP method request, GET or POST
 * @param {String} url 
 * @param {Object} postBodyObject - plain javascript object with POST request's parameters
 * @returns {Promise} - promise result
*/
const requestCors = (function (){
    
    // default function
    function main(method, url, postBodyObject) {
  
        return new Promise (function (resolve, reject) {
               
            let responseObject = {}
            let dataJson = {}
            let XDomainRequest = null
    
            try {
    
                let request = new XMLHttpRequest()
                if ('withCredentials' in request) {
                    // XHR for Chrome/Firefox/Opera/Safari.
                    request.open(method, url, true)
                } else if (typeof XDomainRequest != 'undefined') {
                    // XDomainRequest for IE.
                    request = new XDomainRequest()
                    request.open(method, url)
                } else {
    
                    // CORS not supported.
                    request = null
                    responseObject = { status: 'x', data: 'Invalid connection. (open)' }
                    
                    throw responseObject
                }
    
                // if request is not null
                if (request != null) {
    
                    
                    request.withCredentials = true
    
                    // If any parameters (plain js object) are received, they should be send with the http request 
                    if (postBodyObject) { 
                        request.send(JSON.stringify(postBodyObject))
                    } else {
                        request.send()
                    }
    
                    // Using onload property of request (XMLHttpRequest) object - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload
                    request.onload = function () {
                    
                        try {
                            // If status 400 or grater
                            if (request.status >= 400) {
    
                                responseObject = { status: request.status, data: request.response }
                                // rejects promise 
                                reject(responseObject)
                                
                            } else {
    
                                try {
                                    dataJson = JSON.parse(request.response)
                                } catch (errorJsonParse) {
                                    // error on JSON parse
                                    responseObject = { status: request.status, data: errorJsonParse }
                                    reject(responseObject)
                                }
    
                                responseObject = { status: request.status, data: dataJson }
                                // resolves promise
                                resolve(responseObject)
    
                            }
                            
                        } catch (errorOnLoad) {
                            
                            // on error of onload callback function - rejects promise
                            reject(responseObject)
    
                        }
                    
                    }
    
                    // Handling erros at network level - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onerror
                    request.onerror = function() {
                        // onerror -> rejects promise 
                        responseObject = { status: 'x', data: 'Conexão inválida. (onerror)' }
                        reject(responseObject)
                    }
    
                }
    
            } catch (errorMaster) {
            
                responseObject = { status: 0, data: errorMaster }
    
                // rejecting promise
                reject(responseObject)
    
            }
    
        })
      
    } 

    function get(url) {
        return main('GET', url)
    }

    function post(url, postBodyObject) {
        return main('POST', url, postBodyObject)
    }

    // assign helpers to main
    main.get = get
    main.post = post

    // return main
    return main

})()

export { requestCors }
  