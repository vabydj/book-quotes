<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" :src="image_url"></v-img>

    <v-card-subtitle class="pb-0">{{ author }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ text }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" @click.prevent="onCopy()" text small>Copy</v-btn>
      <v-btn color="orange" @click.prevent="onDownload()" text small>Download</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Quote",
  props: {
    author: String,
    image_url: String,
    text: String,
    copyClicked: Function
  },
  methods: {
    onCopy() {
      this.$clipboard(this.tpl());
      this.copyClicked("Text copied to clipboard!");
    },
    async onDownload() {
      try {
        // Source: https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
        axios({
          url: this.image_url,
          method: "GET",
          responseType: "blob"
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${uuidv4()}.jpg`);
          document.body.appendChild(link);
          link.click();
        });
      } catch (err) {
        console.log("Error while downloading quote image " + err);
      }
    },
    tpl() {
      return `${this.text} ~ ${this.author}
.
.
.
Let's explore and share the best investment 📈 ideas out there.
Follow @the_noob_investor 🔰.
.
.
#financialliteracy #personalfinance #finances #financialfreedom #cashless
#moneymatters #financialadvice #financetips #debtfree #investing
#realestateinvesting #investingtips #valueinvesting #propertyinvesting
#multifamilyinvesting #investing101 #stockmarketinvesting
#passiveincomeinvesting #investingforbeginners #investinginrealestate
#stockinvesting #investinginmyself #investinginme #investinginyourself
#longterminvesting #smartinvesting #apartmentinvesting
#realestateinvesting101`;
    }
  }
};
</script>

