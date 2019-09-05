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

`;
