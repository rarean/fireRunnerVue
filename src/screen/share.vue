<template>
  <nb-container class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="content" v-if="loaded">
      <view class="btn">
        <nb-button rounded large :on-press="createPDF">
          <nb-text>Create PDF</nb-text>
        </nb-button>
      </view>
    </nb-content>
    <nb-spinner v-if="!loaded"></nb-spinner>
    <footer
      :back-pressed="onBack"
      :home-pressed="onHome"
      :next-pressed="onNext"
    />
  </nb-container>
</template>

<script>
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import store from "../store";
import PdfMake from "pdfmake/build/pdfmake.js";
import PdfFonts from "pdfmake/build/vfs_fonts.js";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import dash from "lodash";

export default {
  components: { Header, Footer },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Signatures2",
      nextPage: "Home",
      incident: store.state.incident || {},
      alarm: store.state.alarms || {},
      location: store.state.location || {},
      response: store.state.response || {},
      actions: store.state.actions || {},
      injured: store.state.injured || {},
      structure: store.state.structure || {},
      bcfmo: store.state.bcfmo || {},
      mutualaid: store.state.mutualaid || [],
      vehicles: store.state.vehicles || [],
      equipment: store.state.equipment || [],
      equip: store.state.equip || {},
      narrative: store.state.narrative || "",
      signatures: store.state.signatures || {},
      attachment: store.state.attachment || ""
    };
  },
  created() {
    this.loaded = true;
    //assign fonts to use w/pdfmake
    PdfMake.fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-MediumItalic.ttf"
      }
    };
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    }
  },
  methods: {
    onMenu() {
      this.navigation.openDrawer();
    },
    onBack() {
      this.navigation.navigate(this.backPage);
    },
    onHome() {
      this.navigation.navigate("Home");
    },
    onNext() {
      this.navigation.navigate(this.nextPage);
    },
    setMain(
      incident,
      alarm,
      location,
      actions,
      structure,
      response,
      injured,
      bcfmo
    ) {
      let sType = structure.type;
      let arson = bcfmo.contact_for_arson;
      let smoke = structure.smoke_detector;
      //control row to know how many cells we can use per row
      //['0','1','2','3','4','5','6','7','8','9','10',
      //'11','12','13','14','15','16','17', '18','19','20','21'
      //]

      return [
        [
          { text: `Date:\n${incident.date}`, rowSpan: 2 },
          { text: `Incident#:\n${incident.num}`, colSpan: 2, rowSpan: 2 },
          "3",
          {
            text: `Incident Reported:\n${incident.rep}`,
            colSpan: 11,
            rowSpan: 2
          },
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          { text: "Alarm Time", colSpan: 7 },
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          { text: `${alarm.alarm_time}` }
        ],
        [
          { text: "", colSpan: 14 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          { text: "Enroute Time", colSpan: 7 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          { text: `${alarm.enroute_time}` }
        ],
        [
          { text: `Personnel#\n${incident.personnel}`, rowSpan: 3 },
          { text: `Medic Unit(s)\n${incident.medic}`, colSpan: 2, rowSpan: 3 },
          "1",
          {
            text: `Situation Found:\n${incident.situation}`,
            colSpan: 11,
            rowSpan: 3
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          { text: "On Scene Time", colSpan: 7 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          { text: ` ${alarm.onscene_time}` }
        ],
        [
          { text: "", colSpan: 14 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          { text: "Fire Controlled Time", colSpan: 7 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          { text: ` ${alarm.fire_control_time}` }
        ],
        [
          { text: "", colSpan: 14 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          { text: "Clear Scene Time", colSpan: 7 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          { text: `${alarm.clear_scene_time}` }
        ],
        [
          {
            text: `Address/Location of Call: ${location.call_location}`,
            colSpan: 8
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          { text: `Zip Code: ${location.call_zip}`, colSpan: 6 },
          "1",
          "2",
          "3",
          "4",
          "5",
          { text: `Responding Departments: ${response.dept}`, colSpan: 8 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ],
        [
          { text: `Owners Name\n${location.owner_name}`, colSpan: 2 },
          "1",
          { text: `Address\n${location.owner_address}`, colSpan: 6 },
          "1",
          "2",
          "3",
          "4",
          "5",
          { text: `City\n${location.owner_city}`, colSpan: 4 },
          "1",
          "2",
          "3",
          { text: `State\n${location.owner_state}`, colSpan: 4 },
          "1",
          "2",
          "3",
          { text: `Phone#\n${location.owner_phone}`, colSpan: 6 },
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        [
          { text: `Actions Taken\n${actions.taken}`, colSpan: 16 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          { text: `Water Used:\n${actions.water_used}`, colSpan: 4 },
          "1",
          "2",
          "3",
          { text: `Foam Used:\n${actions.foam_used}`, colSpan: 2 },
          "1"
        ],
        [
          //calculated based on this.structure.type (sType)
          {
            text: `Residential: ${sType.match(/residential/gi) ? "X" : " "}`,
            colSpan: 5,
            rowSpan: 2
          },
          "1",
          "2",
          "3",
          "4",
          {
            text: `Commercial: ${sType.match(/commercial/gi) ? "X" : " "}`,
            colSpan: 5,
            rowSpan: 2
          },
          "1",
          "2",
          "3",
          "4",
          {
            text: `What is building used for:\n${structure.use}`,
            colSpan: 7,
            rowSpan: 2
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          {
            text: `Mutial Aid to:(Y/N) ${response.mutual_aid_to}`,
            colSpan: 5
          },
          "1",
          "2",
          "3",
          "4"
        ],
        [
          { text: "", colSpan: 17 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          {
            text: `Mutual Aid From:(Y/N) ${response.mutual_aid_from}`,
            colSpan: 5
          },
          "1",
          "2",
          "3",
          "4"
        ],
        [
          { text: `Fatalities: ${injured.fatalities}`, colSpan: 10 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          { text: `Injuries: ${injured.injuries}`, colSpan: 12 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11"
        ],
        [
          {
            text: "Fill out following for all Structure Fires ------>",
            colSpan: 8
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          {
            text: `Suspected Cause of Fire: (Ignition Source)
        ${structure.suspected_cause}`,
            colSpan: 14
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13"
        ],
        [
          { text: "Arson Suspected?  Yes:X No: ", colSpan: 8 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          //calculated based on this.bcfmo.contact_for_arson (arson)
          {
            text: `BCFMO Contacted for Arson Investigation?
        Yes:${arson.match(/Y/gi) ? "X" : " "}  No:${
              arson.match(/N/gi) ? "X" : " "
            }`,
            colSpan: 14
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13"
        ],
        [
          { text: `BCFMO Case# ${bcfmo.case_num}`, colSpan: 8 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          {
            text: `BCFMO Investigator Name: ${bcfmo.investigator}`,
            colSpan: 14
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13"
        ],
        [
          {
            text: `Estimated Cost of Damage: ${structure.estimated_cost}`,
            colSpan: 8
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          { text: "Smoke Detector Operation:", colSpan: 7 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          //calculated based on this.structure.smoke_detector (smoke)
          {
            text: `Yes:${smoke.match(/Y/gi) ? "X" : " "}
        No:${smoke.match(/N/gi) ? "X" : " "} N/A:${
              smoke.match(/NA/gi) ? "X" : " "
            }`,
            colSpan: 7
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6"
        ],
        [
          {
            text: `Property Damaged: ${structure.property_damaged}`,
            colSpan: 8
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          { text: `Acerage Burned: ${structure.acerage_burned}`, colSpan: 7 },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          {
            text: `Main Floor Size (Lgth x Width): ${structure.main_floor_size}`,
            colSpan: 7
          },
          "1",
          "2",
          "3",
          "4",
          "5",
          "6"
        ]
      ];
    },
    setMutualAid(aids) {
      //need to populate Mutual Aid rows from array of mutual aid items
      aids = dash.isEmpty(aids) ? new Array({}, {}, {}, {}) : aids;
      if (aids.length < 4) {
        for (let i = aids.length; i < 4; i++) {
          aids.push({});
        }
      }
      let aidItems = [];
      let aidHeader =
        //fist add Header row for mutual aid items
        [
          { text: "Mutual Aid Department", colSpan: 2 },
          "2",
          { text: "Mutual Aid Apparatus", colSpan: 5 },
          "4",
          "5",
          "6",
          "7",
          { text: "Mutual Aid Personnel", colSpan: 5 },
          "9",
          "10",
          "11",
          "12",
          { text: "Alarm Time", colSpan: 4 },
          "14",
          "15",
          "16",
          { text: "On Scene Time", colSpan: 4 },
          "18",
          "19",
          "20",
          { text: "Clear Scene Time", colSpan: 2 },
          "22"
        ];
      aidItems.push(aidHeader);
      aids = aids.map(function (item, index) {
        return setRow(item, index);
      });
      //consolidate into two dimensional array
      aids.map(function (aid) {
        aidItems.push(aid);
      });
      function setRow(item, index) {
        let col = [];
        for (let i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `aid${index}.${i}`,
                text: `${item.dept || " "}`,
                colSpan: 2
              });
              break;
            case 3:
              col.push({
                id: `aid${index}.${i}`,
                text: `${item.apparatus || " "}`,
                colSpan: 5
              });
              break;
            case 8:
              col.push({
                id: `aid${index}.${i}`,
                text: `${item.personnel || " "}`,
                colSpan: 5
              });
              break;
            case 13:
              col.push({
                id: `aid${index}.${i}`,
                text: `${item.alarm || " "}`,
                colSpan: 4
              });
              break;
            case 17:
              col.push({
                id: `aid${index}.${i}`,
                text: `${item.on_scene || " "}`,
                colSpan: 4
              });
              break;
            case 21:
              col.push({
                id: `aid${index}.${i}`,
                text: `${item.clear_scene || " "}`,
                colSpan: 2
              });
              break;
            default:
              col.push({ id: `aid${index}.${i}`, text: " " });
          }
        }
        return col;
      }
      return aidItems;
    },
    setAutos(vehicles) {
      //need to populate vehicles from array of vehicle info
      //vehicles is empty array or array of objects
      vehicles = dash.isEmpty(vehicles) ? new Array({}, {}, {}) : vehicles;
      if (vehicles.length < 3) {
        for (let i = vehicles.length; i < 3; i++) {
          vehicles.push({});
        }
      }
      let autos = [];
      vehicles = vehicles.map(function (auto, index) {
        if (!dash.isEmpty(auto.make)) {
          auto.make = auto.make.toUpperCase();
        }
        if (!dash.isEmpty(auto.model)) {
          auto.model = auto.model.toUpperCase();
        }
        if (!dash.isEmpty(auto.vin)) {
          auto.vin = auto.vin.toUpperCase();
        }
        if (!dash.isEmpty(auto.plate_num)) {
          auto.plate_num = auto.plate_num.toUpperCase();
        }
        return [
          row1(auto, index),
          row2(auto, index),
          row3(auto, index),
          row4(auto, index)
        ];
      });
      //get two dimensional array
      vehicles.map(function (auto) {
        auto.map(function (row) {
          autos.push(row);
        });
      });
      //number of columns must add up to 22 in each row
      function row1(auto, index) {
        let col = [];
        for (let i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `1${index}.${i}`,
                text: `Owner/Driver Name: ${auto.owner_name || ""}`,
                colSpan: 10,
                border: [true, true, true, false]
              });
              break;
            case 11:
              col.push({
                id: `1${index}.${i}`,
                text: `Driver License: ${auto.dl_num || ""}`,
                colSpan: 12
              });
              break;
            default:
              col.push({ id: `1${index}.${i}`, text: "" });
          }
        }
        return col;
      }
      function row2(auto, index) {
        let col = [];
        let i;
        for (i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `2${index}.${i}`,
                text: `Address: ${auto.address || ""}`,
                colSpan: 10,
                border: [true, false, true, false]
              });
              break;
            case 11:
              col.push({
                id: `2${index}.${i}`,
                text: `Insureance Info: ${auto.insurance || ""}`,
                colSpan: 12,
                rowSpan: 2
              });
              break;
            default:
              col.push({ id: `2${index}.${i}`, text: "" });
          }
        }
        return col;
      }
      function row3(auto, index) {
        let col = [];
        let i;
        for (i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `3${index}.${i}`,
                text: `Phone#: ${auto.phone || ""}`,
                colSpan: 10,
                border: [true, false, true, true]
              });
              break;
            case 11:
              col.push({ id: `3${index}.${i}`, text: "", colSpan: 12 });
              break;
            default:
              col.push({ id: `3${index}.${i}`, text: "" });
          }
        }
        return col;
      }
      function row4(auto, index) {
        let col = [];
        let i;
        for (i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `4${index}.${i}`,
                text: `Make:\n${auto.make || ""}`
              });
              break;
            case 2:
              col.push({
                id: `4${index}.${i}`,
                text: `Model:\n${auto.model || ""}`,
                colSpan: 3
              });
              break;
            case 5:
              col.push({
                id: `4${index}.${i}`,
                text: `Year:\n${auto.year || ""}`
              });
              break;
            case 6:
              col.push({ id: `4${index}.${i}`, text: `\nVIN` });
              break;
            case 7:
              col.push({
                id: `4${index}.${i}`,
                text: `\n${auto.vin || ""}`,
                colSpan: 13
              });
              break;
            case 20:
              col.push({
                id: `4${index}.${i}`,
                text: `License Plate#\n${auto.plate_num || ""}`,
                colSpan: 3
              });
              break;
            default:
              col.push({ id: `4${index}.${i}`, text: "" });
          }
        }
        return col;
      }

      return autos;
    },
    setEquipment(equipList) {
      let list = [
        { apparatus: "LBT-8110" },
        { apparatus: "LBT-8210" },
        { apparatus: "C-8110" },
        { apparatus: "E-8110" },
        { apparatus: "R-8110" },
        { apparatus: "T-8110" },
        { apparatus: "HBT-8110" },
        { apparatus: "Utility 347" },
        { apparatus: "POV" }
      ];
      equipList = dash.isEmpty(equipList) ? list : equipList;
      let missing = dash.differenceBy(list, equipList, function (item) {
        return item.apparatus;
      });
      equipList = dash.union(equipList, missing);
      let items = [];
      let Header = [
        { text: "Apparatus", colSpan: 2 },
        "2",
        { text: "Personnel", colSpan: 9 },
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        { text: "Equipment Used", colSpan: 3 },
        "11",
        "12",
        { text: "Truck Times", colSpan: 8 },
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22"
      ];

      list = equipList.map(function (item) {
        return [row1(item), row2(item)];
      });
      list.map(function (equip) {
        equip.map(function (row) {
          items.push(row);
        });
      });
      items.splice(0, 0, Header); //add header as first row
      //number of columns must add up to 22 in each row
      function row1(item) {
        let col = [];
        for (let i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `${item.apparatus}-1.${i}`,
                text: `${item.apparatus}`,
                rowSpan: 2,
                colSpan: 2
              });
              break;
            case 3:
              col.push({
                id: `1${item.apparatus}-1.${i}`,
                text: `${item.personnel || " "}`,
                colSpan: 9,
                rowSpan: 2
              });
              break;
            case 12:
              col.push({
                id: `1${item.apparatus}-1.${i}`,
                text: `${item.equip_used || " "}`,
                colSpan: 3,
                rowSpan: 2
              });
              break;
            case 15:
              col.push({
                id: `1${item.apparatus}-1.${i}`,
                text: "On Scene Time",
                colSpan: 7
              });
              break;
            case 22:
              col.push({
                id: `1${item.apparatus}-1.${i}`,
                text: `${item.onscene_time || " "}`
              });
              break;
            default:
              col.push({ id: `1${item.apparatus}-1.${i}`, text: " " });
          }
        }
        return col;
      }
      function row2(item) {
        let col = [];
        let i;
        for (i = 1; i <= 22; i++) {
          switch (i) {
            case 1:
              col.push({
                id: `${item.apparatus}-2.${i}`,
                text: " ",
                colSpan: 14
              });
              break;
            case 15:
              col.push({
                id: `${item.apparatus}-2.${i}`,
                text: "Clear Scene Time",
                colSpan: 7
              });
              break;
            case 22:
              col.push({
                id: `${item.apparatus}-2.${i}`,
                text: `${item.clear_scene_time || " "}`
              });
              break;
            default:
              col.push({ id: `${item.apparatus}-2.${i}`, text: " " });
          }
        }
        return col;
      }
      return items;
    },
    setEquipInfo(equip) {
      equip = dash.isEmpty(equip) ? {} : equip;
      let info = [];
      info.push([
        { text: "Standby", colSpan: 2 },
        "2",
        { text: "", colSpan: 20 },
        "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
      ]);
      info.push([
        { text: `Equipment Stolen:\n${equip.stolen || " "}`, colSpan: 7 },
        "2", "3", "4", "5", "6", "7",
        { text: `Equipment Lost:\n${equip.lost || " "}`, colSpan: 8 },
        "9", "10", "11", "12", "13", "14", "15",
        { text: `Equipment Broken:\n${equip.broken || " "}`, colSpan: 7 },
        "17", "18", "19", "20", "21", "22"
      ]);
      info.push([
        { text: `Receipts Bagged: ${equip.receipts || " "}`, colSpan: 11 },
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
        { text: `Truck Restocked: ${equip.restocked || " "}`, colSpan: 11 },
        "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
      ]);
      return info;
    },
    setSignatures(sigs, narrate) {
      sigs = dash.isEmpty(sigs) ? {} : sigs;
      narrate = dash.isEmpty(narrate) ? "  " : narrate;
      let data = [];
      let img = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
      data.push([
        {
          text: `Person Making Report (Print):  ${sigs.reporter || " "}`,
          colSpan: 11
        },
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
        {
          text: `Officer In Charge (Print):  ${sigs.officer || " "}`,
          colSpan: 11
        },
        "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
      ]);
      data.push([
        { text: `Narrative:\n${narrate}`, colSpan: 22 },
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"
      ]);
      data.push(
      [
        { text: `Signature\nRequired`, colSpan: 2 }, "2",
        { text: `Person Making Report:`, colSpan: 4, border:[true,false,false,true] },
        "4", "5", "6",
        { image: `data:image/png;base64, ${sigs.reporter_image || img}`, 
        colSpan: 5,border:[false,true,true,true], height:50,width:125 },
        "8", "9", "10","11",
        { text: `Officer In Charge:`, colSpan: 5, border:[true,false,false,true] },
        "13", "14", "15", "16",
        { image: `data:image/png;base64, ${sigs.officer_image || img}`,
        colSpan: 6,border:[false,true,true,true], height:50,width:125 },
        "18", "19", "20", "21","22"
      ]);
      return data;
    },
    //See PDFmake https://pdfmake.github.io/docs/getting-started
    async createPDF() {
      let page1 = this.setMain(
        this.incident,
        this.alarm,
        this.location,
        this.actions,
        this.structure,
        this.response,
        this.injured,
        this.bcfmo
      );
      let aids = this.setMutualAid(this.mutualaid);
      let autos = this.setAutos(this.vehicles);
      aids.map(function (item) {
        page1.push(item);
      });
      autos.map(function (auto) {
        page1.push(auto);
      });

      let page2 = this.setEquipment(this.equipment);
      let equipInfo = this.setEquipInfo(this.equip);
      let sigs = this.setSignatures(this.signatures, this.narrative);
      equipInfo.map(function (info) {
        page2.push(info);
      });
      sigs.map(function (data) {
        page2.push(data);
      });

      const docDefinition = {
        content: [
          {
            text: "Castroville Vol. Fire Company",
            style: "header",
            alignment: "center"
          },
          {
            text: "Fire Run Worksheet",
            style: "subheader",
            alignment: "center"
          },
          {
            id: "page1",
            style: "table",
            table: {
              //number of columns must add up to 22 in each row
              body: page1
            }
          },
          {
            id: "page2",
            pageBreak: "before",
            style: "table",
            table: {
              widths: [
                "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "auto", "auto", "auto", "auto", "auto", "auto", "*", "*", "*", "*", "*"
              ],
              body: page2
            },
            layout: {
              //make the first row gray
              fillColor: function (rowIndex) {
                return rowIndex === 0 ? "#CCCCCC" : null;
              }
            }
          },
          { text: "Version 5 Updated 09/29/2019" }
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 2]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          table: {
            margin: [0, 5, 0, 2],
            fontSize: 9
          }
        }
      };

      try {
        const DIR = FileSystem.documentDirectory;
        const FILE = DIR + "worksheet.pdf";
        const ENCODE = FileSystem.EncodingType.Base64;
        const PDF = PdfMake.createPdf(docDefinition);
        PDF.getBase64(data => {
          FileSystem.writeAsStringAsync(FILE, data, { encoding: ENCODE });
          async () => {
            consol.log("check shareing");
            if (!(await Sharing.isAvailableAsync())) {
              alert("Sharing is not available on your device");
            }
          };

          Sharing.shareAsync(FILE, {
            mimeType: "application/pdf",
            dialogTitle: "WorksheetPDF",
            UTI: "public.item"
          });
        });
      } catch (error) {
        console.log("something wrong", error);
        alert("Something went wrong");
      }
    }
  }
};
</script>

<style>
.container {
  flex: 1;
  background-color: #fff;
}
.content {
  margin-top: 20;
  padding: 20;
}
.btn {
  align-self: center;
  margin-top: 20;
  padding: 20;
}
</style>
