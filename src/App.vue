<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/hotel/kumoi.png" />
    <Hello main="管理者画面" />test
    <div class="under">
      <p>
        ホテルを選択する
        <select v-model="hotel">
          <option v-for="(item) in res" :key="item.id">{{item.hotel_id}},{{item.hotel_name}}</option>
        </select>
      </p>
    </div>
    <div class="under" v-if="hotel">
      <p>
        名前 or 予約番号
        <input type="text" v-model="search" />
      </p>
      <p>
        日付
        <input type="date" v-model="date" />
        {{date}}
      </p>
    </div>
    <button @click="look">検索</button>
    <ul>
      <li>予約者番号//チェックイン日//泊数//宿泊者氏名//部屋マスタ//チェックインタイム//status//担当</li>
      <!-- url生成はbuttonメソッドを使うことで生成する。 -->
      <li v-for="(finds, idx) in find" :key="finds.id">
        <button @click="getqr(idx)">QRコード生成</button>
        {{finds.reservation_id}}//{{finds.checkin_date}}//{{finds.staying_days}}//{{finds.name}}//{{finds.room_type}}//{{finds.checkin_time}}//{{finds.staff_name}}///{{finds.tell_number}}
      </li>
    </ul>
    <a href="http://localhost:8082/">施設を追加する/パスワードを変更する</a>
    <p>
      チェックイン画面はこちら→
      <a href="http://localhost:8083/">check in</a>
    </p>
  </div>
</template>

<script>
import Hello from "./components/HelloWorld.vue";
import { callApi, post } from "./api.js";

// <title>タグはhtmlに存在するタグなので使えなかった。

export default {
  name: "app",
  components: {
    Hello
    // コンポーネントで指定するのはmain.jsに読ませるため。ただ。api.jsファイルからきている{callApi, post}はjava scriptからきているものなのでコンポーネントにまとめる必要はない。
  },
  data() {
    return {
      customer: "お客さん情報",
      res: [],
      hotel: "",
      search: "",
      date: "",
      find: []
    };
  },
  methods: {
    callApi(url) {
      Api.callApi(url, this.setInfo);
    },

    look() {
      post("http://localhost:3005/api/v1/", {
        search: this.search,
        hotel: this.hotel,
        date: this.date
      }).then(res => {
        this.find = res.data;
      });
    },

    goItem() {
      callApi("http://localhost:3005/api/v1/", {
        // name: this.name
      }).then(res => {
        console.log(res);
        // this.res = res これはとりあえずresをthis.resに挿入している。
        // var i = res.data[res.data.length - 1];
        for (var i = 0; i < res.data.length; i++) {
          this.res.push(res.data[i]);
          // 上の一文では配列にpushしている
        }
      });
    },
    getqr(i) {
      location.href = `http://localhost:8081/?z=${this.find[i].name}&bb=${this.find[i].tell_number}&cc=${this.find[i].reservation_id}&dd=${this.find[i].hotel_id}`;
    }
  },
  mounted() {
    callApi("http://localhost:3005/api/v1/").then(data => {
      console.log(JSON.stringify(data.data));
      var i = data.data[data.data.length - 1];
      for (var i = 0; i < data.data.length; i++) {
        this.res.push(data.data[i]);
      }
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.under {
  text-decoration: underline;
}
</style>


