<template>
  <div class="TextAnime1">
    <transition-group tag="div" class="title">
      <span v-for="el in text" :key="el.id" class="item" v-text="el.text" />
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    autoplay: Boolean,
    hotelurl: String
  },

  data() {
    return {
      timer: null,
      index: 0,
      // オリジナルメッセージ
      osaka: [
        "HOTEL SHE ,OSAKAへようこそ",
        "Welcome to HOTEL SHE ,OSAKA",
        "欢迎光临HOTEL SHE ,OSAKA"
      ],
      kyoto: [
        "HOTEL SHE ,KYOTOへようこそ",
        "Welcome to HOTEL SHE ,KYOTO",
        "欢迎光临HOTEL SHE ,KYOTO"
      ],
      furano: [
        "Petit-hotel #melonへようこそ",
        "Welcome to Petit-hotel #melon",
        "欢迎光临Petit-hotel #melon"
      ],
      yugawara: [
        "The Ryokan Tokyo YUGAWARAへようこそ",
        "Welcome to The Ryokan Tokyo YUGAWARA",
        "欢迎光临The Ryokan Tokyo YUGAWARA"
      ],
      sounkyo: [
        "HOTEL KUMOIへようこそ",
        "Welcome to HOTEL KUMOI",
        "欢迎光临HOTEL KUMOI"
      ],
      // 分解したメッセージ
      messages: [],
      text: ""
    };
  },
  computed: {},
  watch: {
    autoplay(val) {
      clearTimeout(this.timer);
      if (val) {
        this.ticker();
      }
    }
  },
  methods: {
    // デモ用のオートタイマー
    ticker() {
      this.timer = setTimeout(() => {
        if (this.autoplay) {
          this.index =
            this.index < this.messages.length - 1 ? this.index + 1 : 0;
          this.text = this.messages[this.index];
          this.ticker();
        }
      }, 5000);
    },
    // テキストを分解してオブジェクトに
    convText(text) {
      const alms = {};
      const result = text.split("").map(el => {
        alms[el] = alms[el] ? ++alms[el] : 1;
        return { id: `${el}_${alms[el]}`, text: el };
      });
      return Object.freeze(result); // 監視しない
    },
    hotelText(hotel) {
      if (hotel === "2") {
        this.messages = this.kyoto.map(el => this.convText(el));
      } else if (hotel === "1") {
        this.messages = this.furano.map(el => this.convText(el));
      } else if (hotel === "3") {
        this.messages = this.osaka.map(el => this.convText(el));
      } else if (hotel === "4") {
        this.messages = this.sounkyo.map(el => this.convText(el));
      } else if (hotel === "5") {
        this.messages = this.yugawara.map(el => this.convText(el));
      }
      this.text = this.messages[0];
      this.ticker();
    }
  },

  created() {
    this.hotelText(this.hotelurl);
  }
};
</script>

<style scoped>
.title {
  font-size: 50px;
}
.item {
  display: inline-block;
  min-width: 0.3em;
}
/* トランジション用スタイル */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 1.5s;
}
.v-leave-active {
  position: absolute;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.TextAnime1 {
  margin: 0 auto;
  width: 1000px;
}
</style>