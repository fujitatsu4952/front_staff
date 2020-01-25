<template>
  <div id="app" class="margintop">
    <div>
      <table border="1" cellspacing="0" cellpadding="5" bordercolor="#efefef" class="table-main">
        <tr>
          <th class="table-th">施設名</th>
          <th class="table-th">ホテルID</th>
          <th class="table-th">パスワード</th>
        </tr>

        <tr v-for="item in res" :key="item.id">
          <td>
            <input type="text" v-model="item.hotel_name" />
          </td>
          <td class="hotelid">{{ item.hotel_id }}</td>
          <!-- ホテルidは読み取り専用 -->
          <td>
            <input type="text" v-model="item.hotel_pass" />
          </td>
          <!-- tdでの変更をpostするbuttonメソッド -->
          <button
            class="btn-square small-btn"
            @click="update_hotel(item.hotel_name, item.hotel_id, item.hotel_pass)"
          >変更</button>
        </tr>
      </table>
    </div>
    <h4>施設を追加</h4>
    <p>
      施設名:
      <input class="input_new_hotel" type="text" v-model="new_hotel_name" />
    </p>
    <p>
      ホテルID:
      <input class="input_new_hotel" type="text" v-model="new_hotel_id" />
    </p>
    <p>
      ホテルパスコード:
      <input class="input_new_hotel" type="text" v-model="new_hotel_pass" />
    </p>
    <br />
    <div>
      <button class="btn-square" @click="add_new_hotel">追加</button>
    </div>
  </div>
</template>

<script>
import { callApi, post } from "../api";

export default {
  data() {
    return {
      res: [],
      new_hotel_name: "",
      new_hotel_id: "",
      new_hotel_pass: ""
    };
  },
  methods: {
    update_hotel(updated_hotel_name, hotel_id, updated_hotel_pass) {
      post("http://localhost:3005/api/v1/update", {
        hotel_name: updated_hotel_name,
        hotel_id: hotel_id,
        hotel_pass: updated_hotel_pass
      }).then(res => {
        console.log(res);
      });
    },

    add_new_hotel() {
      post("http://localhost:3005/api/v1/insert", {
        new_hotel_name: this.new_hotel_name,
        new_hotel_id: this.new_hotel_id,
        new_hotel_pass: this.new_hotel_pass
      }).then(res => {
        console.log(res);
      });
    }
  },

  mounted() {
    callApi("http://localhost:3005/api/v1/hotel").then(data => {
      console.log(JSON.stringify(data.data));
      var i = data.data[data.data.length - 1];
      for (var i = 0; i < data.data.length; i++) {
        this.res.push(data.data[i]);
      }
    });
  }
};
</script>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.margintop {
  margin-top: 60px;
}

.table-main {
  margin: 0 auto;
  border-color: #efefef;
}
tr:hover {
  background-color: #e6e6e6; /* マウスオーバー時の行の背景色 */
}
td:hover {
  background-color: rgb(194, 184, 184); /* マウスオーバー時のセルの背景色 */
}
.table-th {
  padding: 0%;
  background-color: #e5e5e5;
  color: black;
}
.hotelid {
  font-weight: bold;
  width: 100px;
}

input {
  text-align: center;
  font-weight: bold;
  border: none;
}
.input_new_hotel {
  border-bottom: 2px solid #a4a4a4;
  border-right: none;
  border-left: none;
  border-top: none;
}

.btn-square {
  width: 150px;
  border-radius: 20px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #a4a4a4;
  color: #fff;
  border-bottom: solid 4px #b4b4b4;
}
.small-btn {
  width: 70px;
}
.btn-square:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2); /*影を小さく*/
  border-bottom: none;
}
</style>
