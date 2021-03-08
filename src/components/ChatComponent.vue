<template>
  <div>

    <beautiful-chat
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="false"
        :showFile="false"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :messageStyling="messageStyling"
        :title="title"
        :placeholder="placeholder"

    />
  </div>
</template>

<script>

import axios from 'axios'
import _ from 'lodash';

export default {
  props: {
    env: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      required: false,
      default: 'en'
    },
  },
  name: 'chatComponent',
  data() {
    return {
      participants: [

        {
          id: 'rasa-ui',
          name: 'Doris',
          imageUrl: 'https://avatars.slack-edge.com/2016-09-06/76549015489_a510c41e2dc0cd39478c_192.png'
        }

      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://avatars.slack-edge.com/2015-12-16/16799527575_f0d73f12f965860ccd73_88.png',
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#004494',
          text: '#ffffff'
        },
        launcher: {
          bg: '#004494'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#004494',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      title: "EC Bot",
      suggestions: [],
      placeholder: 'Ask a question',
      url: "",
      //endpoint: "https://chatbot-h2020.cnect.eu/",
      //endpoint: "https://chatbot-emff.cnect.eu",
      endpoint: "https://chatbot.cnect.eu/rasa",

      //endpoint: ""

    }
  },
  mounted: function () {

    this.$session.start();


    if (this.env === "dev") {
      this.title = "EC Bot [DEV]";
    }

    if (this.env === "dsm") {
      this.title = "DSM Bot";

    }

    if (this.env === "h2020") {
      this.title = "EC Bot [H2020]";
      this.endpoint = "https://chatbot-h2020.cnect.eu/";
    }

    if (this.env === "staffmatters") {
      this.title = "Staff Matters Bot";
    }

    if (this.env === "codeweek") {
      this.title = "Codeweek Bot";

    }

    if (this.env === "emff") {
      this.title = "EMFF Bot";
    }



    if (this.env === "codeweek") {
      this.title = "Ally";
      this.placeholder= 'Write a question'

      this.titleImageUrl = 'https://codeweek-s3.s3-eu-west-1.amazonaws.com/chatbot/ally.png',
          this.participants = [

            {
              id: 'rasa-ui',
              name: 'Ally',
              imageUrl: 'https://codeweek-s3.s3-eu-west-1.amazonaws.com/chatbot/ally.png'
            }

          ];
      this.colors = {
        header: {
          bg: '#FE6823',
          text: '#ffffff'
        },
        launcher: {
          bg: '#FE6823'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#FE6823',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#FE6823',
          text: '#ffffff'
        }
      }
    }

    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered


      const payload = {
        message: '/general_hello',
        env: this.env,
        lang: this.lang,
        session: this.$session.id()
      };

      axios
          .post(this.endpoint, payload)
          .then(this.getF());

      /*axios
          .post('rasa', payload)
          .then(this.getF());
*/

      setTimeout(() => {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1;
      }, 3000);

    })
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({author: 'support', type: 'text', data: {text}})
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];

      const payload = {
        message: message.data.text,
        env: this.env,
        lang: this.lang,
        session: this.$session.id()
      };

      axios
          .post(this.endpoint, payload)
          .then(this.getF())

    },
    loopThroughArray(array) {
      array.forEach((element, i) => {
        setTimeout(() => {
          this.messageList = [...this.messageList, element];
        }, (i + 1) * 1000)
      })
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    trimWebLinks: function (content) {
      return content;
      //var exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      //var element_content = content.replace(exp_match, "<a href='$1'>LINK</a>");
      //return element_content;

    },
    getPrimaryIntent: function (response) {
      let messages = [];
      for (var i of response.data) {

        var suggestions = [];
        if (i.buttons) {
          for (var button of i.buttons) {
            suggestions.push(button);
          }
        }

        if (i.hasOwnProperty('custom')) {

          //console.log(i.custom.qaContexts[0].geo[0]);

          if (i.custom.qaContexts[0].geo[0]) {
            messages = [];
            messages.push({
              type: 'geo',
              author: `rasa-ui`,
              data: i.custom
            });
          } else

              //Do we have at least one image ?
          if (i.custom.qaContexts[0].images[0]) {
            messages.push({
              type: 'image',
              author: `rasa-ui`,
              data: {image: i.custom.qaContexts[0].images[0]}
            });
          }


        } else {

          if (i.hasOwnProperty("image")) {
            messages.push({
              type: 'image',
              author: `rasa-ui`,
              data: {image: i.image}

            });
          } else {
            if (!_.isEmpty(i.text)) {
              messages.push({
                type: 'text',
                author: `rasa-ui`,
                data: {text: i.text},
                suggestions: suggestions
              });
            }

          }

        }


      }
      return messages;
    }, getF: function () {
      return response => {

        let messages;
        messages = this.getPrimaryIntent(response);

        this.loopThroughArray(messages);

      };
    }


  }
}
</script>
