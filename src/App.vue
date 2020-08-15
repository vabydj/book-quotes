<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left>
      <v-toolbar-title>Book Quotes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search book quotes by tags"
        v-model="q"
        @keydown.enter="loadQuote()"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-snackbar
        v-model="toast.visibility"
        color="orange"
        :top="true"
        :timeout="toast.timeout"
      >{{ toast.text }}</v-snackbar>
      <v-sheet color="grey darken-2 fill-height" class="px-3 pt-3 pb-12">
        <v-container>
          <v-row dense>
            <v-col v-for="quote in quotes" v-bind:key="quote.id" cols="12" fluid>
              <Quote
                :author="quote.author"
                :image_url="quote.image_url"
                :text="quote.text"
                :copyClicked="showToast"
              ></Quote>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Quote from "./Quote";
import axios from "axios";

export default {
  name: "App",
  components: {
    Quote
  },
  data: () => ({
    q: "",
    quotes: [],
    toast: {
      visibility: false,
      text: "",
      timeout: 3000
    }
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    async loadQuote() {
      try {
        const res = await axios.get(
          "https://cors-anywhere.herokuapp.com/http://nks1956.pythonanywhere.com/quotes/" +
            this.q
        );
        this.quotes = res.data;
        this.showToast(`${this.quotes.length} entries loaded`);
      } catch (err) {
        console.log("Error while fetching quote " + err);
      }
    },
    showToast(text) {
      this.toast.visibility = true;
      this.toast.text = text;
    }
  }
};
</script>
