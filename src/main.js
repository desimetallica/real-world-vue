import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import BaseIcon from "@/components/BaseIcon.vue";
/*
upperFirst converts the first character of a string to upper case.
camelCase converts a string to camel case (camelCase isWritten likeThis)
*/
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
Vue.config.productionTip = false;

/*
instead register and inport components like this

Vue.component("BaseIcon", BaseIcon);

It's better to use global registration you can use require.context to globally register
only these very common base componentstake a look here:
https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
*/

/*
We’re using require.context, which is a feature of Webpack.
This is a function that allows you to pass in 3 arguments:
  A directory to search within.
  A flag indicating whether subdirectories should be searched, too.
  A regular expression to match files against.
*/
const requireComponent = require.context(
  "./components", // the relative path of the directory to search
  false, // subdirectories will not be searched
  /Base[A-Z]\w+\.(vue|js)$/ // regular expression that searches for components starting with "Base" and ending in .vue or .js
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1")) // removes what's before and after the filename itself
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
