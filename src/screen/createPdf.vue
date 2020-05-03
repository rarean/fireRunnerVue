<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu"/>
    <nb-content class="container" v-if="loaded">
      <view class="btn">
        <nb-button rounded large :on-press="createPDF">
          <nb-text>Create PDF</nb-text>
        </nb-button>
      </view>
    </nb-content>
    <nb-spinner v-if="!loaded"></nb-spinner>
    <nb-footer>
      <nb-left>
        <nb-button :on-press="() => this.props.navigation.goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      </nb-body />
      <nb-right>
        <nb-button :on-press="() => this.props.navigation.navigate('PDF')">
          <nb-icon name="arrow-forward" />
        </nb-button>
      </nb-right>
    </nb-footer>
  </nb-container>
</template>

<script>
import React from "react";
import Header from "../components/header";
import store from "../store";
import PdfMake from 'pdfmake/build/pdfmake.js';
import PdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';

export default {
  components: { Header },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
    };
  },
  created() {
    this.loaded = true;
    //assign fonts to use w/pdfmake
    PdfMake.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
  },
  methods:{
    onMenu: function(){
      this.navigation.openDrawer();
    },
    async createPDF(){
      const docDefinition = {
        content: [
          { text: 'Tables', style: 'header' },
          'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
          { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
          'The following table has nothing more than a body array',
          { style: 'tableExample',
            table: {
              body: [
                ['Column 1', 'Column 2', 'Column 3'],
                ['One value goes here', 'Another one here', 'OK?']
              ]
            }
          },
          { text: 'A simple table with nested elements', style: 'subheader' },
          'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
          { style: 'tableExample',
            table: {
              body: [
                ['Column 1', 'Column 2', 'Column 3'], [ {
                    stack: [ 'Let\'s try an unordered list', {
                        ul: [ 'item 1', 'item 2' ]
                      }
                    ]
                  }, [ 'or a nested table', {
                      table: {
                        body: [
                          ['Col1', 'Col2', 'Col3'],
                          ['1', '2', '3'],
                          ['1', '2', '3']
                        ]
                      },
                    }
                  ],
                  { text: [ 'Inlines can be ',
                      { text: 'styled\n', italics: true },
                      { text: 'easily as everywhere else', fontSize: 10 }]
                  }
                ]
              ]
            }
          }
          ]
      };

      try{
         const DIR = FileSystem.documentDirectory;
         const FILE = DIR+'worksheet.pdf';
         const ENCODE = FileSystem.EncodingType.Base64;
         const PDF = PdfMake.createPdf(docDefinition);
         PDF.getBase64((data) =>{
           FileSystem.writeAsStringAsync(FILE, data, {encoding:ENCODE});
           async ()=>{
           consol.log("check shareing");
              if(!(await Sharing.isAvailableAsync())){
                alert('Sharing is not available on your device');
              }
           };

           Sharing.shareAsync(FILE,{
             mimeType:'application/pdf',
             dialogTitle:'WorksheetPDF',
             UTI:'public.item'
            });

         });
      } catch(error){
        console.log("something wrong", error)
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
