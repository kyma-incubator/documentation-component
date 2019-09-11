/* eslint-disable */
export const markdownMock = `

Kyma is built on the foundation of the best and most advanced open-source projects which make up the components readily available for customers to use.
This section describes the Kyma components.

## Service Catalog

The Service Catalog lists all of the services available to Kyma users through the registered [Service Brokers](/components/service-catalog/#service-brokers-service-brokers). Use the Service Catalog to provision new services in the
Kyma [Kubernetes](https://kubernetes.io/) cluster and create bindings between the provisioned service and an application.


## Service Mesh

The Service Mesh is an infrastructure layer that handles service-to-service communication, proxying, service discovery, traceability, and security independent of the code of the services. Kyma uses the [Istio](https://istio.io/) Service Mesh that is customized for the specific needs of the implementation.

## Security

Kyma security enforces RBAC (Role Based Access Control) in the cluster. [Dex](https://github.com/dexidp/dex) handles the identity management and identity provider integration. It allows you to integrate any [OpenID Connect](https://openid.net/connect/) or SAML2-compliant identity provider with Kyma using [connectors](https://github.com/dexidp/dex#connectors). Additionally, Dex provides a static user store which gives you more flexibility when managing access to your cluster.

## Helm Broker

The Helm Broker is a Service Broker which runs in the Kyma cluster and deploys Kubernetes native resources using [Helm](https://github.com/kubernetes/helm) and Kyma bundles. A bundle is an abstraction layer over a Helm chart which allows you to represent it as a ClusterServiceClass in the Service Catalog. Use bundles to install the [GCP Broker](/components/service-catalog#service-brokers-gcp-broker), [Azure Service Broker](/components/service-catalog#service-brokers-azure-service-broker) and the [AWS Service Broker](/components/service-catalog#service-brokers-aws-service-broker) in Kyma.

## Application Connector

The Application Connector is a proprietary Kyma solution. This endpoint is the Kyma side of the connection between Kyma and the external solutions. The Application Connector allows you to register the APIs and the Event Catalog, which lists all of the available events, of the connected solution. Additionally, the Application Connector proxies the calls from Kyma to external APIs in a secure way.

## Event Bus

Kyma Event Bus receives Events from external solutions and triggers the business logic created with lambda functions and services in Kyma. The Event Bus is based on the [NATS Streaming](https://nats.io/) open source messaging system for cloud-native applications.

## Serverless

The Kyma Serverless component allows you to reduce the implementation and operation effort of an application to the absolute minimum. Kyma Serverless provides a platform to run lightweight functions in a cost-efficient and scalable way using JavaScript and Node.js. Kyma Serverless is built on the [Kubeless](http://kubeless.io/) framework, which allows you to deploy lambda functions,
and uses the [NATS](https://nats.io/) messaging system that monitors business events and triggers functions accordingly.

## Monitoring

Kyma comes bundled with tools that give you the most accurate and up-to-date monitoring data. [Prometheus](https://prometheus.io/) open source monitoring and alerting toolkit provides this data, which is consumed by different add-ons, including [Grafana](https://grafana.com/) for analytics and monitoring, and [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) for handling alerts.

## Tracing

The tracing in Kyma uses the [Jaeger](https://github.com/jaegertracing) distributed tracing system. Use it to analyze performance by scrutinizing the path of the requests sent to and from your service. This information helps you optimize the latency and performance of your solution.

## Logging

Logging in Kyma uses [Loki](https://github.com/grafana/loki), a Prometheus-like log management system.



Management of the Service Catalog is based on Kubernetes resources and the custom resources specifically defined for Kyma. Manage all of these resources through [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/).

## Details

This section describes the resource names to use in the kubectl command line, the command syntax, and examples of use.

### Resource types

Service Catalog operations use the following resources:

| Singular name      | Plural name         |
| ------------------ |---------------------|
|clusterservicebroker|clusterservicebrokers|
|clusterserviceclass |clusterserviceclasses|
|clusterserviceplan  |clusterserviceplans  |
|secret              |secrets              |
|servicebinding      |servicebindings      |
|servicebindingusage |servicebindingusages |
|servicebroker       |servicebrokers       |
|serviceclass        |serviceclasses       |
|serviceinstance     |serviceinstances     |
|serviceplan         |serviceplans         |


### Syntax

Follow the \`kubectl\` syntax, \`kubectl {command} {type} {name} {flags}\`, where:

* {command} is any command, such as \`describe\`.
* {type} is a resource type, such as \`clusterserviceclass\`.
* {name} is the name of a given resource type. Use {name} to make the command return the details of a given resource.
* {flags} specifies the scope of the information. For example, use flags to define the Namespace from which to get the information.

### Examples
The following examples show how to create a ServiceInstance, how to get a list of ClusterServiceClasses and a list of ClusterServiceClasses with human-readable names, a list of ClusterServicePlans, and a list of all ServiceInstances.

* Create a ServiceInstance using the example of the Redis ServiceInstance for the 0.1.40 version of the Service Catalog:

\`\`\`
cat <<EOF | kubectl create -f -
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ServiceInstance
metadata:
  name: my-instance
  namespace: stage

spec:
  clusterServiceClassExternalName: redis
  clusterServicePlanExternalName: micro
  parameters:
     "imagePullPolicy": "Always"
EOF
\`\`\`

* Get the list of all ClusterServiceClasses:
\`\`\`
kubectl get clusterserviceclasses
\`\`\`
* Get the list of all ClusterServiceClasses and their human-readable names:
\`\`\`
kubectl get clusterserviceclasses -o=custom-columns=NAME:.metadata.name,EXTERNAL\ NAME:.spec.externalName
\`\`\`

* Get the list of all ClusterServicePlans and associated ClusterServiceClasses:
\`\`\`
kubectl get clusterserviceplans -o=custom-columns=NAME:.metadata.name,EXTERNAL\ NAME:.spec.externalName,EXTERNAL\ SERVICE\ CLASS:.spec.clusterServiceClassRef
\`\`\`
* Get the list of all ServiceInstances from all Namespaces:
\`\`\`
kubectl get serviceinstances --all-namespaces
\`\`\`



This document describes the mapping of [OSBA service objects](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#service-objects), [plan objects](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#plan-object), and [conventions](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#service-metadata) in the Kyma Console Catalog view.

## Catalog page

These are the OSBA fields used in the main Catalog page:

| Number | OSBA field                        | Fallbacks  | Description                                                                                                                |
| ------ | --------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| (1)    | **metadata.displayName**              | **name***, **id***| If **metadata.displayName**, **name**, or **id** fields are not present, a given Service Class does not appear on the landing page. |
| (2)    | **metadata.providerDisplayName**      | -          | If not provided, UI does not display this information.                                                                     |
| (3)    | **description\***                     | -          | If not provided, UI does not display this information.                                                                     |
| (4)    | **metadata.labels\*\***               | -          | If not provided, UI does not display any labels.                                                                           |
| (5)    | **metadata.labels.local\*\*** and/or **metadata.labels.showcase\*\*** | - | If not provided, it is not possible to choose a Basic Filter.                                                 |
| (6)    | **tags**                              | -          | If not provided, it is not possible to filter by Tag.                                                                         |
| (7)    | **metadata.labels.connected-app\*\*** | -          | If not provided, it is not possible to choose Connected Applications.                                                          |
| (8)    | **metadata.providerDisplayName**      | -          | If not provided, it is not possible to filter by Provider.                                                                    |

\*Fields with an asterisk are required OSBA attributes.

\*\***metadata.labels** is the custom object that is not defined in the [OSBA metadata convention](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#service-metadata).

![alt text](./assets/catalog-page.png)

## Catalog Details page

These are the OSBA fields used in the detailed Service Class view:

| Number | OSBA field                   | Fallbacks      | Description                                                       |
| ------ | ---------------------------- | -------------- | ----------------------------------------------------------------- |
| (1)    | **metadata.displayName**         | **name***, **id***     | -                                                                 |
| (2)    | **metadata.providerDisplayName** | -              | If not provided, UI does not display this information.            |
| (3)    | not related to OSBA          | -              | -                                                                 |
| (4)    | **metadata.documentationUrl**    | -              | If not provided, the link with documentation does not appear.     |
| (5)    | **metadata.supportUrl**          | -              | If not provided, the link with support does not appear.           |
| (6)    | **tags**                         | -              | If not provided, UI does not display tags.                        |
| (7)    | **metadata.longDescription**     | **description\***  | If not provided, the **General Information** panel does not appear. |
| (8)    | not related to OSBA          | -              | -                                                                 |

\*Fields with an asterisk are required OSBA attributes.

![alt text](./assets/catalog-details-page.png 'Catalog Details')

## Add to Namespace

These are the OSBA fields used in the **Add to Namespace** window:

| Number | OSBA field                | Fallbacks            | Description |
| ------ | ------------------------- | -------------------- | ----------- |
| (1)    | **plan.metadata.displayName** | **plan.name***, **plan.id*** |             |
| (2)    | not related to OSBA       | -                    |             |
| (3)    | not related to OSBA       | -                    |             |

\*Fields with an asterisk are required OSBA attributes.

![alt text](./assets/add-to-namespace.png)

### Plan schema

A [plan object](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#plan-object) in the OSBA can have the **schemas** field. Schema is used to generate a form which enables provisioning of the Service Class.

See the sample schema:

\`\`\`json
{
          "$schema": "http://json-schema.org/draft-04/schema#",
          "properties": {
            "imagePullPolicy": {
              "default": "IfNotPresent",
              "enum": [
                "Always",
                "IfNotPresent",
                "Never"
              ],
              "title": "Image pull policy",
              "type": "string"
            },
            "redisPassword": {
              "default": "",
              "format": "password",
              "description": "Redis password. Defaults to a random 10-character alphanumeric string.",
              "title": "Password (Defaults to a random 10-character alphanumeric string)",
              "type": "string"
            }
          },
          "type": "object"
        }
\`\`\`

This sample renders in the following way:

![alt text](./assets/schema-form.png)

Follow these rules when you design schema objects:

* If the field has limited possible values, use the **enum** field. It renders as a dropdown menu, so it prevents the user from making mistakes.
* If the field is required for the Service Class, mark it as **required**. UI blocks provisioning if you do not fill in the required fields.
* Fill the **default** value for a field whenever possible, it makes the provisioning faster.
* If the field, such as the password field, must be starred, use the **format** key with the **password** value.



## Event consumption

When you create a lambda or a service to perform a given business functionality, you must define which Events trigger it. Define triggers by creating the [Subscription CR](/components/event-bus/#custom-resource-subscription) where you instruct the Event Bus to forward the Events of a particular type to your lambda.
For example, whenever the \`order-created\` Event comes in, the Event Bus stores it in NATS Streaming. It then dispatches it to the receiver specified in the Subscription CR definition.

> **NOTE:** The Event Bus creates a separate Event trigger for each Subscription.

![Configure and Consume Events](./assets/configure-consume-events.svg)


1. A user creates a lambda or a service that an Event coming from an external solution triggers.
    >**NOTE**: When creating a service, the user must create a Kyma Subscription resource manually. If the user uses Kyma Console UI to create a lambda, the Subscription resource is created automatically.
    
2. **subscription-controller** reacts to the creation of Kyma Subscription.  It [verifies](#event-validation) if the Event type from the application can be consumed in the Namespace where the Kyma Subscription has been created.  If so, it creates the Knative Channel and Knative Subscription resources.
3. [**nats-controller**](https://github.com/knative/eventing-contrib/tree/master/natss/pkg/reconciler/controller) reacts to the creation of a Knative [Channel](https://github.com/knative/eventing/blob/release-0.6/config/300-channel.yaml) and creates the required Kubernetes services.
4. [**nats-dispatcher**](https://github.com/knative/eventing-contrib/tree/master/natss/pkg/dispatcher) reacts to the creation of a Knative [Subscription](https://github.com/knative/eventing/blob/release-0.6/config/300-subscription.yaml) and creates the NATS Streaming Subscription.
5. [**nats-dispatcher**](https://github.com/knative/eventing-contrib/tree/master/natss/pkg/dispatcher) picks the Event and dispatches it to the configured lambda or the service URL as an HTTP POST request. The lambda reacts to the received Event.

## Event publishing

![Publish Events](./assets/publish-events.svg)

1. The external application integrated with Kyma makes a REST API request to the Application Connector's Events Gateway to indicate that a new Event is available. The request provides the Application Connector with the Event metadata.
2. The Application Connector enriches the Event with the details of its source.

    > **NOTE:** There is always one dedicated instance of the Application Connector for every instance of an external solution connected to Kyma.

3. The Application Connector makes a REST API call to **event-publish-service** and sends the enriched Event.
4. **event-publish-service** makes the HTTP payload compatible with Knative and sends the Event to the relevant **knative-channel** service URL which is inferred based on **source id**, **event type**, and **event type version** parameters.
5. Kubernetes service forwards the Event to the **nats-dispatcher** service served by the **nats-dispatcher** Pod.
6. **nats-dispatcher** saves the Event in NATS Streaming which stores the Event details in the Persistence storage volume.



## Event validation

 **subscription-controller** checks if the Namespace can receive Events from the application. It performs the check for each Kyma Subscription created in a Namespace for a particular Event type with a version for a specific application.

### Validation flow

See the diagram and a step-by-step description of the Event verification process.

![Event validation process](./assets/event-validation.svg)

1. The Kyma user defines a lambda or a service.
2. The Kyma user creates a Subscription custom resource.
3. **subscription-controller** reads the new Subscription.
4. **subscription-controller** reads the EventActivation CR to verify if it exists in the Namespace for a certain application.
5. **subscription-controller** updates the Subscription resource accordingly with the activation status \`true\` or \`false\`. The Event Bus uses this status to allow or prohibit Event delivery.


`;
