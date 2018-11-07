import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditFunrunDetailsDialog from './components/Funrun/Edit/EditFunrunDetailsDialog.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-funrun-details-dialog', EditFunrunDetailsDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyD1TDCwoqDloX6vICzyMtfhmn1wDyfgTDk",
      authDomain: "softwaredev-46883.firebaseapp.com",
      databaseURL: "https://softwaredev-46883.firebaseio.com",
      projectId: "softwaredev-46883",
      storageBucket: "gs://softwaredev-46883.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadFunruns')
  }
})
