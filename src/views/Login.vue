<template>
  <!-- <HelloWorld /> -->
  <div class="login-form-outer-container">
    <div class="login-form-inner-container">
      <p class="trove-title">TROVE</p>

      <h2 class="login-title">Login To Your Account</h2>

      <div class="btn-form-outer-container">
        <!-- Add Missing Google Icon -->
        <div class="btn-form-inner-container">
          <!-- Google Login is not required for Now -->
          <!-- So I am commenting it out, as per the Client's Request -->
          <!-- <button v-ripple class="google-login-btn form-btns">
            Login with Google
          </button>-->
          <!-- Add the Missing Eyelash icon & make it conditional -->

          <div class="login-form-field-container">
            <v-form ref="formRef" v-model="valid" lazy-validation>
              <p class="login-form-label-titles">Email</p>
              <v-text-field
                class="login-form-fields"
                v-model="email"
                :rules="emailRules"
                :key="emailKey"
                required
                variant="plain"
                clearable
                rounded
                ref="emailRef"
                @click:clear="clearEmailField"
              ></v-text-field>
              <!-- @keyup.enter="validate" -->

              <p class="login-form-label-titles mt-1">Password</p>
              <v-text-field
                class="login-form-fields"
                v-model="password"
                :rules="passwordRules"
                :key="passwordKey"
                required
                variant="plain"
                clearable
                rounded
                :type="showPassword ? 'text' : 'password'"
                :append-icon="
                  showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="showPassword = !showPassword"
                @click:clear="clearPasswordField"
              ></v-text-field>
              <!--
              @keyup.enter="validate"-->
            </v-form>
          </div>

          <div class="remember-password-container mt-3">
            <div
              class="remember-me-container add-cursor-pointer"
              @click="isRemeberMe = !isRemeberMe"
            >
              <input type="checkbox" v-model="isRemeberMe" class="remember-me-check-box" />
              <p class="ml-2">Remember Me</p>
            </div>
            <router-link to="/" class="forgot-password-link">Forgot Password?</router-link>
          </div>

          <button v-ripple class="sign-in-btn form-btns mt-6 py-2" @click="validate">Log In</button>

          <p class="email-login-text-container">
            <span class="email-login-text">OR LOGIN WITH</span>
          </p>

          <button
            v-ripple
            class="magic-link-login-btn form-btns py-2"
            @click="validateMagicLink"
          >Magic Link</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useToasterAlert } from "../store/ToasterAlert";
import { useUserAuth } from "../store/UserAuth";
import { useRouter } from "vue-router";

// Components
// import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: "Login",

  components: {
    // HelloWorld,
  },

  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const valid = ref(false);
    const email = ref("");
    const emailKey = ref(0);
    const emailRef = ref(null);
    const password = ref("");
    const showPassword = ref(false);
    const passwordKey = ref(0);

    const emailRules = ref([
      // (v) => !!v || "E-mail is required",
      // (v) => v.length != 0 || '',
      v => /.+@.+com/.test(v) || "E-mail must be valid"
    ]);
    const passwordRules = ref([
      // (v) => !!v || "Password is required",
      v => v.length > 8 || "Password must be greater than 8 characters"
    ]);

    const clearEmailField = () => {
      email.value = "";
      emailKey.value += 1;

      // Kept as a refference
      // This Resets all the Validation
      // form.value.resetValidation()

      // This Resets a Specific Validation based on the Modal Value of that V-text-field
      // form.value.resetValidation('email')
    };

    const clearPasswordField = () => {
      password.value = "";
      passwordKey.value += 1;
    };

    const validate = async () => {
      let isValidated = await formRef.value.validate();
      if (isValidated.valid) {
        let payload = {
          email: email.value,
          password: password.value,
          isRemembered: isRemeberMe.value
        };
        await userAuth.loginUser(payload);
        console.log("Logged In");
      } else {
        toasterAlert.setToaster({
          message: "Invalid Credentials",
          icon: "mdi-close-circle-outline",
          color: "#B00020",
          display: true
        });
        console.log("Logged Out");
      }
    };

    const validateMagicLink = async () => {
      let isValidated = await emailRef.value.validate();
      let validationErrors = JSON.parse(JSON.stringify(isValidated));
      if (validationErrors.length == 0) {
        toasterAlert.setToaster({
          message: "Magic Link Sent",
          icon: "mdi-check-circle-outline",
          color: "#20382C",
          display: true
        });
        console.log("Send Magic Link");
      } else {
        toasterAlert.setToaster({
          message: "Invalid Email",
          icon: "mdi-close-circle-outline",
          color: "#B00020",
          display: true
        });
        console.log("Don't Send Magic Link");
      }
    };

    const isRemeberMe = ref(false);

    const toasterAlert = useToasterAlert();

    const userAuth = useUserAuth();

    return {
      formRef,
      valid,
      email,
      emailRules,
      clearEmailField,
      emailKey,
      emailRef,
      password,
      passwordRules,
      clearPasswordField,
      passwordKey,
      showPassword,
      isRemeberMe,
      validate,
      validateMagicLink,
      toasterAlert,
      userAuth
    };
  }
});
</script>


<style lang="css" scoped>
.login-form-outer-container {
  background: #ede7e2;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 0px;
}

.login-form-inner-container {
  background: #ffffff;
  text-align: center;
  border-radius: 20px;
  padding-top: 52px;
  /* padding: 52px 80px 0px 80px; */
  width: 90%;
}

.trove-title {
  font-size: 48px;
  color: #20382c;
  font-weight: 300;
}

.login-title {
  color: #20382c;
  font-weight: 500;
  margin-top: 18px;
}

.no-uppercase {
  text-transform: unset !important;
}

.btn-form-outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-form-inner-container {
  width: 80%;
}

.magic-link-login-btn {
  margin: 32px 0px 40px 0px;
  border: 1px solid #ebeced;
}

.form-btns {
  /* width: 85%; */
  width: 100%;
  padding: 3px 0px;
  border-radius: 12px;
}

.email-login-text-container {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ebeced;
  line-height: 0.1em;
  /* margin: 10px 0 20px; */
  /* margin-top: 30px; */
  margin-top: 32px;
  color: #cfd0d1;
  font-weight: 400;
  font-size: 13px;
}

.email-login-text {
  background: #ffffff;
  padding: 0 18px;
  color: #cfd0d1;
  position: relative;
  top: 2px;
}

.login-form-field-container {
  margin-top: 36px;
}

.login-form-label-titles {
  color: #cfd0d1;
  text-align: left;
  font-size: 14px;
}

.login-form-fields-og {
  border: 1px solid #ebeced;
  width: 400px;
  padding: 3px 14px;
  border-radius: 12px;
}

.remember-password-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}

.remember-me-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.remember-me-check-box {
  height: 17px;
  width: 17px;
}

.forgot-password-link {
  text-decoration: none;
  color: #304ffd;
}

.sign-in-btn {
  border: 1px solid #20382c;
  background: #20382c;
  color: #ffffff;
}

@media only screen and (min-width: 768px) {
  .login-form-inner-container {
    width: 600px;
  }

  .form-btns,
  .btn-form-inner-container {
    width: 400px;
  }
}
</style>


<style lang="css">
/* Overwriting Default form field Styles(Height) in Vuetify with custom styles. */
.v-input--density-default .v-field--variant-plain,
.v-input--density-default .v-field--variant-underlined {
  --v-input-control-height: auto;
  padding: 0px;
}

.v-text-field input.v-field__input {
  height: auto;
}

/* Overwrite Form Field Styles */
/* .login-form-field-container .v-text-field .v-field--no-label input, .login-form-field-container .v-text-field .v-field--active input{
  border: 1px solid #ebeced;
  width: 400px;
  padding: 3px 14px;
  border-radius: 12px;
} */

/* Overwriting Default form field Styles(Height) in Vuetify with custom styles. */
/* These styles will only be applied to this component */
.login-form-field-container .v-input__control {
  border: 1px solid #ebeced;
  width: auto;
  padding: 3px 0px 3px 14px;
  border-radius: 12px;
}

.login-form-field-container .v-text-field .v-field--no-label input,
.login-form-field-container .v-text-field .v-field--active input {
  padding: 0px;
}

.login-form-field-container
  .v-field.v-field--variant-plain
  .v-field__clearable {
  padding: 0px;
  position: relative;
  left: 32px;
  top: 2px;
}

.login-form-field-container .v-input.login-form-fields {
  position: relative; /* This is the parent container of the Apend Icon below */
}

.login-form-field-container .v-text-field--plain-underlined .v-input__prepend,
.login-form-field-container .v-text-field--plain-underlined .v-input__append {
  /* padding: 0 12px 0 0;
    margin: 0px; */
  padding: 5px 12px 0 0;
  margin: 0px;
  position: absolute; /* This Apend Icon is relative to the Parent form field above */
  right: 2px;
}

@media only screen and (min-width: 768px) {
  .login-form-field-container .v-input__control {
    width: 400px;
  }

  .login-form-field-container
    .v-field.v-field--variant-plain
    .v-field__clearable {
    left: 36px;
  }
}
</style>