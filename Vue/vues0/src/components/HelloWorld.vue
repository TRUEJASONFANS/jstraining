<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span v-once>这个将不会改变: {{ finalMsg }}</span>
    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <button :disabled="isButtonDisabled">Button</button>
    <p v-if="seen">现在你看到我了</p>
    <a :href="url" @click="doSomething">v-bind 缩写:, v-on缩写</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Mucher语法",
      finalMsg:"v-once 不变的文本",
      rawHtml: "<span style='color:red'>v-html运行模本里html</span>",
      isButtonDisabled:true,
      seen:true,
      url:"http://www.163.com",
      doSomething : function() {alert("clicked");}
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
