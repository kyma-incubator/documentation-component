export default `{
  "openapi": "3.0.0",
  "info": {
    "description": "SAP Fieldglass APIs",
    "version": "1.0.0",
    "title": "SAP Fieldglass APIs"
  },
  "paths": {
    "/api/vc/connector/jobseeker": {
      "post": {
        "summary": "Push Job Seeker",
        "description": "The following method posts job seeker data",
        "parameters": [],
        "operationId": "",
        "responses": {
          "200": {
            "description": "The request was received successfully."
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {},
              "example": {
                "HumanResource": {
                  "@xmlns": "jobSeeker",
                  "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                  "@xsi:schemaLocation": "jobSeeker https://localhost/schema/InSiteJobSeeker.xsd",
                  "HumanResourceId": {
                    "@validFrom": "2018-03-12",
                    "@validTo": "2018-11-01",
                    "IdValue": null,
                    "ExternalReferenceId": "External Candidate ID 5",
                    "EntityContactInfo": {
                      "PersonName": {
                        "LegalName ": "REST_ABC1"
                      }
                    }
                  },
                  "ReferenceInformation": {
                    "StaffingSupplierId": {
                      "IdValue": "ABC1"
                    },
                    "StaffingCustomerId": {
                      "IdValue": "FGFL"
                    },
                    "OrderId": {
                      "IdValue": "FGFLJP00000010"
                    },
                    "RemitToAddress": null
                  },
                  "ResourceInformation": {
                    "EntityContactInfo": {
                      "PersonName": {
                        "LegalName": "Pascal White",
                        "FirstName": "Pascal",
                        "LastName": "White"
                      },
                      "UserName": null,
                      "SecurityId": "05179908PW",
                      "ContactMethod": {
                        "InternetEmailAddress ": "testworker@sap.com"
                      }
                    },
                    "AvailabilityDate": {
                      "AvailabilityStartDate": "2018-03-05"
                    }
                  },
                  "Rates": [{
                      "@rateType": "bill",
                      "@rateStatus": "agreed",
                      "BillAmount": {
                        "@rateAmountPeriod": "Hr",
                        "@currency": "USD",
                        "$": "60.00"
                      },
                      "MinBillAmount": "40.00",
                      "MaxBillAmount": "60.00",
                      "PayAmount": {
                        "@rateAmountPeriod": "Hr",
                        "@currency": "USD",
                        "$": "50.00"
                      },
                      "Class": "ST",
                      "Markup": null,
                      "Factor": null,
                      "BaseClass": null
                    },
                    {
                      "@rateType": "bill",
                      "@rateStatus": "agreed",
                      "BillAmount": {
                        "@rateAmountPeriod": "Hr",
                        "@currency": "USD",
                        "$": "90.00"
                      },
                      "MinBillAmount": "60.00",
                      "MaxBillAmount": "90.00",
                      "PayAmount": {
                        "@rateAmountPeriod": "Hr",
                        "@currency": "USD",
                        "$": "75.00"
                      },
                      "Class": "OT",
                      "Markup": null,
                      "Factor": "1.500",
                      "BaseClass": "ST"
                    },
                    {
                      "@rateType": "bill",
                      "@rateStatus": "agreed",
                      "BillAmount": {
                        "@rateAmountPeriod": "Hr",
                        "@currency": "USD",
                        "$": "120.00"
                      },
                      "MinBillAmount": "80.00",
                      "MaxBillAmount": "120.00",
                      "PayAmount": {
                        "@rateAmountPeriod": "Hr",
                        "@currency": "USD",
                        "$": "100.00"
                      },
                      "Class": "DT",
                      "Markup": null,
                      "Factor": "2.000",
                      "BaseClass": "ST"
                    }
                  ],
                  "CustomFields": {
                    "CustomField": [{
                        "@name": "Preferred Interview Date",
                        "@mandatory": "no",
                        "@type": "xsd:date",
                        "Value": "03-05-2018",
                        "Class": "JobSeeker"
                      },
                      {
                        "@name": "Describe any additional skills",
                        "@mandatory": "no",
                        "@type": "xsd:string",
                        "Value": "I have 5 years of experience with data applications",
                        "Class": "JobSeeker"
                      },
                      {
                        "@name": "If candidate is from a sub-vendor, please enter sub-vendor zip code",
                        "@mandatory": "no",
                        "@type": "xsd:numeric",
                        "Value": "60606",
                        "Class": "JobSeeker"
                      },
                      {
                        "@name": "Previous experience working for FGFL as a contractor?",
                        "@mandatory": "yes",
                        "@type": "xsd:pickList",
                        "pickList": {
                          "@isCompleteList": "yes",
                          "@totalNumberOfItems": "2",
                          "item": [
                            "No",
                            "Yes"
                          ]
                        },
                        "Value": "No",
                        "Class": "JobSeeker"
                      }
                    ]
                  },
                  "Quals": {
                    "Qual": [{
                        "@name": "4-Year Degree",
                        "@mandatory": "no",
                        "@type": "xsd:Boolean",
                        "Boolean": "true"
                      },
                      {
                        "@name": "Microsoft Office",
                        "@mandatory": "no",
                        "@type": "xsd:Ratings",
                        "Ratings": "4"
                      },
                      {
                        "@name": "Related Experience with Data",
                        "@mandatory": "no",
                        "@type": "xsd:Years",
                        "Years": "4"
                      },
                      {
                        "@name": "Relevant Work Experience (Years)",
                        "@mandatory": "no",
                        "@type": "xsd:Ratings and Years",
                        "Ratings": "5",
                        "Years": "8"
                      },
                      {
                        "@name": "Lean/Six Sigma Green Belt",
                        "@mandatory": "no",
                        "@type": "xsd:Certification",
                        "Certification": {
                          "CertificationName": {
                            "@label": "Certificate Number",
                            "$": "10001"
                          },
                          "StartDate": {
                            "@label": "Date Issued",
                            "$": "2016-01-01"
                          },
                          "EndDate": {
                            "@label": "Date Ended",
                            "$": "2018-12-05"
                          }
                        }
                      }
                    ]
                  },
                  "HumanResourceComments": "",
                  "Profile": {
                    "Resume": {
                      "NonXMLResume": {
                        "TextResume": "BRi0xwYWNlL0y3Vi9MCAw [base64 encoded document]",
                        "SupportingMaterials": {
                          "AttachmentReference": {
                            "@mimeType": "application/pdf",
                            "$": "resume.pdf"
                          }
                        }
                      }
                    },
                    "AdditionalAttachment": {
                      "NonXMLAttachment": [{
                          "TextAttachment": "VBERi0xLjKNCAw [base64 encoded document]",
                          "SupportingMaterials": {
                            "AttachmentReference": {
                              "@mimeType": "application/pdf",
                              "$": "Additional doc 1.pdf"
                            }
                          }
                        },
                        {
                          "TextAttachment": "VBERi0xLjQKJe [base64 encoded document]",
                          "SupportingMaterials": {
                            "AttachmentReference": {
                              "@mimeType": "application/pdf",
                              "$": "Additional doc 2.pdf"
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/vc/connector/jobposting": {
      "get": {
        "summary": "Get Job Posting",
        "description": "The following method retrieves detail for a Job Posting ID",
        "parameters": [{
          "name": "object_ref",
          "in": "query",
          "required": true,
          "schema": {
            "type": "string"
          },
          "description": "SAP Fieldglass unique job posting identifier."
        }],
        "operationId": "",
        "responses": {
          "200": {
            "description": "The request was received successfully.",
            "content": {
              "application/json": {
                "schema": {},
                "examples": {
                  "StaffingOrder": {
                    "$ref": "#/components/examples/StaffingOrder"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "post": {
        "summary": "Push Job Posting",
        "description": "The following method posts job posting data",
        "parameters": [],
        "operationId": "",
        "responses": {
          "200": {
            "description": "The request was received successfully."
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {},
              "examples": {
                "StaffingOrder": {
                  "$ref": "#/components/examples/StaffingOrder"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "examples": {
      "StaffingOrder": {
        "value": {
          "StaffingOrder": {
            "@xmlns": "jobPosting",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "@xsi:schemaLocation": "jobPosting https://train1.fgvms.com/schema/InSiteJobPostingV2.xsd",
            "OrderId": {
              "@validFrom": "2018-05-09",
              "@validTo": "2018-05-31",
              "IdValue": "FGFLJP00000123",
              "Status": "Submitted"
            },
            "ReferenceInformation": {
              "StaffingSupplierId": {
                "IdValue": "T123"
              },
              "StaffingCustomerId": {
                "IdValue": "FGFL"
              }
            },
            "BusinessUnit": "BU - 001",
            "ClosedReasonName": null,
            "OrderClassification": {
              "@orderType": "JavaScript Developer IV",
              "@orderStatus": "new"
            },
            "Comments": {
              "Comment": null,
              "CreatorName": null,
              "CreateTime": null
            },
            "OrderContact": {
              "@contactType": "placedBy",
              "ContactInfo": {
                "PersonName": {
                  "LegalName": "hiringManager_username",
                  "FormattedName": "Smith, Jane"
                }
              }
            },
            "RequiredResponseDate": "2018-05-09",
            "PositionQuantity": "1",
            "MaxSubmissionsAllowed": "0",
            "CanSubmitJobSeeker": "yes",
            "StaffingPosition": {
              "PositionHeader": {
                "PositionTitle": "JavaScript Developer IV",
                "FormattedPositionDescription": {
                  "Value": "We're looking for a developer with great skills."
                }
              },
              "PrimaryDepartment": "Human Resources (HR)",
              "Departments": {
                "Department": {
                  "Code": "8701-00",
                  "Name": "Human Resources (HR)",
                  "Allocation": "100.000"
                }
              },
              "PositionDateRange": {
                "StartDate": "2018-05-09",
                "ExpectedEndDate": "2018-05-31",
                "CreateDate": "2018-05-09",
                "SubmitDate": "2018-05-09",
                "ClosedDate": null
              },
              "ServiceType": "Temp",
              "JobType": "Full Time",
              "ReportToPerson": {
                "ContactInfo": {
                  "PersonName": {
                    "LegalName": "hiringManager_username",
                    "FormattedName": "Smith, Jane"
                  }
                }
              },
              "Coordinator": {
                "ContactInfo": {
                  "PersonName": {
                    "LegalName": null,
                    "FormattedName": null
                  }
                }
              },
              "Distributor": {
                "ContactInfo": {
                  "PersonName": {
                    "LegalName": null,
                    "FormattedName": null
                  }
                }
              },
              "WorkSite": {
                "WorkSiteId": {
                  "Id": "US-CO-Denver"
                },
                "Address": "111 N. Canal",
                "Address2": "Street",
                "City": "Denver",
                "StateCode": "CO",
                "PostalCode": "54009"
              },
              "Rates": [{
                  "@rateType": "pay",
                  "@rateStatus": "agreed",
                  "BillAmount": {
                    "@rateAmountPeriod": "Hr",
                    "@currency": "USD",
                    "$": "124.20"
                  },
                  "MinBillAmount": "108.68",
                  "MaxBillAmount": "124.20",
                  "PayAmount": {
                    "@rateAmountPeriod": "Hr",
                    "@currency": "USD",
                    "$": "80.00"
                  },
                  "MinPayAmount": "70.00",
                  "MaxPayAmount": "80.00",
                  "Class": "ST",
                  "Markup": null,
                  "Factor": null,
                  "BaseClass": null
                },
                {
                  "@rateType": "pay",
                  "@rateStatus": "agreed",
                  "BillAmount": {
                    "@rateAmountPeriod": "Hr",
                    "@currency": "USD",
                    "$": "170.78"
                  },
                  "MinBillAmount": "155.25",
                  "MaxBillAmount": "170.78",
                  "PayAmount": {
                    "@rateAmountPeriod": "Hr",
                    "@currency": "USD",
                    "$": "110.00"
                  },
                  "MinPayAmount": "100.00",
                  "MaxPayAmount": "110.00",
                  "Class": "OT",
                  "Markup": null,
                  "Factor": null,
                  "BaseClass": null
                },
                {
                  "@rateType": "pay",
                  "@rateStatus": "agreed",
                  "BillAmount": {
                    "@rateAmountPeriod": "Hr",
                    "@currency": "USD",
                    "$": "248.40"
                  },
                  "MinBillAmount": "217.35",
                  "MaxBillAmount": "248.40",
                  "PayAmount": {
                    "@rateAmountPeriod": "Hr",
                    "@currency": "USD",
                    "$": "160.00"
                  },
                  "MinPayAmount": "140.00",
                  "MaxPayAmount": "160.00",
                  "Class": "DT",
                  "Markup": null,
                  "Factor": "2.000",
                  "BaseClass": "ST"
                }
              ],
              "CustomFields": {
                "CustomField": [{
                    "@name": "Expected Interview Date",
                    "@mandatory": "no",
                    "@type": "xsd:date",
                    "Value": null,
                    "Class": "JobPosting"
                  },
                  {
                    "@name": "Reason for the Requisition",
                    "@mandatory": "yes",
                    "@type": "xsd:pickList",
                    "pickList": {
                      "@isCompleteList": "yes",
                      "@totalNumberOfItems": "5",
                      "item": [
                        "Constant Usage",
                        "Other",
                        "Replacement Due to Sickness/Leave",
                        "Seasonal/Temporary Increase in Activity",
                        "Specific Project/Initiative"
                      ]
                    },
                    "Value": "Constant Usage",
                    "Class": "JobPosting"
                  },
                  {
                    "@name": "Internal Requisition ID Number",
                    "@mandatory": "yes",
                    "@type": "xsd:numeric",
                    "Value": "9785646",
                    "Class": "JobPosting"
                  },
                  {
                    "@name": "Justification for this Requisition",
                    "@mandatory": "no",
                    "@type": "xsd:string",
                    "Value": null,
                    "Class": "JobPosting"
                  },
                  {
                    "@name": "If the candidate is a sub-contractor, please enter the sub-contractor bill rate",
                    "@mandatory": "no",
                    "@type": "xsd:numeric",
                    "Value": null,
                    "Class": "JobSeeker"
                  },
                  {
                    "@name": "If yes to the above, please list their direct manager",
                    "@mandatory": "no",
                    "@type": "xsd:string",
                    "Value": null,
                    "Class": "JobSeeker"
                  },
                  {
                    "@name": "Vendor Profile",
                    "@mandatory": "no",
                    "@type": "xsd:string",
                    "Value": null,
                    "Class": "JobSeeker"
                  },
                  {
                    "@name": "Has the candidate ever worked at FGFL as an employee?",
                    "@mandatory": "yes",
                    "@type": "xsd:pickList",
                    "pickList": {
                      "@isCompleteList": "yes",
                      "@totalNumberOfItems": "2",
                      "item": [
                        "No",
                        "Yes"
                      ]
                    },
                    "Value": null,
                    "Class": "JobSeeker"
                  },
                  {
                    "@name": "Preferred Interview Date",
                    "@mandatory": "no",
                    "@type": "xsd:date",
                    "Value": null,
                    "Class": "JobSeeker"
                  }
                ]
              },
              "Quals": {
                "Qual": [{
                    "@name": "4-Year Degree",
                    "@mandatory": "no",
                    "@type": "xsd:Boolean",
                    "Boolean": "false"
                  },
                  {
                    "@name": "Microsoft Office",
                    "@mandatory": "no",
                    "@type": "xsd:Ratings",
                    "Ratings": "-1"
                  },
                  {
                    "@name": "How long as the candidate worked in tech?",
                    "@mandatory": "no",
                    "@type": "xsd:Years",
                    "Years": "0.00"
                  },
                  {
                    "@name": "Have the prerequisites been completed?",
                    "@mandatory": "no",
                    "@type": "xsd:Boolean",
                    "Boolean": "false"
                  },
                  {
                    "@name": "Relevant Work Experience (Years)",
                    "@mandatory": "no",
                    "@type": "xsd:Ratings and Years",
                    "Ratings": "-1",
                    "Years": "0.00"
                  },
                  {
                    "@name": "Lean/Six Sigma Green Belt",
                    "@mandatory": "no",
                    "@type": "xsd:Certification",
                    "Certification": {
                      "CertificationName": {
                        "@label": "Certificate Number"
                      },
                      "StartDate": {
                        "@label": "Date Issued"
                      },
                      "EndDate": {
                        "@label": "Date Ended"
                      }
                    }
                  }
                ]
              },
              "PositionRules": {
                "AutoEngage": "no",
                "AutoRegister": "no",
                "AutoActivate": "no",
                "PayRateRequired": "no",
                "ResumeRequired": "no",
                "JobSeekerBillRateCanExceedRequestedBillRate": "no",
                "SupplierMustEnterRateChangeAmountsAndDurationOnJobSeekers": "no",
                "AllowSupplierToSelectJobSeekerSite": "no"
              },
              "InvoiceInfo": {
                "AutoInvoiceType": "Both",
                "TrialEndDate": null,
                "TravelTime": "10.000",
                "HoursPerDay": "8.00",
                "HoursPerWeek": "40.00",
                "BillablePerDiem": "0.00",
                "EstimatedAdditionalSpend": "16891.20",
                "EstimatedTotalHours": "136.0",
                "EstimatedExpenses": "0.000",
                "SiteTax": "0.000",
                "MaximumExpenses": "0.00",
                "ExternalReqNumber": null,
                "PurchaseOrderNumber": null
              },
              "SecurityIdInstruction": "Format: [0-9][0-9][0-9][0-9][0-9][A-Z][A-Z]",
              "SecurityIdPattern": "[0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z][A-Z]"
            }
          }
        }
      }
    }
  }
}`;
