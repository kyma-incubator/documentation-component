// https://github.com/SAP-samples/xf-application-mocks/blob/master/commerce-mock/apis/warehousingwebservices.yaml

export default `swagger: "2.0"
info:
  description: "Warehousing Webservices Version 2"
  version: "6.5.0"
  title: "Order Management Module V2"
tags:
  - name: "warehousing-stock-levels-controller"
    description: "Stock Level's Operations"
  - name: "warehousing-warehouses-controller"
    description: "Warehouse's Operations"
  - name: "warehousing-asns-controller"
    description: "Advanced Shipping Notice's Operations"
  - name: "warehousing-base-stores-controller"
    description: "Base Store's Operations"
  - name: "warehousing-orders-controller"
    description: "Order's Operations"
  - name: "warehousing-point-of-services-controller"
    description: "Point of Service Operations"
  - name: "warehousing-returns-controller"
    description: "Return's Operations"
  - name: "warehousing-consignments-controller"
    description: "Consignment's Operations"
basePath: "/warehousingwebservices"
paths:
  /asns:
    post:
      tags:
        - "warehousing-asns-controller"
      summary: "Creates an advanced shipping notice"
      operationId: "createAsnUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "asnWsDTO"
          description: "AsnWsDTO containing information about the asn to be created"
          required: true
          schema:
            $ref: "#/definitions/AsnWsDTO"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/definitions/AsnWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /asns/{internalId}/cancel:
    post:
      tags:
        - "warehousing-asns-controller"
      summary: "Cancels an advanced shipping notice"
      operationId: "cancelAsnUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "internalId"
          in: "path"
          description: "Internal Id for the advanced shipping notice to be confirmed"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        201:
          description: "Created"
        202:
          description: "Accepted"
          schema:
            $ref: "#/definitions/AsnWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /asns/{internalId}/confirm-receipt:
    post:
      tags:
        - "warehousing-asns-controller"
      summary: "Confirms the receipt of an advanced shipping notice"
      operationId: "confirmAsnReceiptUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "internalId"
          in: "path"
          description: "Internal Id for the advanced shipping notice to be confirmed"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/AsnWsDTO"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /basestores/{uid}/pointofservices:
    get:
      tags:
        - "warehousing-base-stores-controller"
      summary: "Finds a paginated list of point of services per a given base store"
      operationId: "getPointsOfServiceForBaseStoreIdUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "uid"
          in: "path"
          description: "The id of the base store"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/PointOfServiceSearchPageWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /basestores/{uid}/warehouses:
    get:
      tags:
        - "warehousing-base-stores-controller"
      summary: "Finds a paginated list of warehouses per a given base store"
      operationId: "getWarehousesForBaseStoreIdUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "uid"
          in: "path"
          description: "The id of the base store"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/WarehouseSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a paginated list of consignments"
      operationId: "getConsignmentsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ConsignmentSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/consolidated-pick:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to pick multiple Consignments and generate a consolidated Pick Slip"
      operationId: "consolidatedPickConsignmentsUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - in: "body"
          name: "consignmentCodes"
          description: "The ConsignmentsCodesWsDTO which contains the Consignment codes"
          required: true
          schema:
            $ref: "#/definitions/ConsignmentCodesWsDTO"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/decline-reasons:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a list of all decline reasons"
      operationId: "getDeclineReasonsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/DeclineReasonListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/status/{consignmentStatuses}:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a paginated list of consignments for a given consignment status"
      description: "Consignment status is case sensitive"
      operationId: "getConsignmentsByStatusUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "consignmentStatuses"
          in: "path"
          description: "Consignment status"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ConsignmentSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/statuses:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a list of all consignment's statuses"
      operationId: "getConsignmentStatusesUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ConsignmentStatusListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a consignment by a given consignment code"
      operationId: "getConsignmentForCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ConsignmentWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/confirm-pickup:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Confirms a consignment's pickup for a given consignment code"
      operationId: "confirmPickupConsignmentUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/confirm-shipping:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Confirms a consignment's shipping for a given consignment code"
      operationId: "confirmShipConsignmentUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/entries:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a paginated list of consignment entries for a given consignment code"
      operationId: "getConsignmentEntriesForConsignmentCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ConsignmentEntrySearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/export-form:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to ge the Export Form for a given Consignment"
      operationId: "getExportFormUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/is-confirmable:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Checks if a consignment can be confirmed"
      operationId: "isConsignmentConfirmableUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "boolean"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/manual/capture-payment:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Moves a consignment out of the waiting step after the payment capture has failed."
      operationId: "manuallyReleasePaymentCaptureUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/manual/commit-tax:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Moves a consignment out of the waiting step after a tax commit has failed"
      operationId: "manuallyReleaseTaxCommitUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/pack:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to pack a given Consignment and optionally generate its Pack Label"
      operationId: "packConsignmentUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
        - name: "printSlip"
          in: "query"
          description: "Flag for backwards compatibility. Used to check if the pack label will be generated"
          required: false
          type: "boolean"
          default: true
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/packaging-info:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds the packaging information for the given consignment code"
      operationId: "getPackagingInfoUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/PackagingInfoWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
    put:
      tags:
        - "warehousing-consignments-controller"
      summary: "Updates a consignment's packaging information"
      operationId: "updatePackagingInfoUsingPUT"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "packagingInfo"
          description: "The PackagingInfoWsDTO to update the consignment with"
          required: true
          schema:
            $ref: "#/definitions/PackagingInfoWsDTO"
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ConsignmentWsDTO"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/pick:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to pick a given Consignment and optionally generate its Pick Slip"
      operationId: "pickConsignmentUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
        - name: "printSlip"
          in: "query"
          description: "Flag for backwards compatibility. Used to check if the pick slip will be generated "
          required: false
          type: "boolean"
          default: true
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/reallocate:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Reallocates a given consignment"
      operationId: "reallocateConsignmentUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "consignmentReallocationWsDTO"
          description: "The ConsignmentReallocationWsDTO containing entries to be reallocated"
          required: true
          schema:
            $ref: "#/definitions/ConsignmentReallocationWsDTO"
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/return-form:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to get the Return form for a given Consignment"
      operationId: "getReturnFormUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/return-shipping-label:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to get the Return Shipping Label for a given Consignment"
      operationId: "getReturnShippingLabelUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/shipping-label:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to get the Shipping Label for a given Consignment"
      operationId: "getShippingLabelUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "string"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/sourcing-locations:
    get:
      tags:
        - "warehousing-consignments-controller"
      summary: "Finds a paginated list of sourcing locations for a given consignment code"
      operationId: "getSourcingLocationsForConsignmentCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The consignment code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/WarehouseSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /consignments/{code}/take-payment:
    post:
      tags:
        - "warehousing-consignments-controller"
      summary: "Request to take a payment for a given Consignment"
      operationId: "takePaymentUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Code corresponding to the desired consignment"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/PaymentTransactionEntryWsDTO"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/on-hold:
    post:
      tags:
        - "warehousing-orders-controller"
      summary: "Puts an order on hold"
      operationId: "putOrderOnHoldUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/re-source:
    post:
      tags:
        - "warehousing-orders-controller"
      summary: "Resources an order"
      operationId: "reSourceUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /pointofservices/{name}:
    get:
      tags:
        - "warehousing-point-of-services-controller"
      summary: "Finds one point of service by name"
      operationId: "getPointOfServiceByNameUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "name"
          in: "path"
          description: "The name of the point of service to be fetched"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/PointOfServiceWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /pointofservices/{pointOfServiceName}/address:
    put:
      tags:
        - "warehousing-point-of-services-controller"
      summary: "Updates point of service with an address"
      operationId: "updatePointOfServiceWithAddressUsingPUT"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "address"
          description: "The AddressWsDTO object to update the point of service with"
          required: true
          schema:
            $ref: "#/definitions/AddressWsDTO"
        - name: "pointOfServiceName"
          in: "path"
          description: "The name of the point of service"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/PointOfServiceWsDTO"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /pointofservices/{pointOfServiceName}/warehouses:
    get:
      tags:
        - "warehousing-point-of-services-controller"
      summary: "Finds a paginated list of warehouses per given point of service"
      operationId: "getWarehousesForPointOfServiceUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "pointOfServiceName"
          in: "path"
          description: "The name of the point of service"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/WarehouseSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
    post:
      tags:
        - "warehousing-point-of-services-controller"
      summary: "Updates a point of service with a list of warehouse codes"
      description: "It takes one or more valid warehouse code to update the given point of service with"
      operationId: "updatePointOfServiceWithWarehousesUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "warehouseCodes"
          description: "The WarehouseCodesWsDto that contains a list of valid warehouse codes"
          required: true
          schema:
            $ref: "#/definitions/WarehouseCodesWsDto"
        - name: "pointOfServiceName"
          in: "path"
          description: "The name of the point of service"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/PointOfServiceWsDTO"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /pointofservices/{pointOfServiceName}/warehouses/{warehouseCode}:
    delete:
      tags:
        - "warehousing-point-of-services-controller"
      summary: "Request to delete a warehouse from point of service"
      operationId: "deleteWarehousesFromPointOfServiceUsingDELETE"
      consumes:
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "pointOfServiceName"
          in: "path"
          description: "The name of the point of service"
          required: true
          type: "string"
        - name: "warehouseCode"
          in: "path"
          description: "The code of the warehouse to be deleted from the point of service"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        204:
          description: "No Content"
          schema:
            $ref: "#/definitions/PointOfServiceWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
  /returns/{code}/accept-goods:
    post:
      tags:
        - "warehousing-returns-controller"
      summary: "Request to accept returned goods"
      operationId: "acceptReturnedGoodsUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return code to be accepted"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /stocklevels:
    post:
      tags:
        - "warehousing-stock-levels-controller"
      summary: "Creates a stocklevel"
      operationId: "createStockLevelUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "stockLevelWsDto"
          description: "The stocklevel object to be created"
          required: true
          schema:
            $ref: "#/definitions/StockLevelWsDto"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/definitions/StockLevelWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /stocklevels/adjustment-reasons:
    get:
      tags:
        - "warehousing-stock-levels-controller"
      summary: "Finds all adjustment reasons"
      operationId: "getStockLevelAdjustmentReasonsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/StockLevelAdjustmentReasonsWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /stocklevels/product/{productCode}/warehouse/{warehouseCode}/adjustment:
    post:
      tags:
        - "warehousing-stock-levels-controller"
      summary: "Creates an inventoryEvent to adjust a specific stocklevel"
      operationId: "createStockLevelAdjustmentUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "productCode"
          in: "path"
          description: "Product Code"
          required: true
          type: "string"
        - name: "warehouseCode"
          in: "path"
          description: "Warehouse Code"
          required: true
          type: "string"
        - name: "binCode"
          in: "query"
          description: "Bin Code"
          required: false
          type: "string"
        - name: "releaseDate"
          in: "query"
          description: "Release Date"
          required: false
          type: "string"
        - in: "body"
          name: "stockLevelAdjustmentsWsDTO"
          description: "List of stockLevel Adjustments"
          required: true
          schema:
            $ref: "#/definitions/StockLevelAdjustmentsWsDTO"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/definitions/StockLevelAdjustmentsWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /stocklevels/warehouses/{code}:
    get:
      tags:
        - "warehousing-stock-levels-controller"
      summary: "Finds a paginated list of stock levels by a given warehouse code"
      operationId: "getStockLevelsForWarehouseCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The code for the warehouse"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Page size"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Sort parameter"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/StockLevelSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /warehouses/{code}:
    get:
      tags:
        - "warehousing-warehouses-controller"
      summary: "Finds a warehouse by the given code"
      description: "It returns a warehouse for the given code, the given warehouse code should be valid"
      operationId: "getWarehouseForCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "The code of the requested warehouse"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/WarehouseWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /authorizationserver/oauth/token:
    post:
      summary: "Get OAuth2 access token"
      description: "Returns the acess token for Kyma"
      consumes:
        - "application/x-www-form-urlencoded"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "parameters"
          description: "List of Component identifiers"
          required: true
          schema:
            type: "object"
            properties:
              client_id:
                type: "string"
              client_secret:
                type: "string"
              grant_type:
                type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "object"
            properties:
              access_token_url:
                type: "string"
            default:
              token: "3333"
        404:
          description: "Not Found"
definitions:
  AddressWsDTO:
    type: "object"
    properties:
      companyName:
        type: "string"
      country:
        $ref: "#/definitions/CountryWsDTO"
      defaultAddress:
        type: "boolean"
      email:
        type: "string"
      firstName:
        type: "string"
      formattedAddress:
        type: "string"
      id:
        type: "string"
      lastName:
        type: "string"
      line1:
        type: "string"
      line2:
        type: "string"
      phone:
        type: "string"
      postalCode:
        type: "string"
      region:
        $ref: "#/definitions/RegionWsDTO"
      shippingAddress:
        type: "boolean"
      title:
        type: "string"
      titleCode:
        type: "string"
      town:
        type: "string"
      visibleInAddressBook:
        type: "boolean"
  AsnEntryWsDTO:
    type: "object"
    properties:
      productCode:
        type: "string"
      quantity:
        type: "integer"
        format: "int32"
  AsnWsDTO:
    type: "object"
    properties:
      asnEntries:
        type: "array"
        items:
          $ref: "#/definitions/AsnEntryWsDTO"
      comment:
        type: "string"
      externalId:
        type: "string"
      internalId:
        type: "string"
      pointOfServiceName:
        type: "string"
      releaseDate:
        type: "string"
        format: "date-time"
      status:
        type: "string"
      warehouseCode:
        type: "string"
  BaseOptionWsDTO:
    type: "object"
    properties:
      options:
        type: "array"
        items:
          $ref: "#/definitions/VariantOptionWsDTO"
      selected:
        $ref: "#/definitions/VariantOptionWsDTO"
      variantType:
        type: "string"
  CategoryWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      image:
        $ref: "#/definitions/ImageWsDTO"
      url:
        type: "string"
  ClassificationWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      features:
        type: "array"
        items:
          $ref: "#/definitions/FeatureWsDTO"
      name:
        type: "string"
  ConfigurationInfoWsDTO:
    type: "object"
    properties:
      configurationLabel:
        type: "string"
      configurationValue:
        type: "string"
      configuratorType:
        type: "string"
      status:
        type: "string"
  ConsignmentCodesWsDTO:
    type: "object"
    properties:
      codes:
        type: "array"
        items:
          type: "string"
  ConsignmentEntrySearchPageWsDto:
    type: "object"
    properties:
      consignmentEntries:
        type: "array"
        items:
          $ref: "#/definitions/ConsignmentEntryWsDTO"
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  ConsignmentEntryWsDTO:
    type: "object"
    properties:
      orderEntry:
        $ref: "#/definitions/OrderEntryWsDTO"
      quantity:
        type: "integer"
        format: "int64"
      quantityDeclined:
        type: "integer"
        format: "int64"
      quantityPending:
        type: "integer"
        format: "int64"
      quantityShipped:
        type: "integer"
        format: "int64"
      shippedQuantity:
        type: "integer"
        format: "int64"
  ConsignmentReallocationWsDTO:
    type: "object"
    properties:
      declineEntries:
        type: "array"
        items:
          $ref: "#/definitions/DeclineEntryWsDTO"
      globalComment:
        type: "string"
      globalReallocationWarehouseCode:
        type: "string"
      globalReason:
        type: "string"
  ConsignmentSearchPageWsDto:
    type: "object"
    properties:
      consignments:
        type: "array"
        items:
          $ref: "#/definitions/ConsignmentWsDTO"
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  ConsignmentStatusListWsDTO:
    type: "object"
    properties:
      statuses:
        type: "array"
        items:
          type: "string"
  ConsignmentWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      deliveryMode:
        $ref: "#/definitions/DeliveryModeWsDTO"
      deliveryPointOfService:
        $ref: "#/definitions/PointOfServiceWsDTO"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/ConsignmentEntryWsDTO"
      orderCode:
        type: "string"
      packagingInfo:
        $ref: "#/definitions/PackagingInfoWsDTO"
      shippingAddress:
        $ref: "#/definitions/AddressWsDTO"
      shippingDate:
        type: "string"
        format: "date-time"
      status:
        type: "string"
      statusDate:
        type: "string"
        format: "date-time"
      trackingID:
        type: "string"
      warehouseCode:
        type: "string"
  CountryWsDTO:
    type: "object"
    properties:
      isocode:
        type: "string"
      name:
        type: "string"
  CurrencyWsDTO:
    type: "object"
    properties:
      active:
        type: "boolean"
      isocode:
        type: "string"
      name:
        type: "string"
      symbol:
        type: "string"
  DeclineEntryWsDTO:
    type: "object"
    properties:
      comment:
        type: "string"
      productCode:
        type: "string"
      quantity:
        type: "integer"
        format: "int64"
      reallocationWarehouseCode:
        type: "string"
      reason:
        type: "string"
  DeclineReasonListWsDTO:
    type: "object"
    properties:
      reasons:
        type: "array"
        items:
          type: "string"
  DeliveryModeWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      deliveryCost:
        $ref: "#/definitions/PriceWsDTO"
      description:
        type: "string"
      name:
        type: "string"
  FeatureUnitWsDTO:
    type: "object"
    properties:
      name:
        type: "string"
      symbol:
        type: "string"
      unitType:
        type: "string"
  FeatureValueWsDTO:
    type: "object"
    properties:
      value:
        type: "string"
  FeatureWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      comparable:
        type: "boolean"
      description:
        type: "string"
      featureUnit:
        $ref: "#/definitions/FeatureUnitWsDTO"
      featureValues:
        type: "array"
        items:
          $ref: "#/definitions/FeatureValueWsDTO"
      name:
        type: "string"
      range:
        type: "boolean"
      type:
        type: "string"
  FutureStockWsDTO:
    type: "object"
    properties:
      date:
        type: "string"
        format: "date-time"
      formattedDate:
        type: "string"
      stock:
        $ref: "#/definitions/StockWsDTO"
  GeoPointWsDTO:
    type: "object"
    properties:
      latitude:
        type: "number"
        format: "double"
      longitude:
        type: "number"
        format: "double"
  ImageWsDTO:
    type: "object"
    properties:
      altText:
        type: "string"
      format:
        type: "string"
      galleryIndex:
        type: "integer"
        format: "int32"
      imageType:
        type: "string"
        enum:
          - "PRIMARY"
          - "GALLERY"
      url:
        type: "string"
  LanguageWsDTO:
    type: "object"
    properties:
      active:
        type: "boolean"
      isocode:
        type: "string"
      name:
        type: "string"
      nativeName:
        type: "string"
  OpeningScheduleWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      name:
        type: "string"
      specialDayOpeningList:
        type: "array"
        items:
          $ref: "#/definitions/SpecialOpeningDayWsDTO"
      weekDayOpeningList:
        type: "array"
        items:
          $ref: "#/definitions/WeekdayOpeningDayWsDTO"
  OrderEntryWsDTO:
    type: "object"
    properties:
      basePrice:
        $ref: "#/definitions/PriceWsDTO"
      configurationInfos:
        type: "array"
        items:
          $ref: "#/definitions/ConfigurationInfoWsDTO"
      deliveryMode:
        $ref: "#/definitions/DeliveryModeWsDTO"
      deliveryPointOfService:
        $ref: "#/definitions/PointOfServiceWsDTO"
      entryNumber:
        type: "integer"
        format: "int32"
      product:
        $ref: "#/definitions/ProductWsDTO"
      quantity:
        type: "integer"
        format: "int64"
      quantityAllocated:
        type: "integer"
        format: "int64"
      quantityCancelled:
        type: "integer"
        format: "int64"
      quantityPending:
        type: "integer"
        format: "int64"
      quantityReturned:
        type: "integer"
        format: "int64"
      quantityShipped:
        type: "integer"
        format: "int64"
      quantityUnallocated:
        type: "integer"
        format: "int64"
      totalPrice:
        $ref: "#/definitions/PriceWsDTO"
      updateable:
        type: "boolean"
      url:
        type: "string"
  PackagingInfoWsDTO:
    type: "object"
    properties:
      dimensionUnit:
        type: "string"
      grossWeight:
        type: "string"
      height:
        type: "string"
      insuredValue:
        type: "string"
      length:
        type: "string"
      weightUnit:
        type: "string"
      width:
        type: "string"
  PaginationWsDTO:
    type: "object"
    properties:
      currentPage:
        type: "integer"
        format: "int32"
      pageSize:
        type: "integer"
        format: "int32"
      sort:
        type: "string"
      totalPages:
        type: "integer"
        format: "int32"
      totalResults:
        type: "integer"
        format: "int64"
  PaymentTransactionEntryWsDTO:
    type: "object"
    properties:
      amount:
        type: "number"
      code:
        type: "string"
      currencyIsocode:
        type: "string"
      requestId:
        type: "string"
      requestToken:
        type: "string"
      subscriptionID:
        type: "string"
      time:
        type: "string"
        format: "date-time"
      transactionStatus:
        type: "string"
      transactionStatusDetails:
        type: "string"
      type:
        type: "string"
      versionID:
        type: "string"
  PointOfServiceSearchPageWsDTO:
    type: "object"
    properties:
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      pointsOfService:
        type: "array"
        items:
          $ref: "#/definitions/PointOfServiceWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  PointOfServiceWsDTO:
    type: "object"
    properties:
      address:
        $ref: "#/definitions/AddressWsDTO"
      description:
        type: "string"
      displayName:
        type: "string"
      distanceKm:
        type: "number"
        format: "double"
      features:
        type: "object"
        additionalProperties:
          type: "string"
      formattedDistance:
        type: "string"
      geoPoint:
        $ref: "#/definitions/GeoPointWsDTO"
      mapIcon:
        $ref: "#/definitions/ImageWsDTO"
      name:
        type: "string"
      openingHours:
        $ref: "#/definitions/OpeningScheduleWsDTO"
      storeContent:
        type: "string"
      storeImages:
        type: "array"
        items:
          $ref: "#/definitions/ImageWsDTO"
      url:
        type: "string"
      warehouseCodes:
        type: "array"
        items:
          type: "string"
  PriceRangeWsDTO:
    type: "object"
    properties:
      maxPrice:
        $ref: "#/definitions/PriceWsDTO"
      minPrice:
        $ref: "#/definitions/PriceWsDTO"
  PriceWsDTO:
    type: "object"
    properties:
      currencyIso:
        type: "string"
      formattedValue:
        type: "string"
      maxQuantity:
        type: "integer"
        format: "int64"
      minQuantity:
        type: "integer"
        format: "int64"
      priceType:
        type: "string"
        enum:
          - "BUY"
          - "FROM"
      value:
        type: "number"
  ProductReferenceWsDTO:
    type: "object"
    properties:
      description:
        type: "string"
      preselected:
        type: "boolean"
      quantity:
        type: "integer"
        format: "int32"
      referenceType:
        type: "string"
      target:
        $ref: "#/definitions/ProductWsDTO"
  ProductWsDTO:
    type: "object"
    properties:
      availableForPickup:
        type: "boolean"
      averageRating:
        type: "number"
        format: "double"
      baseOptions:
        type: "array"
        items:
          $ref: "#/definitions/BaseOptionWsDTO"
      baseProduct:
        type: "string"
      categories:
        type: "array"
        items:
          $ref: "#/definitions/CategoryWsDTO"
      classifications:
        type: "array"
        items:
          $ref: "#/definitions/ClassificationWsDTO"
      code:
        type: "string"
      configurable:
        type: "boolean"
      configuratorType:
        type: "string"
      description:
        type: "string"
      futureStocks:
        type: "array"
        items:
          $ref: "#/definitions/FutureStockWsDTO"
      images:
        type: "array"
        items:
          $ref: "#/definitions/ImageWsDTO"
      manufacturer:
        type: "string"
      multidimensional:
        type: "boolean"
      name:
        type: "string"
      numberOfReviews:
        type: "integer"
        format: "int32"
      potentialPromotions:
        type: "array"
        items:
          $ref: "#/definitions/PromotionWsDTO"
      price:
        $ref: "#/definitions/PriceWsDTO"
      priceRange:
        $ref: "#/definitions/PriceRangeWsDTO"
      productReferences:
        type: "array"
        items:
          $ref: "#/definitions/ProductReferenceWsDTO"
      purchasable:
        type: "boolean"
      reviews:
        type: "array"
        items:
          $ref: "#/definitions/ReviewWsDTO"
      stock:
        $ref: "#/definitions/StockWsDTO"
      summary:
        type: "string"
      tags:
        type: "array"
        items:
          type: "string"
      url:
        type: "string"
      variantMatrix:
        type: "array"
        items:
          $ref: "#/definitions/VariantMatrixElementWsDTO"
      variantOptions:
        type: "array"
        items:
          $ref: "#/definitions/VariantOptionWsDTO"
      variantType:
        type: "string"
      volumePrices:
        type: "array"
        items:
          $ref: "#/definitions/PriceWsDTO"
      volumePricesFlag:
        type: "boolean"
  PromotionRestrictionWsDTO:
    type: "object"
    properties:
      description:
        type: "string"
      restrictionType:
        type: "string"
  PromotionWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      couldFireMessages:
        type: "array"
        items:
          type: "string"
      description:
        type: "string"
      enabled:
        type: "boolean"
      endDate:
        type: "string"
        format: "date-time"
      firedMessages:
        type: "array"
        items:
          type: "string"
      priority:
        type: "integer"
        format: "int32"
      productBanner:
        $ref: "#/definitions/ImageWsDTO"
      promotionGroup:
        type: "string"
      promotionType:
        type: "string"
      restrictions:
        type: "array"
        items:
          $ref: "#/definitions/PromotionRestrictionWsDTO"
      startDate:
        type: "string"
        format: "date-time"
      title:
        type: "string"
  RegionWsDTO:
    type: "object"
    properties:
      countryIso:
        type: "string"
      isocode:
        type: "string"
      isocodeShort:
        type: "string"
      name:
        type: "string"
  ReviewWsDTO:
    type: "object"
    properties:
      alias:
        type: "string"
      comment:
        type: "string"
      date:
        type: "string"
        format: "date-time"
      headline:
        type: "string"
      id:
        type: "string"
      principal:
        $ref: "#/definitions/UserWsDTO"
      rating:
        type: "number"
        format: "double"
  SortWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      name:
        type: "string"
      selected:
        type: "boolean"
  SpecialOpeningDayWsDTO:
    type: "object"
    properties:
      closed:
        type: "boolean"
      closingTime:
        $ref: "#/definitions/TimeWsDTO"
      comment:
        type: "string"
      date:
        type: "string"
        format: "date-time"
      formattedDate:
        type: "string"
      name:
        type: "string"
      openingTime:
        $ref: "#/definitions/TimeWsDTO"
  StockLevelAdjustmentReasonsWsDTO:
    type: "object"
    properties:
      reasons:
        type: "array"
        items:
          type: "string"
  StockLevelAdjustmentWsDTO:
    type: "object"
    properties:
      comment:
        type: "string"
      quantity:
        type: "integer"
        format: "int64"
      reason:
        type: "string"
  StockLevelAdjustmentsWsDTO:
    type: "object"
    properties:
      stockLevelAdjustments:
        type: "array"
        items:
          $ref: "#/definitions/StockLevelAdjustmentWsDTO"
  StockLevelSearchPageWsDto:
    type: "object"
    properties:
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
      stockLevels:
        type: "array"
        items:
          $ref: "#/definitions/StockLevelWsDto"
  StockLevelWsDto:
    type: "object"
    properties:
      bin:
        type: "string"
      inStockStatus:
        type: "string"
      initialQuantityOnHand:
        type: "integer"
        format: "int32"
      productCode:
        type: "string"
      releaseDate:
        type: "string"
        format: "date-time"
      warehouse:
        $ref: "#/definitions/WarehouseWsDto"
  StockWsDTO:
    type: "object"
    properties:
      stockLevel:
        type: "integer"
        format: "int64"
      stockLevelStatus:
        type: "string"
  TimeWsDTO:
    type: "object"
    properties:
      formattedHour:
        type: "string"
      hour:
        type: "string"
        format: "byte"
      minute:
        type: "string"
        format: "byte"
  UserWsDTO:
    type: "object"
    properties:
      currency:
        $ref: "#/definitions/CurrencyWsDTO"
      customerId:
        type: "string"
      deactivationDate:
        type: "string"
        format: "date-time"
      defaultAddress:
        $ref: "#/definitions/AddressWsDTO"
      displayUid:
        type: "string"
      firstName:
        type: "string"
      language:
        $ref: "#/definitions/LanguageWsDTO"
      lastName:
        type: "string"
      name:
        type: "string"
      title:
        type: "string"
      titleCode:
        type: "string"
      uid:
        type: "string"
  VariantCategoryWsDTO:
    type: "object"
    properties:
      hasImage:
        type: "boolean"
      name:
        type: "string"
      priority:
        type: "integer"
        format: "int32"
  VariantMatrixElementWsDTO:
    type: "object"
    properties:
      elements:
        type: "array"
        items:
          $ref: "#/definitions/VariantMatrixElementWsDTO"
      isLeaf:
        type: "boolean"
      parentVariantCategory:
        $ref: "#/definitions/VariantCategoryWsDTO"
      variantOption:
        $ref: "#/definitions/VariantOptionWsDTO"
      variantValueCategory:
        $ref: "#/definitions/VariantValueCategoryWsDTO"
  VariantOptionQualifierWsDTO:
    type: "object"
    properties:
      image:
        $ref: "#/definitions/ImageWsDTO"
      name:
        type: "string"
      qualifier:
        type: "string"
      value:
        type: "string"
  VariantOptionWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      priceData:
        $ref: "#/definitions/PriceWsDTO"
      stock:
        $ref: "#/definitions/StockWsDTO"
      url:
        type: "string"
      variantOptionQualifiers:
        type: "array"
        items:
          $ref: "#/definitions/VariantOptionQualifierWsDTO"
  VariantValueCategoryWsDTO:
    type: "object"
    properties:
      name:
        type: "string"
      sequence:
        type: "integer"
        format: "int32"
      superCategories:
        type: "array"
        items:
          $ref: "#/definitions/VariantCategoryWsDTO"
  WarehouseCodesWsDto:
    type: "object"
    properties:
      codes:
        type: "array"
        items:
          type: "string"
  WarehouseSearchPageWsDto:
    type: "object"
    properties:
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
      warehouses:
        type: "array"
        items:
          $ref: "#/definitions/WarehouseWsDto"
  WarehouseWsDto:
    type: "object"
    properties:
      code:
        type: "string"
      consignments:
        type: "array"
        items:
          $ref: "#/definitions/ConsignmentWsDTO"
      deliveryModes:
        type: "array"
        items:
          $ref: "#/definitions/DeliveryModeWsDTO"
      isDefault:
        type: "boolean"
      pointsOfServices:
        type: "array"
        items:
          $ref: "#/definitions/PointOfServiceWsDTO"
      priority:
        type: "integer"
        format: "int32"
      url:
        type: "string"
  WeekdayOpeningDayWsDTO:
    type: "object"
    properties:
      closed:
        type: "boolean"
      closingTime:
        $ref: "#/definitions/TimeWsDTO"
      openingTime:
        $ref: "#/definitions/TimeWsDTO"
      weekDay:
        type: "string"
`;
