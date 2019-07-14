import React from "react";
import ReactDOM from "react-dom";
import { Sources } from "@kyma-project/documentation-component";
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

const asyncapi = `
asyncapi: '1.2.0'
info:
  title: Slack Real Time Messaging API
  version: '1.0.0'

servers:
  - url: https://slack.com/api/rtm.connect
    scheme: https
    schemeVersion: '1.1'

security:
  - token: []

events:
  receive:
    - $ref: '#/components/messages/hello'
    - $ref: '#/components/messages/connectionError'
    - $ref: '#/components/messages/accountsChanged'
    - $ref: '#/components/messages/botAdded'
    - $ref: '#/components/messages/botChanged'
    - $ref: '#/components/messages/channelArchive'
    - $ref: '#/components/messages/channelCreated'
    - $ref: '#/components/messages/channelDeleted'
    - $ref: '#/components/messages/channelHistoryChanged'
    - $ref: '#/components/messages/channelJoined'
    - $ref: '#/components/messages/channelLeft'
    - $ref: '#/components/messages/channelMarked'
    - $ref: '#/components/messages/channelRename'
    - $ref: '#/components/messages/channelUnarchive'
    - $ref: '#/components/messages/commandsChanged'
    - $ref: '#/components/messages/dndUpdated'
    - $ref: '#/components/messages/dndUpdatedUser'
    - $ref: '#/components/messages/emailDomainChanged'
    - $ref: '#/components/messages/emojiRemoved'
    - $ref: '#/components/messages/emojiAdded'
    - $ref: '#/components/messages/fileChange'
    - $ref: '#/components/messages/fileCommentAdded'
    - $ref: '#/components/messages/fileCommentDeleted'
    - $ref: '#/components/messages/fileCommentEdited'
    - $ref: '#/components/messages/fileCreated'
    - $ref: '#/components/messages/fileDeleted'
    - $ref: '#/components/messages/filePublic'
    - $ref: '#/components/messages/fileShared'
    - $ref: '#/components/messages/fileUnshared'
    - $ref: '#/components/messages/goodbye'
    - $ref: '#/components/messages/groupArchive'
    - $ref: '#/components/messages/groupClose'
    - $ref: '#/components/messages/groupHistoryChanged'
    - $ref: '#/components/messages/groupJoined'
    - $ref: '#/components/messages/groupLeft'
    - $ref: '#/components/messages/groupMarked'
    - $ref: '#/components/messages/groupOpen'
    - $ref: '#/components/messages/groupRename'
    - $ref: '#/components/messages/groupUnarchive'
    - $ref: '#/components/messages/imClose'
    - $ref: '#/components/messages/imCreated'
    - $ref: '#/components/messages/imMarked'
    - $ref: '#/components/messages/imOpen'
    - $ref: '#/components/messages/manualPresenceChange'
    - $ref: '#/components/messages/memberJoinedChannel'
    - $ref: '#/components/messages/message'
  send:
    - $ref: '#/components/messages/outgoingMessage'

components:
  securitySchemes:
    token:
      type: httpApiKey
      name: token
      in: query

  schemas:
    attachment:
      type: object
      properties:
        fallback:
          type: string
        color:
          type: string
        pretext:
          type: string
        author_name:
          type: string
        author_link:
          type: string
          format: uri
        author_icon:
          type: string
          format: uri
        title:
          type: string
        title_link:
          type: string
          format: uri
        text:
          type: string
        fields:
          type: array
          items:
            type: object
            properties:
              title:
                type: string
              value:
                type: string
              short:
                type: boolean
        image_url:
          type: string
          format: uri
        thumb_url:
          type: string
          format: uri
        footer:
          type: string
        footer_icon:
          type: string
          format: uri
        ts:
          type: number

  messages:
    hello:
      summary: First event received upon connection.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['hello']

    connectionError:
      summary: Event received when a connection error happens.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['error']
          error:
            type: object
            properties:
              code:
                type: number
              msg:
                type: string

    accountsChanged:
      summary: The list of accounts a user is signed into has changed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['accounts_changed']

    botAdded:
      summary: A bot user was added.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['bot_added']
          bot:
            type: object
            properties:
              id:
                type: string
              app_id:
                type: string
              name:
                type: string
              icons:
                type: object
                additionalProperties:
                  type: string

    botChanged:
      summary: A bot user was changed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['bot_added']
          bot:
            type: object
            properties:
              id:
                type: string
              app_id:
                type: string
              name:
                type: string
              icons:
                type: object
                additionalProperties:
                  type: string

    channelArchive:
      summary: A channel was archived.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_archive']
          channel:
            type: string
          user:
            type: string

    channelCreated:
      summary: A channel was created.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_created']
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string

    channelDeleted:
      summary: A channel was deleted.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_deleted']
          channel:
            type: string

    channelHistoryChanged:
      summary: Bulk updates were made to a channel's history.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_history_changed']
          latest:
            type: string
          ts:
            type: string
          event_ts:
            type: string

    channelJoined:
      summary: You joined a channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_joined']
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string

    channelLeft:
      summary: You left a channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_left']
          channel:
            type: string

    channelMarked:
      summary: Your channel read marker was updated.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_marked']
          channel:
            type: string
          ts:
            type: string

    channelRename:
      summary: A channel was renamed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_rename']
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number

    channelUnarchive:
      summary: A channel was unarchived.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['channel_unarchive']
          channel:
            type: string
          user:
            type: string

    commandsChanged:
      summary: A slash command has been added or changed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['commands_changed']
          event_ts:
            type: string

    dndUpdated:
      summary: Do not Disturb settings changed for the current user.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['dnd_updated']
          user:
            type: string
          dnd_status:
            type: object
            properties:
              dnd_enabled:
                type: boolean
              next_dnd_start_ts:
                type: number
              next_dnd_end_ts:
                type: number
              snooze_enabled:
                type: boolean
              snooze_endtime:
                type: number

    dndUpdatedUser:
      summary: Do not Disturb settings changed for a member.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['dnd_updated_user']
          user:
            type: string
          dnd_status:
            type: object
            properties:
              dnd_enabled:
                type: boolean
              next_dnd_start_ts:
                type: number
              next_dnd_end_ts:
                type: number

    emailDomainChanged:
      summary: The workspace email domain has changed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['email_domain_changed']
          email_domain:
            type: string
          event_ts:
            type: string

    emojiRemoved:
      summary: A custom emoji has been removed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['emoji_changed']
          subtype:
            type: string
            enum: ['remove']
          names:
            type: array
            items:
              type: string
          event_ts:
            type: string

    emojiAdded:
      summary: A custom emoji has been added.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['emoji_changed']
          subtype:
            type: string
            enum: ['add']
          name:
            type: string
          value:
            type: string
            format: uri
          event_ts:
            type: string

    fileChange:
      summary: A file was changed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_change']
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileCommentAdded:
      summary: A file comment was added.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_comment_added']
          comment: {}
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileCommentDeleted:
      summary: A file comment was deleted.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_comment_deleted']
          comment:
            type: string
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileCommentEdited:
      summary: A file comment was edited.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_comment_edited']
          comment: {}
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileCreated:
      summary: A file was created.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_created']
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileDeleted:
      summary: A file was deleted.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_deleted']
          file_id:
            type: string
          event_ts:
            type: string

    filePublic:
      summary: A file was made public.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_public']
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileShared:
      summary: A file was shared.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_shared']
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    fileUnshared:
      summary: A file was unshared.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['file_unshared']
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string

    goodbye:
      summary: The server intends to close the connection soon.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['goodbye']

    groupArchive:
      summary: A private channel was archived.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_archive']
          channel:
            type: string

    groupClose:
      summary: You closed a private channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_close']
          user:
            type: string
          channel:
            type: string

    groupHistoryChanged:
      summary: Bulk updates were made to a private channel's history.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_history_changed']
          latest:
            type: string
          ts:
            type: string
          event_ts:
            type: string

    groupJoined:
      summary: You joined a private channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_joined']
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string

    groupLeft:
      summary: You left a private channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_left']
          channel:
            type: string

    groupMarked:
      summary: A private channel read marker was updated.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_marked']
          channel:
            type: string
          ts:
            type: string

    groupOpen:
      summary: You opened a private channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_open']
          user:
            type: string
          channel:
            type: string

    groupRename:
      summary: A private channel was renamed.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_rename']
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number

    groupUnarchive:
      summary: A private channel was unarchived.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['group_unarchive']
          channel:
            type: string
          user:
            type: string

    imClose:
      summary: You closed a DM.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['im_close']
          channel:
            type: string
          user:
            type: string

    imCreated:
      summary: A DM was created.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['im_created']
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string
          user:
            type: string

    imMarked:
      summary: A direct message read marker was updated.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['im_marked']
          channel:
            type: string
          ts:
            type: string

    imOpen:
      summary: You opened a DM.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['im_open']
          channel:
            type: string
          user:
            type: string

    manualPresenceChange:
      summary: You manually updated your presence.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['manual_presence_change']
          presence:
            type: string

    memberJoinedChannel:
      summary: A user joined a public or private channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['member_joined_channel']
          user:
            type: string
          channel:
            type: string
          channel_type:
            type: string
            enum:
              - C
              - G
          team:
            type: string
          inviter:
            type: string

    memberLeftChannel:
      summary: A user left a public or private channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['member_left_channel']
          user:
            type: string
          channel:
            type: string
          channel_type:
            type: string
            enum:
              - C
              - G
          team:
            type: string

    message:
      summary: A message was sent to a channel.
      payload:
        type: object
        properties:
          type:
            type: string
            enum: ['message']
          user:
            type: string
          channel:
            type: string
          text:
            type: string
          ts:
            type: string
          attachments:
            type: array
            items:
              $ref: '#/components/schemas/attachment'
          edited:
            type: object
            properties:
              user:
                type: string
              ts:
                type: string

    outgoingMessage:
      summary: A message was sent to a channel.
      payload:
        type: object
        properties:
          id:
            type: number
          type:
            type: string
            enum: ['message']
          channel:
            type: string
          text:
            type: string
`;

const openapi = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Swagger Petstore",
    license: {
      name: "MIT",
    },
  },
  host: "petstore.swagger.io",
  basePath: "/v1",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/pets": {
      get: {
        summary: "List all pets",
        operationId: "listPets",
        tags: ["pets"],
        parameters: [
          {
            name: "limit",
            in: "query",
            description: "How many items to return at one time (max 100)",
            required: false,
            type: "integer",
            format: "int32",
          },
        ],
        responses: {
          "200": {
            description: "An paged array of pets",
            headers: {
              "x-next": {
                type: "string",
                description: "A link to the next page of responses",
              },
            },
            schema: {
              $ref: "#/definitions/Pets",
            },
          },
          default: {
            description: "unexpected error",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
      },
      post: {
        summary: "Create a pet",
        operationId: "createPets",
        tags: ["pets"],
        responses: {
          "201": {
            description: "Null response",
          },
          default: {
            description: "unexpected error",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
      },
    },
    "/pets/{petId}": {
      get: {
        summary: "Info for a specific pet",
        operationId: "showPetById",
        tags: ["pets"],
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            description: "The id of the pet to retrieve",
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "Expected response to a valid request",
            schema: {
              $ref: "#/definitions/Pets",
            },
          },
          default: {
            description: "unexpected error",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
      },
    },
  },
  definitions: {
    Pet: {
      required: ["id", "name"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
        },
        tag: {
          type: "string",
        },
      },
    },
    Pets: {
      type: "array",
      items: {
        $ref: "#/definitions/Pet",
      },
    },
    Error: {
      required: ["code", "message"],
      properties: {
        code: {
          type: "integer",
          format: "int32",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

const Playground: React.FunctionComponent = () => {
  const docs: Sources = [
    {
      sources: [
        {
          source: {
            type: "md",
            rawContent: text1,
            data: {
              frontmatter: {
                title: "In a nutshell",
                type: "Overview",
              },
            },
          },
        },
        {
          source: {
            type: "md",
            rawContent: text3,
            data: {
              frontmatter: {
                title: "Installation stuck at ContainerCreating",
                type: "Troubleshooting",
              },
            },
          },
        },
        {
          source: {
            type: "asyncapi",
            rawContent: asyncapi,
          },
        },
        {
          source: {
            type: "openapi",
            rawContent: openapi,
          },
        },
      ],
    },
  ];

  return <DocsComponent sources={docs} navigation={true} />;
};

ReactDOM.render(<Playground />, document.getElementById("root"));
