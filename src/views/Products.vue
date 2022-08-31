<template>
    <div class="contain">
        <nav class="navbar">
            <ul>
                <li @click="signOut">Logout</li>
            </ul>
        </nav>
        <section>
            <h1>Products Page</h1>
          <div class="product">
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
            <button @click="showTable" class="add-btn">Add</button>
          </div>
        </section>
        <section >
            <div v-for="result in results" :key="result.id" class="result">
                <h3>{{result.ProductName}}</h3>
                <h3>{{result.ProductType}}</h3>
            </div>
        </section>
        <section>
            <h2>Products Table</h2>
            <table v-show="hide">
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
                    <td>{{result.ProductName}}</td>
                    <td>{{result.ProductType}}</td>
                    <td>{{result.Description}}</td>
                    <td>{{quantity}}</td>
                    </tr>
                </tbody>
                
                
            </table>

            <div @click="modal = !modal" v-if="modal" class="modal">
            <div class="status">
                 <h3 class="cnt-h3">You can only add one product</h3>
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
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        signOut(){
            this.logout()
        },
         async searchProducts(){

            const BASE_ENDPOINT = "http://localhost:3001/product?q" 
            const REQ_ENDPOINT = `${BASE_ENDPOINT}=${this.query}`
            try{
              const res = await axios.get(REQ_ENDPOINT) 
              if(res.status == 200){
                console.log(res.data)
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
                console.log(res.data)
                this.products = res.data 
              } 
            } catch(err){
                console.log(err)
            }
        },
        showDropdown(){
            this.$refs.myDropdown.classList.toggle("show");
        },
        async showTable(){
            this.hide = true
            var data = JSON.stringify({
            "id": "1",
            "userId": "1",
            "productId": `${this.results.id}`
            });

            var config = {
            method: 'post',
            url: 'http://localhost:3001/show',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            }
            axios(config)
            .then(function (response) {
            //console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              this.modal = true
            console.log(error);
            });
        }, 
        async getTable(){

        }
    }
 }
</script>


<style lang="scss">

</style>