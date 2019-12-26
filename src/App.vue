<template>
  <v-app>
    <div id="app">
      <div>
        <p>ホテルを選択する</p>
        <select class="select" name id v-model="hotel" >
          <option  selected >ホテルを選択してください</option>
          <option  v-for="(item) in res" :key="item.id">{{item.hotel_id}},{{item.hotel_name}}</option>
        </select>
      </div>

      <div class="inputWithIcon" >
        <div style="display:inline-flex">
          <input placeholder="名前 or 予約番号" type="text" v-model="search" />

          <label>
            <input type="date" placeholder="日付" v-model="date" />
          </label>
        </div>
        <br />
        <button class="btn-square-shadow" @click="look">取得</button>

        <table border="1" cellspacing="0" cellpadding="5" bordercolor="efefea">
        <tr>
        <th bgcolor="e5e5e5"><font color=black>QRコード表示</font></th>
        <th bgcolor="e5e5e5" width="150"><font color="black">予約番号</font></th>
        <th bgcolor="e5e5e5" width="200"><font color="black">チェックイン日</font></th>
        <th bgcolor="e5e5e5" width="50"><font color="black">泊数</font></th>
        <th bgcolor="e5e5e5" width="200"><font color="black">宿泊者指名</font></th>
        <th bgcolor="e5e5e5" width="200"><font color="black">部屋マスタ</font></th>
        <th bgcolor="e5e5e5" width="200"><font color="black">チェックイン時間</font></th>
        <th bgcolor="e5e5e5" width="200"><font color="black">status</font></th>
        <th bgcolor="e5e5e5" width="200"><font color="black">担当</font></th>
        </tr>
        <tr bgcolor=white v-for="(finds, idx) in find" :key="finds.id">
        <td  nowrap><button class="btn-square-shadow" @click="getqr(idx)">QRコード生成</button></td>
        <td  nowrap>{{finds.reservation_id}}</td>
        <td  width="150">{{(getDateStatement(finds.checkin_date))}}</td>
        <td  width="50">{{finds.staying_days}}</td>
        <td  width="200">{{finds.name}}</td>
        <td  width="200">{{finds.room_type}}</td>
        <td  width="200">{{(getTimeStatement(finds.checkingtime))}}</td>
        <td  width="200" v-if="finds.status === '済'">{{finds.status}}</td>
        <td  width="200" class="yet" v-if="finds.status === '未'">{{finds.status}}</td>
        <td  width="200">{{finds.staff_name}}</td>
        </tr>        
        </table>
      </div>

      <footer>
       <a href="http://localhost:8082/">施設の追加/パスワードの変更はこちら</a>
      </footer>
    </div>
  </v-app>
</template>

<script>
import Hello from "./components/HelloWorld.vue";
import { callApi, post } from "./api.js";
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
dayjs.locale('ja');


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
      find: [],
      find_time: [],
      status:true,
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
        console.log(res.data);
        this.find = res.data;
      });
      },
    
    getTimeStatement(time) {
      return dayjs(time).format('YYYY/MM/DD HH:mm:ss');
      },

    getDateStatement(time) {
      return dayjs(time).format('YYYY/MM/DD' );
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
    },
   
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
table {
  margin: auto;
}

tr:hover {
background-color: #e6e6e6; /* マウスオーバー時の行の背景色 */
}
td:hover {
background-color: rgb(194, 184, 184); /* マウスオーバー時のセルの背景色 */
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color:white;
}


input[type="text"] {
  width: 300px;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
}

.yet{
  background-color: pink;
}

input[type="text"]:focus {
  border-color: dodgerBlue;
  box-shadow: 0 0 8px 0 dodgerBlue;
}

.inputWithIcon input[type="text"] {
  padding-left: 40px;
}

.inputWithIcon {
  position: relative;
}

.inputWithIcon i {
  position: absolute;
  left: 0;
  top: 8px;
  padding: 9px 8px;
  color: #aaa;
  transition: 0.3s;
}

.inputWithIcon input[type="text"]:focus + i {
  color: dodgerBlue;
}

.inputWithIcon.inputIconBg i {
  background-color: #aaa;
  color: #fff;
  padding: 9px 4px;
  border-radius: 4px 0 0 4px;
}

.inputWithIcon.inputIconBg input[type="text"]:focus + i {
  color: #fff;
  background-color: dodgerBlue;
}

label {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 45px;
  border: 2px solid #aaa;
  border-radius: 15px;
  margin: 7px 10px;
}
input[type="date"] {
  position: relative;
  padding: 5px 10px;
  width: 250px;
  height: 45px;
  border: 0;
  background: transparent;
  box-sizing: border-box;
  font-size: 14px;
  color: #161515;
}

.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20%;
  height: 40px;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0 40px 0 10px;
  border: 2px solid #b4b3b3;
  border-radius: 4px;
  border-bottom: solid 4px #b4b4b4;
}

.btn-square-shadow {
  width:150px;
  border-radius: 20px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #a4a4a4; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #b4b4b4;
}
.btn-square-shadow:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2); /*影を小さく*/
  border-bottom: none;
}

</style>


