<template>
  <div>
    <TextAnimeTop :autoplay="autoplay" />
    <vue-qrcode :value="getUrl" :options="option" tag="img"></vue-qrcode>
    <!-- v-ifがどんな感じなのかを調べる →指定した先がtrueの場合は実行されるというもの。 -->
    <!-- コロン(:)により静的な値の代わりに、変数、計算されたものなどを（もちろんコンポーネントから）属性値として使用できます。要はv-bindの省略 -->
    <!-- v-bindで指定したクラスの中の””(ダブルクォーテーション中)はjavascriptになる。よって、下部のデータで保持している値に対しては何も記号を付すことなくアクセスできる。 -->
    <TextAnimeMiddle :autoplay="autoplay" />
    <TextAnimeBottom :autoplay="autoplay" />
    <p class="click">
      →
      <a :href="getUrl" class="click">click</a>
    </p>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import TextAnimeTop from "./TextAnime-top";
import TextAnimeMiddle from "./TextAnime-middle";
import TextAnimeBottom from "./TextAnime-bottom";

export default {
  components: {
    VueQrcode,
    TextAnimeTop,
    TextAnimeMiddle,
    TextAnimeBottom
  },
  data() {
    return {
      autoplay: true,
      option: {
        errorCorrectionLevel: "M",
        maskPattern: 0,
        margin: 10,
        scale: 2,
        width: 300,
        color: {
          dark: "#000000FF",
          light: "#FFFFFFFF"
        }
      },
      url: ""
    };
  },

  mounted() {
    var url = window.location.href;
    var decoded = decodeURI(url); //日本語が入ったURLクエリにも対応する為のデコード
    decoded.split("?")[1].split("&");
    const map = {};
    decoded
      .split("?")[1]
      .split("&")
      .forEach(autoform => {
        const parsed = autoform.split("=");
        map[parsed[0]] = parsed[1];
      });
    this.url = map;
  },

  // computedという概念。常に保持しているデータの内容が変わるたびに自動でデータ更新がされ続ける。これまで使ってきたmethodの自動化みたいなもの。
  computed: {
    getUrl() {
      return `http://localhost:8081/qrcode/?name=${this.url.name}&tell=${this.url.tell}&reserve=${this.url.reserve}&hotel=${this.url.hotel}`;
    }
  }
};
</script>
<style>
.click {
  font-weight: bold;
  color: aliceblue;
}
</style>