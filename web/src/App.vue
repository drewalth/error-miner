<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Error Miner</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      href="https://github.com/drewalth/error-miner"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-github</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Crawl URL"
                    name="crawl-url"
                    type="text"
                    v-model="url"
                  ></v-text-field>
                  <v-text-field
                    label="Username"
                    name="username"
                    type="email"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    label="Keywords"
                    name="keywords"
                    type="text"
                    v-model="keywords"
                    hint="separate keywords with commas"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!submitEnabled"
                  color="primary"
                  @click.exact="handleSubmit"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    url: "",
    username: "",
    password: "",
    keywords: ""
  }),
  computed: {
    submitEnabled() {
      return (
        this.url.length &&
        this.username.length &&
        this.password.length &&
        this.keywords.length
      );
    }
  },
  methods: {
    async handleSubmit() {
      await this.$http
        .post(
          "/random-click",
          JSON.stringify({
            url: this.url,
            username: this.username,
            password: this.password,
            keywords: this.keywords
          })
        )
        .then(res => res.data);
    }
  }
};
</script>
