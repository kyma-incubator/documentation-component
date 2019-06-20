import React from "react";
import {
  HeadlessCMS,
  Content,
  ContextNavigation,
  Source,
  markdownTabsPlugin,
  markdownHeadersPlugin,
} from "@kyma-project/documentation-component";

const source = `
Minikube allows you to run Kyma locally, develop, and test your solutions on a small scale before you push them to a cluster. With the Installation and Getting Started guides at hand, you can start developing in a matter of minutes.

Read, learn, and try on your own to:

- [Install Kyma locally](#installation-install-kyma-locally)
- [Install Kyma on a cluster](#installation-install-kyma-on-a-cluster)
- [Deploy a sample service locally](#tutorials-sample-service-deployment-on-local)
- [Deploy a service on a cluster](#tutorials-sample-service-deployment-on-a-cluster)
- [Develop a service locally without using Docker](#tutorials-develop-a-service-locally-without-using-docker)
- [Publish a service Docker image and deploy it to Kyma](#tutorials-publish-a-service-docker-image-and-deploy-it-to-kyma)
- [Configure the Installer with override values for Helm charts](#tutorials-helm-overrides-for-kyma-installation)
- [Register a Broker in Service Catalog](/components/service-catalog#tutorials-register-a-broker-in-the-service-catalog)
- [Create a new Application](/components/application-connector#tutorials-create-a-new-application)
- [Get the client certificate](/components/application-connector#tutorials-get-the-client-certificate)
- [Register a service](/components/application-connector#tutorials-register-a-service)
- [Bind an Application to a Namespace](/components/application-connector#tutorials-bind-an-application-to-a-namespace)
- [Trigger a lambda with events](/components/application-connector#tutorials-trigger-a-lambda-with-events)
- [Call a registered external service from Kyma](/components/application-connector#tutorials-call-a-registered-external-service-from-kyma)
- [Expose custom metrics in Kyma](/components/monitoring#tutorials-expose-custom-metrics-in-kyma)

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

> **NOTE**: Blockquotes are very handy in email to emulate reply text.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.





Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3



# H1
## H2
### H3
#### H4
##### H5
###### H6
#### H4
##### H5
###### H6

------

\`youtube: https://youtu.be/NI4cOWO9HnA\`
\`dupa\`

\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`
 
\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`
 
\`\`\`
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
\`\`\`

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
    >**NOTE** If you want to install a specific release version, go to the [GitHub releases page](https://github.com/kyma-project/kyma/releases) to find out more about available releases. Use the release version as a parameter when calling \`kyma install --release {KYMA_RELEASE}\`.
   
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
`;

const Playground: React.FunctionComponent = () => {
  const sources: Source[] = [
    {
      type: "md",
      source: source,
    },
  ];

  return (
    <HeadlessCMS.Provider
      sources={sources}
      plugins={[markdownHeadersPlugin, ...markdownTabsPlugin]}
    >
      <Content />
      <ContextNavigation />
    </HeadlessCMS.Provider>
  );
};

export default Playground;
