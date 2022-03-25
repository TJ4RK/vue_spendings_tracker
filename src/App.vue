<template>
  <div id="">
    <div id="currentSpendings">
            <h2 id="currentSpendings_Text"> Aktuelle Ausgaben: {{ spendings }} €</h2>
        </div>
        <div id="insertion">
          <div>
            <input v-model="description" type="text" name="description" id="description">
            <input v-model.number="price" type="number" name="price" id="price">
            <input v-model="date" type="date" id="date">
          </div>
          <button @click="insert()" id="insert">Einfügen</button>
        </div>
        <div id="list">
            <table id="list_table">
                <tr id="list_table_tr" v-for="(row, index) in rows" :key="index">
                    <td id="list_table_tr_td_1"> {{ row.description }} </td>
                    <td id="list_table_tr_td_2"> {{ row.price }} €</td>
                    <td id="list_table_tr_td_3"> {{ row.date }} </td>
                    <td id="list_table_tr_td_3" @click="remove(index)"><img src="./assets/bin_gray.png" alt="" style="width:2em; height:2em;"></td>
                </tr>
            </table>
        </div>
  </div>
</template>

<script>
  import axios from "axios"

  const server = "http://localhost:3000/api"

  export default{
    data(){
      return {
        rows: [],
        spendings: 0,
        description: "",
        price: 0,
        date: new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0"),
      }
    },

    methods:{
      update(){
        this.rows = []
        this.spendings = 0
        axios.get(server).then((res) => {
          for (let item in res.data.data){
            this.rows.push(res.data.data[item])
            this.spendings += res.data.data[item].price
          }
          Math.round((this.spendings + Number.EPSILON) * 100) / 100
        }).catch(err => {
          console.log(err)
        })
      }, 
      
      insert(){
        axios.post(server, {"description": this.description, "price": this.price, "date": this.date}).then(() => {
          this.update()
        })
      },

      remove(index){
        axios.delete(server, {"index": index}).then(() => {
          this.update()
        })
      }
    },

    mounted(){
      this.update()
    },
  }
</script>

<style>
  :root {
    --primary: #171819;
    --secondary:#1E1E23;
    --tertiary: #2C2A37;
    --text: #E9E9E9;

    background-color: var(--primary);
  }
  #app {
    /* used for centering the app */
    margin: auto;
    width: 45em;
    padding: 10px;

    font-family: helvetica;
  }

  #currentSpendings{
    background-color: var(--secondary);
    border: 1px solid;
    border-radius: 10px; 
  }

  #currentSpendings_Text{
    color: var(--text);
    text-align: center;
    font-family: helvetica;
  }

  #insertion{
    background-color: var(--secondary);
    border: 1px solid;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px; 
    text-align: center;
  }

  #list{
    background-color: var(--secondary);
    border: 1px solid;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px; 
  }

  #insertion {
    background-color: var(--secondary);
    border: 1px solid;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px; 
    text-align: center;
    display: grid; 
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr 1fr; 
    gap: 10px 10px; 
    grid-template-areas: 
      "."
      ".";
  }

  #description, #price, #insert, #date{
    margin: auto;
    font-size: 1em;
    background-color: var(--tertiary);
    color: var(--text);
    border: 1px solid black;
    border-radius: 3px;
  }

  table {
    color: var(--text);
    margin-left: 7.5em;
    border-collapse: collapse;
    text-align: center;
  }

  tr {
    border-bottom: 1px solid black;
  }

  td{
    height: 2em;
    width: 10em;
  }
</style>
