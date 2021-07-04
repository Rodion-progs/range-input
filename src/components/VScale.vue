<template>
  <div class="range" ref="range" @mousemove="doDrag">
    <div class="range__indicator">
      <span  class="range__indicator-item" v-for="i in dates" :key="i + Math.random()"></span>
    </div>
    <div class="range__list">
      <span class="range__item" v-for="i in dates" :key="i + Math.random()">{{
        new Date(i).toLocaleDateString()
      }}</span>
    </div>
    <div
      class="range__control"
      :style="{ width: width + 'px', left: left + 'px' }"
    >
      <div class="range__control-connector"></div>
      <div class="range__control-target range__control-target_left">
        <button
          @mousedown="startDrag($event, 'left')"
          class="range__control-button range__control-button_left"
        ></button>
      </div>
      <div class="range__control-target range__control-target_right">
        <button
          @mousedown="startDrag($event, 'right')"
          class="range__control-button range__control-button_right"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VScale",
  props: {
    start: {
      type: String,
      default: "",
    },
    end: {
      type: String,
      default: "",
    },
    controls: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      left: 0,
      width: 0,
      rangeWidth: 0,
      dragging: false,
      delta: 0,
      dragStart: "",
      active: "",
      selectedDate: {
        start: 0,
        end: 0,
      },
      initialDate: {
        start: "",
        end: "",
      },
    };
  },
  created() {
    this.initialDate.start = this.formattedDate(this.start);
    this.initialDate.end = this.formattedDate(this.end);
  },
  computed: {
    range() {
      return this.initialDate.end - this.initialDate.start;
    },
    dates() {
      // here 150 is width for show one date
      let quantity = this.rangeWidth / 150;
      let part = this.range / quantity;
      let rangeArray = [];
      for (let i = 0; i < quantity; i++) {
        rangeArray.push(part * i + this.initialDate.start);
      }
      rangeArray.push(this.initialDate.end);
      return rangeArray;
    },
  },
  mounted() {
    window.addEventListener("mouseup", this.stopDrag);
    this.rangeWidth = this.$refs.range.clientWidth;
    this.width = this.rangeWidth;
    this.selectDate();
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.stopDrag);
  },
  methods: {
    formattedDate(date) {
      let today = this.$moment().valueOf();
      let tomorrow = this.$moment().add(1, "days").valueOf();
      let yesterday = this.$moment().add(-1, "days").valueOf();
      if (date === "сегодня") {
        return today;
      }
      if (date === "завтра") {
        return tomorrow;
      }
      if (date === "вчера") {
        return yesterday;
      }
      return this.$moment(date).valueOf();
    },
    resize() {},
    mousemove(type, e) {
      console.log(e.movementX);
    },
    startDrag(event, type) {
      this.dragging = true;
      this.active = type;
      this.dragStart = event.clientX;
    },
    stopDrag() {
      this.dragging = false;
    },
    selectDate() {
      const ratio = (this.range / this.rangeWidth)
      this.selectedDate.start = this.initialDate.start + Math.round( ratio * this.left);
      this.selectedDate.end = this.initialDate.start + Math.round(ratio * (this.left + this.width));
      this.$emit(
        "input",
        `${this.$moment(this.selectedDate.start).calendar()},
            ${this.$moment(this.selectedDate.end).calendar()}`
      );
    },
    doDrag(event) {
      if (this.dragging) {
        if (this.active === "left") {
          this.left <= 0 ? this.left = 0 : null;
          this.left = this.left + (event.clientX - this.dragStart);
          if (this.width <= 5 && event.movementX) {
            this.width++;
          } else {
            console.log(event.movementX)
            this.width = this.width - (event.clientX - this.dragStart);
          }
        } else {

          console.log(this.width <= 5 )
          console.log( event.movementX)
          console.log(this.width)
          console.log( !!event.movementX)
          if (this.width <= 5 && !!event.movementX) {
            event.movementX > 0 ? this.width++ : null;
            this.left = this.left + (event.clientX - this.dragStart);
          } else {
            this.width = this.width + (event.clientX - this.dragStart);
          }
        }

        // this.width + this.left > this.rangeWidth ? this.width = this.rangeWidth - this.left : null;
        this.dragStart = event.clientX;
        this.selectDate();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.range {
  position: relative;
  width: 100%;
  height: 100px;
  background-color: beige;
}
.range__indicator {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.range__indicator-item {
  display: block;
  width: 1px;
  height: 10px;
  background-color: gray;
}
.range__list {
  display: flex;
  justify-content: space-between;
}
.range__control {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: rgba(#fefefe, 0.8);
}
.range__control-button {
  width: 10px;
  position: absolute;
  right: -5px;
  top: 0;
  height: 100px;
  background-color: blue;
  border: none;
  cursor: grab;
}
.range__control-target {
  position: absolute;
  top: 0;
  z-index: 5;
}
.range__control-target_left {
  left: 0;
}
.range__control-target_right {
  right: 0;
}
</style>
