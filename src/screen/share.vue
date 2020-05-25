<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
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
import * as ImagePicker from "expo-image-picker";

export default {
  components: { Header, Footer },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Signatures",
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
      narrative: store.state.narrative || '',
      signatures: store.state.signatures || {},
      attachment: store.state.attachment || ''
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
    },
  },
  methods: {
    onMenu: function () {
      this.navigation.openDrawer();
    },
    onBack: function () {
      this.navigation.navigate(this.backPage);
    },
    onHome: function () {
      this.navigation.navigate("Home");
    },
    onNext: function () {
      this.navigation.navigate(this.nextPage);
    },
    async createPDF() {
      const docDefinition = {
        content: [
          {
            text: 'Castroville Vol. Fire Company',
            style: 'header',
            alignment: 'center'
          },
          {
            text: 'Fire Run Worksheet',
            style: 'subheader',
            alignment: 'center'
          },
          {
            style: "table",
            table: {
              body: [//number of columns must match in each row
                [
                  { text:`Date: ${this.incident.date}`, rowSpan: 2},
                  { text: `Incident#: ${this.incident.num}`, rowSpan: 2},
                  { text: `Incident Reported: ${this.incident.rep}`, rowSpan: 2},
                  'Alarm Time',` ${this.alarm.alarm_time}`
                ],
                ['','','','Enroute Time',` ${this.alarm.enroute_time}`],
                [
                  { text:`Personnel# ${this.incident.personnel}`, rowSpan: 3},
                  { text: `Medic Unit(s) ${this.incident.medic}`, rowSpan: 3},
                  { text: `Situation Found: ${this.incident.situation}`, rowSpan: 3},
                  'On Scene Time',` ${this.alarm.onscene_time}`
                ],
                ['','','','Fire Controlled Time',` ${this.alarm.fire_control_time}`],
                ['','','','Clear Scene Time',` ${this.alarm.clear_scene_time}`]
              ]
            }
          },
          {
            pageBreak: 'before',
            style: "table",
            table: {
              body: [ //number of columns must match in each row
                ["Apparatus", "Personnel", "Equipment Used","Truck Times"],
                ['','','','' ]
              ]
            },
            layout:{
              //make the first row gray
              fillColor: function(rowIndex){
                return (rowIndex === 0)? '#CCCCCC':null;
              }
            }
          },
          {text:'Version 5 Updated 09/29/2019'}
        ],
        styles: {
          header:{
            fontSize:16,
            bold:true,
            margin:[0,0,0,2]
          },
          subheader:{
            fontSize:14,
            bold:true,
            margin:[0,0,0,5]
          },
          table:{
            margin:[0,5,0,2]
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
  margin: 20;
  padding: 20;
}
.btn {
  margin: 20;
  padding: 20;
  justify-content: center;
  align-items: center;
}
.center {
  justify-content: center;
  align-items: center;
}
.score {
  width: 40;
  height: 40;
  background-color: #fff;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  margin-right: 16;
}
.score-text {
  color: #ff6600;
  font-weight: bold;
}
.detail {
  flex: 1;
}
.name {
  color: #666;
  font-size: 12;
  margin-bottom: 6;
}
.title {
  color: #333;
  font-size: 14;
}
</style>
