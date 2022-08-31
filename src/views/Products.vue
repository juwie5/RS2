<template>
    <div class="contain">
        <nav class="navbar">
            <ul>
                <li>{{user[LoginName]}}</li>
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
                <div>
                    <button @click="showDropdown">Select your product type</button>
                    <div ref="myDropdown" class="dropdown-content">
                        <option v-for="product in products" :key="product.id" @click="searchProducts2(product.ProductType)">{{product.ProductType}}</option>
                    </div>
                </div>
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
            hide: false,
            modal: false   
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
        async getProducts(){
           const BASE_ENDPOINT = "http://localhost:3001/product" 
            try{
              const res = await axios.get(BASE_ENDPOINT) 
              if(res.status == 200){
                this.products = res.data 
              } 
            } catch(err){
                console.log(err)
            }
        },
        searchProducts(){
            let result = this.products.filter(products => products.ProductName === this.query )
            
            this.results = result
        },
        searchProducts2(type){
            let result = this.products.filter(products => products.ProductType === type)
            this.results = result
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
    },
    mounted(){
        this.getProducts()
    }  
 }
</script>


<style lang="scss">

</style>