export default `
swagger: "2.0"
info:
  version: 1.0.0
  title: Swagger Petstore
  description: A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification
  termsOfService: http://swagger.io/terms/
  contact:
    name: Swagger API Team
    email: apiteam@swagger.io
    url: http://swagger.io
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
host: petstore.swagger.io
basePath: /api
schemes:
  - http
consumes:
  - application/json
produces:
  - application/json
paths:
  /pets:
    get:
      description: |
        Returns all pets from the system that the user has access to
      operationId: findPets
      parameters:
        - name: tags
          in: query
          description: tags to filter by
          required: false
          type: array
          collectionFormat: csv
          items:
            type: string
        - name: limit
          in: query
          description: maximum number of results to return
          required: false
          type: integer
          format: int32
      responses:
        "200":
          description: pet response
          schema:
            type: array
            items:
              $ref: '#/definitions/Pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
    post:
      description: Creates a new pet in the store.  Duplicates are allowed
      operationId: addPet
      parameters:
        - name: pet
          in: body
          description: Pet to add to the store
          required: true
          schema:
            $ref: '#/definitions/NewPet'
      responses:
        "200":
          description: pet response
          schema:
            $ref: '#/definitions/Pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
  /pets/{id}:
    get:
      description: Returns a user based on a single ID, if the user does not have access to the pet
      operationId: find pet by id
      parameters:
        - name: id
          in: path
          description: ID of pet to fetch
          required: true
          type: integer
          format: int64
      responses:
        "200":
          description: pet response
          schema:
            $ref: '#/definitions/Pet'
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
    delete:
      description: deletes a single pet based on the ID supplied
      operationId: deletePet
      parameters:
        - name: id
          in: path
          description: ID of pet to delete
          required: true
          type: integer
          format: int64
      responses:
        "204":
          description: pet deleted
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/Error'
definitions:
  Pet:
    allOf:
      - $ref: '#/definitions/NewPet'
      - required:
        - id
        type: "object"
        properties:
          id:
            type: integer
            format: int64

  NewPet:
    type: "object"
    required:
      - name  
    properties:
      name:
        type: string
      tag:
        type: string    

  Error:
    type: "object"
    required:
      - code
      - message
    properties:
      code:
        type: integer
        format: int32
      message:
        type: string
`;
