<template>
  <div>
        <section>  
           <div class="signup-container">
                    <form>
                        <h4 class="create-acct-title">Sign in to your account</h4>
                        <div>
                            <input type="text" placeholder="username" v-model="form.username" required>
                            <div class="pass">
                                <input type="password" id="password" placeholder="password" v-model="form.password" required>
                                <p class="pass-toggle" v-if="hide" @click="showPassword">SHOW</p>
                                <p class="pass-toggle" v-if="!hide" @click="showPassword">HIDE</p>
                            </div>
                        </div>
                        <p class="pass-forgot">Forgot Password?</p>
                        <button type="button" class="btn signin-acct-btn" @click="loginIn">Sign in</button>  
                    </form>
                </div>       
        </section>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import { show }  from '@/services/show.js'
export default {
 name : 'Login',
 data : () => {
  return {
     show: true,
     hide: true,
    form: {
      username: '',
      password: ''
    }
  }
 },
  methods:{
      ...mapActions({
        signIn: 'auth/signIn'
      }),
      showPassword(){
          show()
          this.hide = !this.hide    
      },
        loginIn(){
         this.signIn(this.form) 
        } 
  }
}
</script>


<style lang="scss">


</style>