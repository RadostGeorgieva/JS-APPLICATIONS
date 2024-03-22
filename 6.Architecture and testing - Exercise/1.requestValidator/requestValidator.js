function requestValidator(obj) {
    let ValidMethod  = ["POST","GET", "DELETE", "CONNECT"];
    let uriPattern = /^[\w.]+$/g
    let validVersion = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
    let invalidSymbol = ["<",">","\\","&",`'`,`"`]; 

    if (!ValidMethod.includes(obj.method)) {
       throw new Error(`Invalid request header: Invalid Method`)
    } 
    if((!obj.uri) || !obj.uri === "*" || ! obj.uri.match(uriPattern)) {
        throw new Error(`Invalid request header: Invalid URI`);
    }
    if(!validVersion.includes(obj.version)) {
        throw new Error(`Invalid request header: Invalid Version`);
    }  
    if(!obj.hasOwnProperty("message")) {
        throw new Error(`Invalid request header: Invalid Message`);
    }

    for(el of obj.message) {
        if(invalidSymbol.includes(el)) {
            throw new Error(`Invalid request header: Invalid Message`);
        }
    }
    return obj
}
//"Invalid request header: Invalid {Method/URI/Version/Message}".
console.log(requestValidator({

    method: 'GET',
    
    uri: 'svn.public.catalog',
    
    version: 'HTTP/1.1',
    
    message: ''
    
    }))

    console.log(requestValidator({

        method: 'OPTIONS',
        
        uri: 'git.master',
        
        version: 'HTTP/1.1',
        
        message: '-recursive'
        
        }))

