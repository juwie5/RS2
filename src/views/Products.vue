<template>
    <div class="contain">
        <nav class="navbar">
            <ul>
                <li>{{user[0].LoginName}}</li>
                <li @click="signOut">Logout</li> 
            </ul>
        </nav>
        <section>
          <h1>Products Page</h1>
          <form class="product" @submit.prevent="checkEntry" >
            <div class="item">
                <label for="productname">Search Product Name</label>
                <input type="text" v-model="query" @keypress.enter="searchProducts" maxlength="30" pattern="[A-Za-z]">
            </div>
            <div class="item">
                <label for="producttype">Search Product Type</label>
               <select v-model="type" @change="searchProducts2">
                    <option>Books</option>
                    <option>Games</option>
                    <option>Music</option>
               </select>
            </div>
            <div class="item">
                <label for="quantity">Quantity</label>
                <input type="number" required v-model="quantity">
            </div>
            <button class="add-btn">Add</button>
        </form>
           <p v-show="hide" class="red">Select a product</p>
        </section>
        <section>
            <div v-for="product in products" :key="product.id" class="result">
                <h3>{{product.ProductName}}</h3>
                <h3>{{product.ProductType}}</h3>
                <h3>{{product.Description}}</h3>
            </div>
        </section>
        <section>
            <h2>Products Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Product Description</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody v-for="result in results" :key="result.id">
                    <tr>
                    <td>{{result.showName}}</td>
                    <td>{{result.showType}}</td>
                    <td>{{result.showDes}}</td>
                    <td>{{result.amount}}</td>
                    </tr>
                </tbody>  
            </table>

            <div @click="modal = !modal" v-if="modal" class="modal">
            <div class="status">
                 <h3 class="cnt-h3">You can only add one of this product</h3>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex' 
export default{
    name:'Products',
    data: () => {
        return{
            products: [],
            results :[],
            query: "",
            quantity: "",
            type:"",
            hide: false,
            modal: false,
        }
    },
    computed: {
        ...mapGetters({
            user : 'auth/user'
        }),
        
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        signOut(){
            this.logout()
        },
         async searchProducts(){
            console.log(this.user)
            const BASE_ENDPOINT = "http://localhost:3001/product?q" 
            const REQ_ENDPOINT = `${BASE_ENDPOINT}=${this.query}`
            try{
              const res = await axios.get(REQ_ENDPOINT) 
              if(res.status == 200){
                this.products = res.data 
              } 
            } catch(err){
                console.log(err)
            }
        },
        async searchProducts2(){
            const BASE_ENDPOINT = "http://localhost:3001/product?q" 
            const REQ_ENDPOINT = `${BASE_ENDPOINT}=${this.type}`
            try{
              const res = await axios.get(REQ_ENDPOINT) 
              if(res.status == 200){
                // console.log(res.data)
                this.products = res.data 
              } 
            } catch(err){
                console.log(err)
            }
        },
        async addEntry(){
          const BASE_ENDPOINT = "http://localhost:3001/show"
          console.log(this.products)
          let data = JSON.stringify({
            "showName": `${this.products[0].ProductName}`,
            "showType": `${this.products[0].ProductType}`,
            "showDes": `${this.products[0].Description}`,
             "amount":  `${this.quantity}`   
          })
          let config = {
            method: 'post',
            url: `${BASE_ENDPOINT}`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });
        }, 
        async showTable(){
            const REQ_ENDPOINT = "http://localhost:3001/show"
            try{
                const res = await axios.get(REQ_ENDPOINT)
                if(res.status == 200){
                    console.log(res.data)
                   return this.results = res.data
                }
            }catch(err){
                console.log(err)
            }
        },
        async checkEntry(){ 
              const BASE_ENDPOINT = "http://localhost:3001/show?q"
              const REQ_ENDPOINT = `${BASE_ENDPOINT}=${this.products[0].ProductName}`
               try{
                const res = await axios.get(REQ_ENDPOINT)
                if(res.data.length === 0){
                    this.addEntry()
                    this.showTable()
                }
                else{
                    this.modal = true
                }
            } catch(err){
                console.log(err)
            }
        } 
    },
    beforeUpdate(){
        this.showTable()
    },
    mounted(){
        this.showTable() 
    }
   
 }
</script>

<style lang="scss">

</style>