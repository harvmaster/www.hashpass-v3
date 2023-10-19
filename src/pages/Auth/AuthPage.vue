<template>
  <q-page class="row items-center justify-evenly">
    <div class="pin-input">
      <mobile-pin />

    </div>
    <!-- <q-btn label="Register" flat color="primary" @click="registerCredential"/>

    <q-btn label="Unlock" flat color="primary" @click="authenticateUser"/> -->
  </q-page>
</template>

<script setup lang="ts">
import MobilePin from 'src/components/Auth/MobilePin.vue';

// import { ref } from 'vue'

// const isWebAuthnSupported = () => {
//   return 'credentials' in navigator && 'create' in navigator.credentials;
// }

// const id = ref(new Uint8Array(16))

// const registerCredential = async () => {
//   if (isWebAuthnSupported()) {
//     try {

//       // generate random challenge
//       const challenge = new Uint8Array(32);
//       window.crypto.getRandomValues(challenge);

//       const Uid = new Uint8Array(16);
//       window.crypto.getRandomValues(Uid);
//       id.value = Uid;

//       const publicKeyCredentialCreationOptions = {
//         challenge,
//         rp: {
//           name: 'Hashpass',
//           id: "www.hashpass.mc.hzuccon.com"
//         },
//         user: {
//           id: id.value,
//           name: 'username', // Replace with an actual username
//           displayName: 'User Display Name' // Replace with an actual display name
//         },
//         pubKeyCredParams: [
//           {
//             type: 'public-key',
//             alg: -7,
//           },
//         ],
//         authenticatorSelection: {
//           authenticatorAttachment: 'platform', // Use platform authenticator, such as FaceID
//           userVerification: 'required' // Require user verification (e.g., biometric authentication)
//         },
//       };

      

//       const credential = await navigator.credentials.create({
//         publicKey: publicKeyCredentialCreationOptions,
//       });
//       // Store the credential ID locally, e.g., in localStorage
//       localStorage.setItem('credentialId', credential.rawId);
//     } catch (error) {
//       console.error('Error registering credential:', error);
//     }
//   } else {
//     alert('WebAuthn is not supported in your browser.');
//   }
// }

// const authenticateUser = async () => {
//   if (isWebAuthnSupported()) {
//     try {
//       // navigator.credentials.store()
//       const credentialId = localStorage.getItem('credentialId');
//       const challenge = new Uint8Array(32);
//       window.crypto.getRandomValues(challenge);

//       const Uid = new Uint8Array(16);
//       window.crypto.getRandomValues(Uid);
//       id.value = Uid;

//       const publicKeyCredentialRequestOptions = {
//         challenge,
//         rp: {
//           name: 'Hashpass',
//           id: "www.hashpass.mc.hzuccon.com"
//         },
//         user: {
//           id: id.value,
//           name: 'username', // Replace with an actual username
//           displayName: 'User Display Name' // Replace with an actual display name
//         },
//         pubKeyCredParams: [
//           {
//             type: 'public-key',
//             alg: -7,
//           },
//         ],
//         authenticatorSelection: {
//           authenticatorAttachment: 'platform', // Use platform authenticator, such as FaceID
//           userVerification: 'required' // Require user verification (e.g., biometric authentication)
//         },
        
//       };
//       const assertion = await navigator.credentials.get({

//         publicKey: publicKeyCredentialRequestOptions,
//       });
//       // Verify the assertion and unlock the app
//       if (assertion) {
//         // Unlock your app
//       }
//     } catch (error) {
//       console.error('Error authenticating user:', error);
//     }
//   } else {
//     alert('WebAuthn is not supported in your browser.');
//   }
// }


</script>
