// https://raw.githubusercontent.com/SAP-samples/xf-application-mocks/master/xf-mock/apis/api.yaml

export default `openapi: '3.0.0'
info:
  description: >-
    This early preview of a extension factory API every aspect is subject to
    change.
  version: 0.0.1
  title: Extension Factory
tags:
  - name: Applications
  - name: Runtimes
  - name: Services
paths:
  '/applications':
    get:
      tags:
        - Applications
        
      summary: Find Applications for an account
      description: Returns a list of applications for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Application'
    post:
      tags:
        - Applications
        
      summary: Create an application for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
      requestBody:
        description: Application object to be created
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApplicationCreateInput'
      responses:
        '201':
          description: Created Application
          headers:
            Location:
              description: Path to the created Application
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/IdResponse'
  '/applications/{applicationId}':
    get:
      tags:
        - Applications
        
      summary: Get an Application for an account
      description: Returns an application for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema: 
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Application'
    put:
      tags:
        - Applications
        
      summary: Update an Application for an account
      description: Updataes an application for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema: 
            type: string
      requestBody:
        description: Application object to be updated
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApplicationUpdateInput'
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Application'

  '/runtime':
    get:
      tags:
        - Runtimes
        
      summary: Find Runtime for an account
      description: Returns a list of Runtime for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Runtime'
    post:
      tags:
        - Runtimes
        
      summary: Create a Runtime for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
      requestBody:
        description: Runtime object to be created
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RuntimeCreateInput'
      responses:
        '201':
          description: Id of Created Runtime
          headers:
            Location:
              description: Path to the created Runtime
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/IdResponse'
  '/runtime/{runtimeId}':
    get:
      tags:
        - Runtimes
        
      summary: Get a Runtime for an account
      description: Returns a Runtime for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: runtimeId
          in: path
          description: ID of the Runtime
          required: true
          schema: 
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Runtime'
    put:
      tags:
        - Runtimes
        
      summary: Update an Runtime for an account
      description: Updates an Runtime for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: runtimeId
          in: path
          description: ID of the Runtime
          required: true
          schema: 
            type: string
      requestBody:
        description: Runtime object to be updated
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RuntimeUpdateInput'
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Runtime'
    delete:
      tags:
        - Runtimes
        
      summary: Delete an Runtime for an account
      description: Deletes an Runtime for an account
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: runtimeId
          in: path
          description: ID of the runtime
          required: true
          schema: 
            type: string
      responses:
        '202':
          description: Accepted
  '/runtime/certificates':
    post:
      parameters:
        - in: query
          name: token
          description: 'Access Token fetched from /tokens endpoint.'
          required: true
          schema:
            type: string
      tags:
        - Runtimes
      summary: 'Signs CSR.'
      requestBody:
        description: 'The CSR to be signed'
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CSRRequest'
      responses:
        '201':
          description: 'Successful operation.'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CSRResponse'
  '/runtime/certificates/renewals':
    post:
      tags:
        - Runtimes
      summary: 'Renews certificate using CSR.'
      requestBody:
        description: 'The CSR to be signed'
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CSRRequest'
      responses:
        '201':
          description: 'Successful operation.'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CSRResponse'
  
  '/applications/{applicationId}/services':
    get:
      tags:
        - Services
        
      summary: Gets all registered services
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema: 
            type: string
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Service'
  '/applications/{applicationId}/services/{serviceId}':
    get:
      tags:
        - Services
      summary: Gets a service by service ID
      operationId: getServiceByServiceId
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema: 
            type: string
        - in: path
          name: serviceId
          description: ID of a service
          required: true
          schema: 
            type: string
            format: uuid
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ServiceDetails'
  '/applications/{applicationId}/tokens':
    post:
      tags:
        - Applications
        
        
      summary: Create an token URL for an application
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema:
            type: string
      responses:
        '201':
          description: create success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'
                
  '/applications/{applicationId}/signingRequests/info':
    get:
      tags:
        - Applications
        
        
      summary: Retrieve the info URL response
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful operation.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CSRApplicationInfoResponse'
        
  '/applications/{applicationId}/management/info':
    get:
      tags:
        - Applications
        
        
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema:
            type: string
      summary: 'Returns information on available services.'
      responses:
        '200':
          description: 'Successful operation.'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApplicationInfoResponse'
            
  '/applications/{applicationId}/certificates':
    post:
      tags:
        - Applications
        
        
      parameters:
        - in: query
          name: token
          description: 'Access Token fetched from /tokens endpoint.'
          required: true
          schema:
            type: string
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the application
          required: true
          schema:
            type: string
      requestBody:
        description: 'The CSR to be signed'
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CSRRequest'
      summary: 'Signs CSR.'
      responses:
        '201':
          description: 'Successful operation.'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CSRResponse'
  
  '/applications/{applicationId}/certificates/renewals':
    post:
      tags:
        - Applications
        
        
      summary: 'Renews certificate using CSR.'
      parameters:
        - name: xf-account-id
          in: header
          description: xf account id of the account to return applications for
          required: true
          schema: 
            type: string
            format: uuid
        - name: xf-account-type
          in: header
          description: xf account type of the account to return applications for
          required: true
          schema: 
            type: string
            enum: ["scp"]
        - name: applicationId
          in: path
          description: applicationId of the applications to return
          required: true
          schema:
            type: string
      requestBody:
        description: applicationId of the applications to return
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CSRRequest'
      responses:
        '201':
          description: 'Successful operation.'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CSRResponse'
            
  '/metadata/services':
    post:
      tags:
        - Services
        
      summary: Registers a new service
      operationId: registerService
      requestBody:
        description: Service object to be registered
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ServiceDetails'
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/IdResponse'
  '/metadata/services/{serviceId}':
    put:
      tags:
        - Services
        
      summary: Updates a service by service ID
      operationId: updateService
      parameters:
        - in: path
          name: serviceId
          description: ID of a service
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        description: Service object to be registered
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ServiceDetails'
      responses:
        '200':
          description: Successful operation
    delete:
      tags:
        - Services
        
      summary: Deletes a service by service ID
      operationId: deleteServiceByServiceId
      parameters:
        - in: path
          name: serviceId
          description: ID of a service
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: Successful operation

components:
  schemas:
    Runtime:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        eventsUrl:
          type: string
        pairingUrl:
          type: string
    RuntimeCreateInput:
      type: object
      properties:
        name:
          type: string
        eventsUrl:
          type: string
        pairingUrl:
          type: string
    RuntimeUpdateInput:
      type: object
      properties:
        name:
          type: string
        eventsUrl:
          type: string
        pairingUrl:
          type: string
    Application:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        status:
          type: string
    ApplicationUpdateInput:
      type: object
      properties:
        name:
          type: string
    ApplicationCreateInput:
      type: object
      required:
        - name
      properties:
        name:
          type: string
    IdResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
    ServiceDetails:
      type: object
      properties:
        provider:
          type: string
        name:
          type: string
        description:
          type: string
        shortDescription:
          type: string
        identifier:
          type: string
        status:
          type: string
        labels:
          type: object
          additionalProperties:
            type: string
        api:
          $ref: '#/components/schemas/Api'
        events:
          $ref: '#/components/schemas/Events'
        documentation:
          $ref: '#/components/schemas/Documentation'
      required:
        - provider
        - name
        - description
    Service:
      type: object
      properties:
        id:
          type: string
          format: uuid
        provider:
          type: string
        name:
          type: string
        description:
          type: string
        identifier:
          type: string
        status:
          type: string
        labels:
          type: object
          additionalProperties:
            type: string
    Api:
      type: object
      properties:
        spec:
          type: object
          description: >-
            OpenApi v2 swagger file:
            https://github.com/OAI/OpenAPI-Specification/blob/master/schemas/v2.0/schema.json
    Events:
      type: object
      properties:
        spec:
          description: >-
            AsyncApi file v1:
            https://github.com/asyncapi/asyncapi/blob/develop/schema/asyncapi.json
          type: object
    Documentation:
      type: object
      properties:
        displayName:
          type: string
        description:
          type: string
        type:
          type: string
        tags:
          type: array
          items:
            type: string
        docs:
          type: array
          items:
            $ref: '#/components/schemas/Document'
      required:
        - displayName
        - description
        - type
    Document:
      type: object
      properties:
        title:
          type: string
        type:
          type: string
        source:
          type: string
      required:
        - title
        - type
        - source
    APIURLs:
      type: object
      properties:
        metadataUrl:
          type: string
          example: 'https://api.extend.sap.cx/public/v1/metadata/services'
        eventsUrl:
          type: string
          example: 'https://gateway.customer.cluster.extend.sap.cx/v1/{applicationId}/v1/events'
        certificatesUrl:
          type: string
          example: 'https://api.extend.sap.cx/public/v1/applications/{applicationId}'
        infoUrl:
          type: 'string'
          example: 'https://api.extend.sap.cx/public/v1/applications/{applicationId}/management/info'
          
    CSRApplicationInfoResponse:
      type: 'object'
      properties:
        signUrl:
          type: 'string'
          example: 'https://api.extend.sap.cx/public/v1/applications/{applicationId}/certificates?token=1edfc34g'
        api:
          $ref: '#/components/schemas/APIURLs'
        certificate:
          $ref: '#/components/schemas/Cert'
  
    TokenResponse:
      type: object
      properties:
        url:
          type: string
          example: 'https://api.extend.sap.cx/public/v1/applications/{applicationId}/signingRequests/info?token=1edfc34g'
        token:
          type: string
          example: 1edfc34g
    Cert:
      type: object
      properties:
        subject:
          type: string
          example: 'OU=Test,O=Test,L=Blacksburg,ST=Virginia,C=US,CN={application-name}'
        extensions:
          type: string
        key-algorithm:
          type: string
          example: rsa2048
          
    ApplicationInfoResponse:
        type: object
        properties:
          urls:
            $ref: '#/components/schemas/ApplicationInfoResponseUrls'
            
    ApplicationInfoResponseUrls:
        type: object
        properties:
          metadataUrl:
            type: string
            example: 'https://gateway.customer.cluster.extend.sap.cx/{applicationId}/v1/metadata/services'
          eventsUrl:
            type: string
            example: 'https://gateway.customer.cluster.extend.sap.cx/{applicationId}/v1/events'
          renewCertUrl:
            type: string
            example: 'https://api.extend.sap.cx/public/v1/applications/{applicationId}/certificates/renewals'
            
    CSRRequest:
      type: object
      properties:
        csr:
          type: string
          description: 'Base64 encoded certificate signing request file.'
          example: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tDQpBTllfQ0VSVElGSUNBVEVfRklMRV9USElTX0lTX0pVU1RfQU5fRVhBTVBMRQ0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQ0K'
          
    CSRResponse:
      type: 'object'
      properties:
        crt:
          type: 'string'
          description: 'Base64 encoded certificates chain.'
          example: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNMSUVOVCBDRVJUSUZJQ0FURSBGSUxFIChUSElTIElTIEpVU1QgQU4gRVhBTVBMRSkKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KU0VSVkVSIENFUlRJRklDQVRFIEZJTEUgKFRISVMgSVMgSlVTVCBBTiBFWEFNUExFKQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t'
        clientCrt:
          type: 'string'
          description: 'Base64 encoded client certificate.'
          example: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNMSUVOVCBDRVJUSUZJQ0FURSBGSUxFIChUSElTIElTIEpVU1QgQU4gRVhBTVBMRSkKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KU0VSVkVSIENFUlRJRklDQVRFIEZJTEUgKFRISVMgSVMgSlVTVCBBTiBFWEFNUExFKQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t'
        caCrt:
          type: 'string'
          description: 'Base64 encoded CA certificate.'
          example: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCkNMSUVOVCBDRVJUSUZJQ0FURSBGSUxFIChUSElTIElTIEpVU1QgQU4gRVhBTVBMRSkKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0KU0VSVkVSIENFUlRJRklDQVRFIEZJTEUgKFRISVMgSVMgSlVTVCBBTiBFWEFNUExFKQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t'
externalDocs:
  description: ''
  url: 'https://api.extend.sap.cx/public/v1'`;
