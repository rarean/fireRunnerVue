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
import dash from 'lodash';

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
    setAutos(autos){
      //have autos Array [
      //  Object {
      //    "address": "123 Somewhere",
      //    "dl_num": "15983445",
      //    "insurance": "Geico",
      //    "make": "Chevy",
      //    "model": "Impalla",
      //    "owner_name": "John Doe",
      //    "phone": "210-867-5309",
      //    "plate_num": "DTY-D0G",
      //    "vin": "12345TE8G5G23E964",
      //    "year": "1960",
      //  },
      //]
      let emptyRow1 = [{text:'Owner/Driver Name:'},{text:'Driver License:'}];
      let emptyRow2 = ['Address','Insurance Info:'];
      let emptyRow3 = ['Phone #']
      let noVin = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
      let info = ['Make:','Model:','Year:','VIN'];
      let emptyAutoRow4 = dash.flattenDeep([info,noVin,'License Plate#']);
      emptyAutoRow4 = emptyAutoRow4.map(function(item){ return {text:item, rowSpan:2} });

      if ( autos.length > 0) {
        console.log('have autos',autos);

      } else {
        console.log('no autos')
      }
      return autos;
    },
    async createPDF() {
      let autos = this.setAutos(this.vehicles);
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
              body: [//number of columns must add up to 22 in each row
                [
                  { text:`Date:\n${this.incident.date}`,rowSpan: 2},
                  { text: `Incident#:\n${this.incident.num}`,colSpan:2, rowSpan: 2}, '1',
                  { text: `Incident Reported:\n${this.incident.rep}`,colSpan:11, rowSpan: 2},
                  '1','2','3','4','5','6','7','8','9','10',
                  {text:'Alarm Time',colSpan:7},'1','2','3','4','5','6',
                  {text:`${this.alarm.alarm_time}`}
                ],
                [
                {text:'',colSpan:14},
                '1','2','3','4','5','6','7','8','9','10','11','12','13',
                {text:'Enroute Time',colSpan:7},'1','2','3','4','5','6',
                {text:`${this.alarm.enroute_time}`}
                ],
                [
                  {text:`Personnel#\n${this.incident.personnel}`,rowSpan: 3},
                  {text: `Medic Unit(s)\n${this.incident.medic}`,colSpan:2,rowSpan: 3}, '1',
                  {text: `Situation Found:\n${this.incident.situation}`,colSpan:11,rowSpan: 3},
                  '1','2','3','4','5','6','7','8','9','10',
                  {text:'On Scene Time',colSpan:7},'1','2','3','4','5','6',
                  {text:` ${this.alarm.onscene_time}`}
                ],
                [
                {text:'',colSpan:14},'1','2','3','4','5','6','7','8','9','10','11','12','13',
                {text:'Fire Controlled Time',colSpan:7},'1','2','3','4','5','6',
                {text:` ${this.alarm.fire_control_time}`}
                ],
                [
                {text:'',colSpan:14},'1','2','3','4','5','6','7','8','9','10','11','12','13',
                {text:'Clear Scene Time',colSpan:7},'1','2','3','4','5','6',
                {text:`${this.alarm.clear_scene_time}`}
                ],
                [
                {text:`Address/Location of Call: ${this.location.call_location}`, colSpan:8},
                '1','2','3','4','5','6','7',
                {text:`Zip Code: ${this.location.call_zip}`, colSpan:6},'1','2','3','4','5',
                {text:`Responding Departments: ${this.response.dept}`,colSpan:8},'1','2','3','4','5','6','7'
                ],
                [
                {text:`Owners Name\n${this.location.owner_name}` ,colSpan:2},'1',
                {text:`Address\n${this.location.owner_address}`,colSpan:6},'1','2','3','4','5',
                {text:`City\n${this.location.owner_city}`,colSpan:4},'1','2','3',
                {text:`State\n${this.location.owner_state}`,colSpan:4},'1','2','3',
                {text:`Phone#\n${this.location.owner_phone}`,colSpan:6},'1','2','3','4','5'
                ],
                //['0','1','2','3','4','5','6','7','8','9','10',
                //'11','12','13','14','15','16','17', '18','19','20','21'
                //],
                [
                {text:`Actions Taken\n${this.actions.taken}`, colSpan:16},
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                {text:`Water Used:\n${this.actions.water_used}`, colSpan:4},'1','2','3',
                {text:`Foam Used:\n${this.actions.foam_used}`, colSpan:2},'1'
                ],
                [
                //calculated based on this.structure.type
                {text:'Residential: X',colSpan:5, rowSpan:2},'1','2','3','4',
                {text:'Commercial: X',colSpan:5, rowSpan:2},'1','2','3','4',
                {text:`What is building used for:\n${this.structure.use}`,colSpan:7,rowSpan:2},'1','2','3','4','5','6',
                {text:`Mutial Aid to:(Y/N) ${this.response.mutual_aid_to}`,colSpan:5},'1','2','3','4'
                ],
                [
                {text:'',colSpan:17},'1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16',
                {text:`Mutual Aid From:(Y/N) ${this.response.mutual_aid_from}`,colSpan:5},'1','2','3','4'
                ],
                [
                {text:`Fatalities: ${this.injured.fatalities}`,colSpan:10},'1','2','3','4','5','6','7','8','9',
                {text:`Injuries: ${this.injured.injuries}`,colSpan:12},'1','2','3','4','5','6','7','8','9','10','11'
                ],
                [
                {text:'Fill out following for all Structure Fires ------>',colSpan:8},
                '1','2','3','4','5','6','7',
                {text:`Suspected Cause of Fire: (Ignition Source)
                ${this.structure.suspected_cause}`,colSpan:14},
                '1','2','3','4','5','6','7','8','9','10','11','12','13'
                ],
                [
                {text:'Arson Suspected?  Yes:X No: ',colSpan:8},'1','2','3','4','5','6','7',
                //calculated based on this.bcfmo.contact_for_arson
                {text:'BCFMO Contacted for Arson Investigation?  Yes:X  No:',colSpan:14},
                '1','2','3','4','5','6','7','8','9','10','11','12','13'
                ],
                [
                {text:`BCFMO Case# ${this.bcfmo.case_num}`,colSpan:8},'1','2','3','4','5','6','7',
                {text:`BCFMO Investigator Name: ${this.bcfmo.investigator}`,colSpan:14},
                '1','2','3','4','5','6','7','8','9','10','11','12','13'
                ],
                [
                {text:`Estimated Cost of Damage: ${this.structure.estimated_cost}`,colSpan:8},
                '1','2','3','4','5','6','7',
                {text:'Smoke Detector Operation:',colSpan:7},'1','2','3','4','5','6',
                //calculated based on this.structure.smoke_detector
                {text:'Yes:X No: N/A:',colSpan:7},'1','2','3','4','5','6'
                ],
                [
                {text:`Property Damaged: ${this.structure.property_damaged}`,colSpan:8},
                '1','2','3','4','5','6','7',
                {text:`Acerage Burned: ${this.structure.acerage_burned}`,colSpan:7},
                '1','2','3','4','5','6',
                {text:`Main Floor Size (Lgth x Width): ${this.structure.main_floor_size}`,
                colSpan:7}, '1','2','3','4','5','6'
                ],
                //Header row for mutual aid items
                [
                {text:'Mutual Aid Department',colSpan:2},'1',
                {text:'Mutual Aid Apparatus',colSpan:5}, '1','2','3','4',
                {text:'Mutual Aid Personnel',colSpan:5},'1','2','3','4',
                {text:'Alarm Time',colSpan:4},'1','2','3',
                {text:'On Scene Time',colSpan:4},'1','2','3',
                {text:'Clear Scene Time',colSpan:2},'1'
                ],
                //need to populate Mutual Aid rows from array of mutual aid items
                //need to populate vehicles from array of vehicle info
                [
                {text:'Owner/Driver Name:',colSpan:10,border:[true,true,true,false]},
                '1','2','3','4','5','6','7','8','9',
                {text:'Driver License:', colSpan:12},
                '0','1','2','3','4','5','6', '7','8','9','10'
                ],
                [
                {text:'Address: 123 Somewhere Dr',colSpan:10,border:[true,false,true,false]},
                '0','0','0','1','2','3','4','5','6',
                {text:'Insureance Info:',colSpan:12,rowSpan:2},
                '8','9','0','1','2','3','4', '5','6','7','8'
                ],
                [
                {text:'Phone#',colSpan:10,border:[true,false,true,true]},
                '1','2','3','4','5','6','7','8','9',
                {text:'my phone #',colSpan:12},
                '1','2','3','4','5','6','7', '8','9','10','11'
                ],
                [
                {text:'Make:\n Chevy'},
                {text:'Model:\n Impalla'},
                {text:'Year:\n 2005'},
                'VIN',
                '2','G','6','1','S','5','S','3','9','E','9','1','5','8','4','9','8',
                {text:'License Plate#\n DTY-2756'},
                ]
                //control row to know how many cells we can use per row
                //['0','1','2','3','4','5','6','7','8','9','10',
                //'11','12','13','14','15','16','17', '18','19','20','21'
                //]
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
            margin:[0,5,0,2],
            fontSize:9
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
