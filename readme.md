Here is a comprehensive list of HTTP status codes, categorized by their general type:

---

### **1xx - Informational Responses**
- **100 Continue**: Server has received the request headers; client should continue sending the request body.
- **101 Switching Protocols**: Server is switching protocols as requested by the client.
- **102 Processing (WebDAV)**: Request is being processed, but no response is available yet.
- **103 Early Hints**: Hints the client to start preloading resources while the server prepares the final response.

---

### **2xx - Success**
- **200 OK**: Request was successful.
- **201 Created**: Resource was successfully created.
- **202 Accepted**: Request has been accepted but not processed yet.
- **203 Non-Authoritative Information**: Returned meta-information is not from the origin server.
- **204 No Content**: Successful request, but no content to return.
- **205 Reset Content**: Instructs the client to reset the document view.
- **206 Partial Content**: Partial content is returned due to a range request.
- **207 Multi-Status (WebDAV)**: Multiple statuses for different operations.
- **208 Already Reported (WebDAV)**: Elements have already been enumerated in a previous response.
- **226 IM Used**: Server fulfilled a GET request using an instance-manipulation.

---

### **3xx - Redirection**
- **300 Multiple Choices**: Multiple options for the requested resource.
- **301 Moved Permanently**: Resource has been permanently moved to a new URL.
- **302 Found**: Temporary redirection to a different URL.
- **303 See Other**: Redirects to another resource (usually used after POST).
- **304 Not Modified**: Resource not modified since the last request.
- **305 Use Proxy**: Deprecated. Requested resource must be accessed through a proxy.
- **307 Temporary Redirect**: Resource temporarily moved to another URL.
- **308 Permanent Redirect**: Resource permanently moved to another URL.

---

### **4xx - Client Errors**
- **400 Bad Request**: Client sent an invalid request.
- **401 Unauthorized**: Authentication is required.
- **402 Payment Required**: Reserved for future use (e.g., digital payment systems).
- **403 Forbidden**: Server refuses to fulfill the request.
- **404 Not Found**: Resource not found.
- **405 Method Not Allowed**: HTTP method is not supported by the resource.
- **406 Not Acceptable**: Resource cannot fulfill the client's `Accept` headers.
- **407 Proxy Authentication Required**: Client must authenticate with a proxy.
- **408 Request Timeout**: Client took too long to send the request.
- **409 Conflict**: Request conflicts with the server's state.
- **410 Gone**: Resource is no longer available.
- **411 Length Required**: `Content-Length` header is missing in the request.
- **412 Precondition Failed**: Precondition in request headers failed.
- **413 Payload Too Large**: Request body is too large for the server to process.
- **414 URI Too Long**: URL is too long to process.
- **415 Unsupported Media Type**: Media type is not supported.
- **416 Range Not Satisfiable**: Client requested a range that is not satisfiable.
- **417 Expectation Failed**: Expectation in `Expect` header could not be fulfilled.
- **418 I'm a teapot**: Easter egg (RFC 2324).
- **421 Misdirected Request**: Server cannot produce a response.
- **422 Unprocessable Entity (WebDAV)**: Request is well-formed but semantically incorrect.
- **423 Locked (WebDAV)**: Resource is locked.
- **424 Failed Dependency (WebDAV)**: Request failed due to a previous request failure.
- **425 Too Early**: Indicates that the server is unwilling to process a request that might be replayed.
- **426 Upgrade Required**: Client should switch to a different protocol.
- **428 Precondition Required**: Server requires request conditions.
- **429 Too Many Requests**: Too many requests in a short period.
- **431 Request Header Fields Too Large**: Headers are too large to process.
- **451 Unavailable For Legal Reasons**: Resource is unavailable due to legal reasons.

---

### **5xx - Server Errors**
- **500 Internal Server Error**: General server error.
- **501 Not Implemented**: Server does not support the requested functionality.
- **502 Bad Gateway**: Invalid response from an upstream server.
- **503 Service Unavailable**: Server is temporarily unavailable.
- **504 Gateway Timeout**: Upstream server failed to respond in time.
- **505 HTTP Version Not Supported**: HTTP version not supported by the server.
- **506 Variant Also Negotiates**: Server configuration error.
- **507 Insufficient Storage (WebDAV)**: Server is unable to store the representation.
- **508 Loop Detected (WebDAV)**: Infinite loop detected in the request.
- **510 Not Extended**: Further extensions are required.
- **511 Network Authentication Required**: Client must authenticate to gain network access.

---

Let me know if you need further explanation for any specific status code!