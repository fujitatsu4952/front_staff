<template>
  <div id="app">
    <div>
      <select class="select-hotel" v-model="select_hotel">
        <option selected disabled style="display:none;" value>ホテルを選択してください</option>
        <option v-for="(item) in hotels" :key="item.id">{{item.hotel_id}},{{item.hotel_name}}</option>
      </select>
    </div>

    <div>
      <input class="input_detail" type="text" placeholder="名前 or 予約番号" v-model="checkin_name_or_id" />
      <input class="input_detail" type="date" placeholder="日付" v-model="checkin_date" />
      <br />
      <button class="btn-square" @click="search">取得</button>

      <table border="2" cellspacing="0" cellpadding="5" bordercolor="efefef">
        <tr bgcolor="e5e5e5">
          <th width="120">QRコード表示</th>
          <th width="150">予約番号</th>
          <th width="200">チェックイン日</th>
          <th width="50">泊数</th>
          <th width="150">宿泊者指名</th>
          <th width="200">部屋マスタ</th>
          <th width="200">チェックイン時間</th>
          <th width="100">status</th>
          <th width="150">担当</th>
        </tr>
        <tr v-for="(searched_result, idx) in search_results" :key="searched_result.id">
          <td width="120">
            <button class="btn-square" @click="getqr(idx)">QRコード生成</button>
          </td>
          <td width="150">{{searched_result.reservation_id}}</td>
          <td width="150">{{(getDateStatement(searched_result.checkin_date))}}</td>
          <td width="50">{{searched_result.staying_days}}</td>
          <td width="200">{{searched_result.name}}</td>
          <td width="150">{{searched_result.room_type}}</td>
          <td width="200">{{(getTimeStatement(searched_result.checkingtime))}}</td>
          <!-- 以下二行はチェックイン済みか否かにに応じて描画する -->
          <td width="100" v-if="searched_result.status === '済'">{{searched_result.status}}</td>
          <td
            width="100"
            v-if="searched_result.status === '未'"
            class="yet"
          >{{searched_result.status}}</td>
          <td width="150">{{searched_result.staff_name}}</td>
        </tr>
      </table>
    </div>
    <br />
    <footer>
      <button @click="onclick"><span style="border-bottom: solid 2px #2c3e50;">施設の追加/パスワードの変更はこちら</span></button>
    </footer>
  </div>
</template>

<script>
import { callApi, post } from "../api.js";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

export default {
  name: "app",
  // コンポーネントで指定するのはmain.jsに読ませるため。ただ。api.jsファイルからきている{callApi, post}はjava scriptからきているものなのでコンポーネントにまとめる必要はない。
  data() {
    return {
      hotels: [],
      select_hotel: "",
      checkin_name_or_id: "",
      checkin_date: "",
      search_results: [],
      find_time: [],
      status: true
    };
  },
  methods: {
    
    callApi(url) {
      Api.callApi(url, this.setInfo);
    },

    search() {
      post("http://localhost:3005/api/v1/", {
        checkin_name_or_id: this.checkin_name_or_id,
        select_hotel: this.select_hotel,
        checkin_date: this.checkin_date
      }).then(res => {
        console.log(res.data);
        this.search_results = res.data;
      });
    },

    getTimeStatement(time) {
      return dayjs(time).format("YYYY/MM/DD HH:mm:ss");
    },
    getDateStatement(time) {
      return dayjs(time).format("YYYY/MM/DD");
    },

    getqr(i) {
      this.$router.push({ path: 'qrcode', query: { name: this.search_results[i].name, tell: this.search_results[i].tell_number, reserve: this.search_results[i].reservation_id, hotel:this.search_results[i].hotel_id }});
    },

    onclick() {
      this.$router.push("/hotel");
    },
  },
  mounted() {
    console.log(process.env);
    console.log(process.env.VUE_APP_API_URL_BASE);
    callApi("http://localhost:3005/api/v1/").then(data => {
      console.log(JSON.stringify(data.data));
      var i = data.data[data.data.length - 1];
      for (var i = 0; i < data.data.length; i++) {
        this.hotels.push(data.data[i]);
      }
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

.select-hotel {
  text-align: center;
  width: 20%;
  height: 40px;
  padding-left: 30px;
  border: 2px solid #b4b3b3;
  border-radius: 4px;
  border-bottom: solid 4px #b4b4b4;
}

.input_detail {
  text-align: center;
  margin: 10px;
  width: 20%;
  height: 40px;
  border: 2px solid #b4b3b3;
  border-radius: 4px;
  border-bottom: solid 4px #b4b4b4;
}

table {
  margin: auto;
}
tr:hover {
  background-color: #e6e6e6; /* マウスオーバー時の行の背景色 */
}
td:hover {
  background-color: rgb(194, 184, 184); /* マウスオーバー時のセルの背景色 */
}
.yet {
  background-color: pink;
}

.btn-square {
  width: 150px;
  border-radius: 20px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #a4a4a4; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #b4b4b4;
  font-weight: bold;
}
.btn-square:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2); /*影を小さく*/
  border-bottom: none;
}
</style>


