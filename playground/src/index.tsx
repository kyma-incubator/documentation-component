import React from "react";
import ReactDOM from "react-dom";
import { Source } from "@kyma-project/documentation-component";
import { DocsComponent } from "./component";

const text1 = `
Kyma allows you to connect applications and third-party services in a cloud-native environment. Use it to create extensions for the existing systems, regardless of the language they are written in. Customize extensions with minimum effort and time devoted to learning their configuration details.
 Focus purely on coding with these out-of-the-box functionalities at hand:
- Service-to-service communication and proxying (Istio Service Mesh)
- In-built monitoring, tracing, and logging (Grafana, Prometheus, Jaeger, Loki)
- Secure authentication and authorization (Dex, Service Identity, TLS, Role Based Access Control)
- The catalog of services to choose from (Service Catalog, Service Brokers)
- The development platform to run lightweight functions in a cost-efficient and scalable way (Serverless, Kubeless)
- The endpoint to register Events and APIs of external applications (Application Connector)
- The messaging channel to receive Events, enrich them, and trigger business flows using lambdas or services (Event Bus, NATS)
- CLI supported by the intuitive UI (Console)
`;

const text2 = `
Kyma packages its components into [Helm](https://github.com/helm/helm/tree/master/docs) charts that the [Installer](https://github.com/kyma-project/kyma/tree/master/components/installer) uses during installation and updates.
This document describes how to configure the Installer with new values for Helm [charts](https://github.com/helm/helm/blob/master/docs/charts.md) to override the default settings in \`values.yaml\` files.
 ## Overview
 The Installer is a [Kubernetes Operator](https://coreos.com/operators/) that uses Helm to install Kyma components.
Helm provides an **overrides** feature to customize the installation of charts, for example to configure environment-specific values.
When using Installer for Kyma installation, users can't interact with Helm directly. The installation is not an interactive process.
 To customize the Kyma installation, the Installer exposes a generic mechanism to configure Helm overrides called **user-defined** overrides.
 ## User-defined overrides
 The Installer finds user-defined overrides by reading the ConfigMaps and Secrets deployed in the \`kyma-installer\` Namespace and marked with:
- the \`installer: overrides\` label
- a \`component: {COMPONENT_NAME}\` label if the override refers to a specific component
 >**NOTE:** There is also an additional \`kyma-project.io/installation: ""\` label in all ConfigMaps and Secrets that allows you to easily filter the installation resources.
 The Installer constructs a single override by inspecting the ConfigMap or Secret entry key name. The key name should be a dot-separated sequence of strings corresponding to the structure of keys in the chart's \`values.yaml\` file or the entry in chart's template.
 The Installer merges all overrides recursively into a single \`yaml\` stream and passes it to Helm during the Kyma installation and upgrade operations.
 ## Common vs. component overrides
 The Installer looks for available overrides each time a component installation or an update operation is due.
Overrides for a component are composed of two sets: **common** overrides and **component-specific** overrides.
 Kyma uses common overrides for the installation of all components. ConfigMaps and Secrets marked with the \`installer: overrides\` label contain the definition.
 Kyma uses component-specific overrides only for the installation of specific components. ConfigMaps and Secrets marked with both \`installer: overrides\` and \`component: {component-name}\` labels contain the definition. Component-specific overrides have precedence over common ones in case of conflicting entries.
 >**NOTE:** Add the additional \`kyma-project.io/installation: ""\` label to both common and component-specific overrides to enable easy installation resources filtering.
 ## Overrides examples
 ### Top-level charts overrides
 Overrides for top-level charts are straightforward. Just use the template value from the chart as the entry key in the ConfigMap or Secret. Leave out the \`.Values.\` prefix.
 Se an example:
 The Installer uses an \`asset-store\` top-level chart that contains a template with the following value reference:
 \`\`\`
resources: {{ toYaml .Values.resources | indent 12 }}
\`\`\`
 The chart's default values \`minio.resources.limits.memory\` and \`minio.resources.limits.cpu\` in the \`values.yaml\` file resolve the template.
The following fragment of \`values.yaml\` shows this definition:
\`\`\`
minio:
  resources:
    limits:
      memory: "128Mi"
      cpu: "100m"
\`\`\`
 To override these values, for example to \`512Mi\` and \`250m\`, proceed as follows:
- Create a ConfigMap in the \`kyma-installer\` Namespace and label it.
- Add the \`minio.resources.limits.memory: 512Mi\` and \`minio.resources.limits.cpu: 250m\` entries to the ConfigMap and apply it:
 \`\`\`
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: assetstore-overrides
  namespace: kyma-installer
  labels:
    installer: overrides
    component: assetstore
    kyma-project.io/installation: ""
data:
  minio.resources.limits.memory: 512Mi #increased from 128Mi
  minio.resources.limits.cpu: 250m #increased from 100m
EOF
\`\`\`
 Once the installation starts, the Installer generates overrides based on the ConfigMap entries. The system uses the values of \`512Mi\` instead of the default \`128Mi\` for Minio memory and \`250m\` instead of \`100m\` for Minio CPU from the chart's \`values.yaml\` file.
 For overrides that the system should keep in Secrets, just define a Secret object instead of a ConfigMap with the same key and a base64-encoded value. Be sure to label the Secret.
 If you add the overrides in the runtime, trigger the update process using this command:
 \`\`\`
kubectl label installation/kyma-installation action=install
\`\`\`
 ### Sub-chart overrides
 Overrides for sub-charts follow the same convention as top-level charts. However, overrides require additional information about sub-chart location.
 When a sub-chart contains the \`values.yaml\` file, the information about the chart location is not necessary because the chart and its \`values.yaml\` file are on the same level in the directory hierarchy.
 The situation is different when the Installer installs a chart with sub-charts.
All template values for a sub-chart must be prefixed with a sub-chart "path" that is relative to the top-level "parent" chart.
 This is not an Installer-specific requirement. The same considerations apply when you provide overrides manually using the \`helm\` command-line tool.
 Here is an example.
There's a \`core\` top-level chart that the Installer installs.
There's an \`application-connector\` sub-chart in \`core\` with a nested \`connector-service\` sub-chart.
In one of its templates, there's a following fragment:
 \`\`\`
spec:
  containers:
  - name: {{ .Chart.Name }}
	args:
	  - "/connectorservice"
	  - '--appName={{ .Chart.Name }}'
	  - "--domainName={{ .Values.global.domainName }}"
	  - "--tokenExpirationMinutes={{ .Values.deployment.args.tokenExpirationMinutes }}"
\`\`\`
 This fragment of the \`values.yaml\` file in the \`connector-service\` chart defines the default value for \`tokenExpirationMinutes\`:
 \`\`\`
deployment:
  args:
    tokenExpirationMinutes: 60
\`\`\`
 To override this value, and change it from \`60\` to \`90\`, do the following:
 - Create a ConfigMap in the \`kyma-installer\` Namespace and label it.
- Add the \`application-connector.connector-service.deployment.args.tokenExpirationMinutes: 90\` entry to the ConfigMap.
 Notice that the user-provided override key now contains two parts:
 - The chart "path" inside the top-level \`core\` chart called \`application-connector.connector-service\`
- The original template value reference from the chart without the \`.Values.\` prefix, \`deployment.args.tokenExpirationMinutes\`.
 Once the installation starts, the Installer generates overrides based on the ConfigMap entries. The system uses the value of \`90\` instead of the default value of \`60\` from the \`values.yaml\` chart file.
 ## Global overrides
 There are several important parameters usually shared across the charts.
Helm convention to provide these requires the use of the \`global\` override key.
For example, to define the \`global.domain\` override, just use \`global.domain\` as the name of the key in a ConfigMap or Secret for the Installer.
 Once the installation starts, the Installer merges all of the ConfigMap entries and collects all of the global entries under the \`global\` top-level key to use for the installation.
 ## Values and types
 The Installer generally recognizes all override values as strings. It internally renders overrides to Helm as a \`yaml\` stream with only string values.
 There is one exception to this rule with respect to handling booleans:
The system converts \`true\` or \`false\` strings that it encounters to a corresponding boolean \`true\` or \`false\` value.
 ## Merging and conflicting entries
 When the Installer encounters two overrides with the same key prefix, it tries to merge them.
If both of them represent a ConfigMap (they have nested sub-keys), their nested keys are recursively merged.
If at least one of keys points to a final value, the Installer performs the merge in a non-deterministic order, so either one of the overrides is rendered in the final \`yaml\` data.
 It is important to avoid overrides having the same keys for final values.
 ### Non-conflicting merge example
 Two overrides with a common key prefix ("a.b"):
 \`\`\`
"a.b.c": "first"
"a.b.d": "second"
\`\`\`
 The Installer yields the correct output:
 \`\`\`
a:
  b:
    c: first
    d: second
\`\`\`
 ### Conflicting merge example
 Two overrides with the same key ("a.b"):
 \`\`\`
"a.b": "first"
"a.b": "second"
\`\`\`
 The Installer yields either:
 \`\`\`
a:
  b: "first"
\`\`\`
 Or (due to non-deterministic merge order):
 \`\`\`
a:
  b: "second"
\`\`\`
`;

const text3 = `
This Installation guide shows you how to quickly deploy Kyma locally on the MacOS and Linux platforms. Kyma is installed locally using a proprietary installer based on a [Kubernetes operator](https://coreos.com/operators/).

>**TIP:** See [this](#troubleshooting-overview) document for troubleshooting tips.

## Prerequisites

- [Kyma CLI](https://github.com/kyma-project/cli)
- [Docker](https://www.docker.com/get-started)
- [Minikube](https://github.com/kubernetes/minikube) 1.0
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 1.12
- [Helm](https://github.com/kubernetes/helm) 2.10
- [jq](https://stedolan.github.io/jq/)
- [wget](https://www.gnu.org/software/wget/)

Virtualization:

- [Hyperkit driver](https://github.com/kubernetes/minikube/blob/master/docs/drivers.md#hyperkit-driver) - MacOS only
- [VirtualBox](https://www.virtualbox.org/) - Linux only

> **NOTE**: To work with Kyma, use only the provided commands. Kyma requires a specific Minikube configuration and does not work on a basic Minikube cluster that you can start using the \`minikube start\` command.


## Install Kyma

Follow these instructions to install Kyma from a release or from sources:
<div tabs>
  <details>
  <summary>
  From a release
  </summary>

  1. Provision a Kubernetes cluster on Minikube. Run:

     \`\`\`bash
     kyma provision minikube
     \`\`\`
     > **NOTE:** The \`provision\` command uses the default Minikube VM driver installed for your operating system. For a list of supported VM drivers see [this document](https://kubernetes.io/docs/setup/minikube/#quickstart).

  2. Install the latest Kyma release on Minikube:
     \`\`\`bash
     kyma install
     \`\`\`
     >**NOTE** If you want to install a specific release version, go to the [GitHub releases page](https://github.com/kyma-project/kyma/releases) to find out more about available releases. Use the release version as a parameter when calling \` kyma install --release {KYMA_RELEASE}\`.

  </details>
  <details>
  <summary>
  From sources
  </summary>

  1. Open a terminal window and navigate to a space in which you want to store local Kyma sources.

  2. Clone the \`Kyma\` repository using HTTPS. Run:

     \`\`\`bash
     git clone https://github.com/kyma-project/kyma.git
     \`\`\`
  3. Provision a Kubernetes cluster on Minikube. Run:
     \`\`\`bash
     kyma provision minikube
     \`\`\`
     >  **NOTE:** The \`provision\` command uses default Minikube VM driver installed for your OS. For a list of supported VM drivers see [this document](http://github.com/kyma-project/cli).

  4. Install Kyma from sources. Run:

     \`\`\`bash
     kyma install --local --src-path {YOUR_KYMA_SOURCE_PATH}
     \`\`\`

   </details>
</div>

 ## Post-installation steps
  1. Kyma comes with a local wildcard self-signed \`server.crt\` certificate. Download the certificate from Kyma GitHub and add it to your OS trusted certificates to access the Console UI. Run:
      <div tabs>
      <details>
      <summary>
      MacOS
      </summary>

      \`\`\`bash
      wget https://raw.githubusercontent.com/kyma-project/kyma/master/installation/certs/workspace/raw/server.crt ; sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain server.crt
      \`\`\`
      </details>
      <details>
      <summary>
      Linux
      </summary>

      \`\`\`bash
      wget https://raw.githubusercontent.com/kyma-project/kyma/master/installation/certs/workspace/raw/server.crt ; certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n {CERT_DISPLAYNAME} -i server.crt
      \`\`\`
      </details>
      </div>

      >**NOTE:** Mozilla Firefox uses its own certificate keychain. If you want to access the Console UI though Firefox, add the Kyma wildcard certificate to the certificate keychain of the browser. To access the Application Connector and connect an external solution to the local deployment of Kyma, you must add the certificate to the trusted certificate storage of your programming environment. Read [this](/components/application-connector#details-access-the-application-connector-on-a-local-kyma-deployment) document to learn more.

  2. After the installation is completed, you can access the Console UI. Go to [this](https://console.kyma.local) address and select **Login with Email**. Use the **admin@kyma.cx** email address and the password printed in the terminal once the installation process is completed.

  3. At this point, Kyma is ready for you to explore. See what you can achieve using the Console UI or check out one of the [available examples](https://github.com/kyma-project/examples).

Read [this](#installation-reinstall-kyma) document to learn how to reinstall Kyma without deleting the cluster from Minikube.
To learn how to test Kyma, see [this](#details-testing-kyma) document.

## Stop and restart Kyma without reinstalling

Use the Kyma CLI to restart the Minikube cluster without reinstalling Kyma. Follow these steps to stop and restart your cluster:

1. Stop the Minikube cluster with Kyma installed. Run:
   \`\`\`
   minikube stop
   \`\`\`
2. Restart the cluster without reinstalling Kyma. Run:
   \`\`\`bash
   kyma provision minikube
   \`\`\`

The Kyma CLI discovers that a Minikube cluster is initialized and asks if you want to delete it. Answering \`no\` causes the Kyma CLI to start the Minikube cluster and restarts all of the previously installed components. Even though this procedure takes some time, it is faster than a clean installation as you don't download all of the required Docker images.

To verify that the restart is successful, run this command and check if all Pods have the \`RUNNING\` status:

\`\`\`
kubectl get pods --all-namespaces
\`\`\`
`;

const Playground: React.FunctionComponent = () => {
  const docs: Source[] = [
    {
      type: "md",
      rawContent: text1,
      data: {
        frontmatter: {
          title: "In a nutshell",
          type: "Overview",
        },
      },
    },
    {
      type: "md",
      rawContent: text2,
      data: {
        frontmatter: {
          title: "Helm overrides for Kyma installation",
          type: "Configuration",
        },
      },
    },
    {
      type: "md",
      rawContent: text3,
      data: {
        frontmatter: {
          title: "Installation stuck at ContainerCreating",
          type: "Troubleshooting",
        },
      },
    },
  ];

  return <DocsComponent sources={docs} navigation={true} />;
};

ReactDOM.render(<Playground />, document.getElementById("root"));
