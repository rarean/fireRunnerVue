<template>
  <nb-form>
    <nb-item floatingLabel>
      <nb-label>Owner/Driver Name </nb-label>
      <nb-input v-model="owner_name" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Address </nb-label>
      <nb-input v-model="address" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Phone </nb-label>
      <nb-input v-model="phone" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Driver License </nb-label>
      <nb-input v-model="dl_num" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Insurance Info </nb-label>
      <nb-input v-model="insurance" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Make </nb-label>
      <nb-input v-model="make" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Model </nb-label>
      <nb-input v-model="model" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Year </nb-label>
      <nb-input v-model="year" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>VIN </nb-label>
      <nb-input v-model="vin" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>License Plate# </nb-label>
      <nb-input v-model="plate_num" />
    </nb-item>
    <nb-item class="btn">
      <nb-button rounded large :on-press="addAid">
        <nb-text>ADD</nb-text>
      </nb-button>
    </nb-item>
  </nb-form>
</template>

<script>
export default {
  props: {
    onAdd: Function
  },
  data: function () {
    return {
      owner_name: "",
      address: "",
      phone: "",
      dl_num: "",
      insurance: "",
      make: "",
      model: "",
      year: "",
      vin: "",
      plate_num: ""
    };
  },
  methods: {
    addAid() {
      let obj = {
        owner_name: this.owner_name,
        address: this.address,
        phone: this.phone,
        dl_num: this.dl_num,
        insurance: this.insurance,
        make: this.make,
        model: this.model,
        year: this.year,
        vin: this.vin,
        plate_num: this.plate_num
      };
      this.onAdd(obj);
      this.owner_name = "";
      this.address = "";
      this.phone = "";
      this.dl_num = "";
      this.insurance = "";
      this.make = "";
      this.model = "";
      this.year = "";
      this.vin = "";
      this.plate_num = "";
    }
  }
};
</script>
<style>
.btn {
  margin: 10;
  padding: 10;
  align-self: center;
}
</style>
